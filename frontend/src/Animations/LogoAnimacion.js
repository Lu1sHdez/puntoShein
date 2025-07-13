// src/Animations/LogoAnimacion.js
import React, { useEffect, useState } from "react";

const LogoAnimacion = () => {
    const [hasSeenAnimation, setHasSeenAnimation] = useState(false);
  
    // Verificar si la animación ya fue vista
    useEffect(() => {
      const seen = localStorage.getItem("hasSeenAnimation");
  
      if (seen) {
        setHasSeenAnimation(true); // Si ya se ha visto, no mostrar la animación
      }
    }, []);
  
    // Al cargar la animación, la guardamos en localStorage para no mostrarla nuevamente
    const handleAnimationEnd = () => {
      localStorage.setItem("hasSeenAnimation", "true");
      setHasSeenAnimation(true);
    };
  
    if (hasSeenAnimation) {
      return null; // Si ya se vio, no mostrar la animación
    }
  return (
    <div className="w-full h-screen flex items-center justify-center bg-black absolute top-0 left-0">
      <div className="flex items-center justify-center">
        <img
          src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1732688336/PuntoShein_logos/ahh4lp1xsrgqdhknfauj.png"  // Cambia esto por el enlace a tu logo
          alt="Logo"
          className="w-32 h-32 animate-bounce"
          onAnimationEnd={handleAnimationEnd} // Llamar a la función cuando termine la animación
        />
      </div>
    </div>
  );
};

export default LogoAnimacion;
