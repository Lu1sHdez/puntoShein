// src/utils/notificacion.js

let permisosSolicitados = false;

// === Función para mostrar notificaciones locales ===
export function mostrarNotificacion(titulo, mensaje, icono = "/logo192.png") {
  if (!("Notification" in window)) return;

  if (Notification.permission === "granted") {
    new Notification(titulo, { body: mensaje, icon: icono, tag: "conexion" });
  } else if (!permisosSolicitados && Notification.permission !== "denied") {
    permisosSolicitados = true;
    Notification.requestPermission().then((permiso) => {
      if (permiso === "granted") {
        new Notification(titulo, { body: mensaje, icon: icono, tag: "conexion" });
      }
    });
  }
}

// === Función que inicia los detectores de conexión ===
export function inicializarNotificacionesConexion() {
  // Solo se ejecuta después de que el documento esté listo
  window.addEventListener("DOMContentLoaded", () => {
    // Evitar ejecución múltiple por React StrictMode
    if (window._notificacionesInicializadas) return;
    window._notificacionesInicializadas = true;

    window.addEventListener("offline", () => {
      console.log("🔴 Sin conexión detectada");
      mostrarNotificacion(
        "Punto Shein",
        "No tienes conexión a internet. Algunas funciones no estarán disponibles."
      );
    });

    window.addEventListener("online", () => {
      console.log("🟢 Conexión restaurada");
      mostrarNotificacion(
        "Punto Shein",
        "Conexión restaurada. Puedes seguir navegando normalmente."
      );
    });
  });
}
