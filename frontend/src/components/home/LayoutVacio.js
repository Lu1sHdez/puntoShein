// src/components/home/LayoutVacio.js
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import EncabezadoSimple from "../home/encabezado/EncabezadoSimple";


const LayoutVacio = () => {
  const location = useLocation();

  // Opcional: en ciertas rutas como /registro, también mostrar el encabezado simple
  const mostrarEncabezado = ["/acceso","/login", "/registro", 
                             "/opcionRestablecimiento", "/recuperarPassword"].includes(location.pathname);
  return (
    <div className="min-h-screen pt-20">
      {mostrarEncabezado && <EncabezadoSimple />}
      <Outlet />
    </div>
  );
};

export default LayoutVacio;
