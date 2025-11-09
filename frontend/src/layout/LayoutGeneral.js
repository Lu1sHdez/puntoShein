// src/components/home/LayoutGeneral.js
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import EncabezadoGeneral from "../encabezados/EncabezadoGeneral";
import PiePublico from "../public/pie/pie";


const LayoutGeneral = () => {
  const location = useLocation();

  // Opcional: en ciertas rutas como /registro, también mostrar el encabezado simple
  const mostrarEncabezado = ["/acercaDe","/contactanos", "/terminos", 
                              "/privacidad", "/deslindeLegal",
                             "/contacto", "/ayuda", "/mapa-del-sitio", 
                             "/preguntasFrecuentes"].includes(location.pathname);
  return (
    <div className="min-h-screen pt-2">
      {mostrarEncabezado && <EncabezadoGeneral />}
      <Outlet />
      <PiePublico />
    </div>
    
  );
};

export default LayoutGeneral;
