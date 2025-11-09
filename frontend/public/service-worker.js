/* eslint-disable no-restricted-globals */

const CACHE_VERSION = 'v3-' + new Date().getTime();
const CACHE_NAME = 'puntoshein-cache-' + CACHE_VERSION;

const urlsToCache = [
  "/",
  "/index.html",
  "/favicon.ico",
  "/manifest.json",
  "/logo192.png",
  "/logo512.png",

  "/acercaDe",
  "/privacidad",
  "/terminos",
  "/deslindeLegal",
  "/contacto",
  "/mapa-del-sitio",
  "/preguntasFrecuentes",
];

// Instalar
self.addEventListener("install", (event) => {
  console.log("[SW] Instalando...");
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activar
self.addEventListener("activate", (event) => {
  console.log("[SW] Activado");
  event.waitUntil(
    caches.keys().then((names) =>
      Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n)))
    )
  );
});

// Interceptar peticiones
self.addEventListener("fetch", (event) => {
  const { request } = event;

  // Solo intercepta GET
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      // Devuelve el archivo desde la cache si existe
      if (cachedResponse) return cachedResponse;

      // Si no existe, pide a la red y lo guarda
      return fetch(request)
        .then((networkResponse) => {
          // No caches respuestas HTML para evitar el error MIME
          if (
            !networkResponse ||
            networkResponse.status !== 200 ||
            networkResponse.type !== "basic" ||
            networkResponse.headers.get("content-type")?.includes("text/html")
          ) {
            return networkResponse;
          }

          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, responseToCache));
          return networkResponse;
        })
        .catch(() => caches.match("/index.html"));
    })
  );
});