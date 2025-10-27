import React, { useEffect, useState } from "react";

const InstalarPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [instalable, setInstalable] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      // Evita que el navegador muestre el diálogo por defecto
      e.preventDefault();
      setDeferredPrompt(e);
      setInstalable(true);
    };

    window.addEventListener("beforeinstallprompt", handler);

    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const instalarApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("Usuario aceptó instalar la app");
    } else {
      console.log("Usuario rechazó la instalación");
    }
    setDeferredPrompt(null);
    setInstalable(false);
  };

  if (!instalable) return null;

  return (
    <div style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 9999 }}>
      <button
        onClick={instalarApp}
        style={{
            background: "linear-gradient(90deg, #2563eb 0%, #1d4ed8 100%)",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "12px",
            fontWeight: "bold",
            fontSize: "14px",
            cursor: "pointer",
            boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
          }}          
      >
        Instalar Punto Shein
      </button>
    </div>
  );
};

export default InstalarPWA;
