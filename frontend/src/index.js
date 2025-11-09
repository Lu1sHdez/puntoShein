// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SidebarProvider } from './context/SidebarContext';
import { inicializarNotificacionesConexion } from './utils/notificacion';

// Inicializa los detectores de conexión
inicializarNotificacionesConexion();

// === Detector de pantallazo blanco con botón de restablecer ===
window.addEventListener('error', (e) => {
  const appRoot = document.getElementById('root');
  // Si el root está vacío o hay error global
  if (appRoot && !appRoot.innerHTML.trim()) {
    mostrarBotonRestablecer();
  }
});

function mostrarBotonRestablecer() {
  const div = document.createElement('div');
  div.id = 'error-screen';
  div.style = `
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: #f8fafc;
    color: #1e293b;
    font-family: sans-serif;
    text-align: center;
    z-index: 9999;
  `;

  div.innerHTML = `
    <div style="font-size:1.1rem;margin-bottom:15px;">
      Error al cargar la aplicación
    </div>
    <div class="loader" style="
        border: 5px solid #dbeafe;
        border-top: 5px solid #2563eb;
        border-radius: 50%;
        width: 40px;
        height: 40px;
        animation: spin 1s linear infinite;
        margin-bottom: 20px;
    "></div>
    <button id="resetAppBtn" style="
      padding: 10px 20px;
      background: #2563eb;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 1rem;
    ">
      Restablecer aplicación
    </button>

    <style>
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    </style>
  `;

  document.body.appendChild(div);

  // Acción al presionar el botón
  document.getElementById('resetAppBtn').addEventListener('click', async () => {
    try {
      // Elimina todo el caché
      const keys = await caches.keys();
      await Promise.all(keys.map(k => caches.delete(k)));

      // Anula service workers activos
      const regs = await navigator.serviceWorker.getRegistrations();
      for (const reg of regs) await reg.unregister();

      // Recarga limpia
      window.location.reload(true);
    } catch (err) {
      console.error('Error al restablecer:', err);
      window.location.reload();
    }
  });
}
// === Fin del detector de pantallazo blanco ===

// === Render de React ===
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </React.StrictMode>
);

reportWebVitals();

// === Registro del Service Worker ===
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => {
        console.log("Service Worker registrado con éxito:", reg.scope);
      })
      .catch((err) => {
        console.log("Error al registrar el Service Worker:", err);
      });
  });
}