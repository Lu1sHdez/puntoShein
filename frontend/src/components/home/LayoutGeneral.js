// src/components/home/LayoutGeneral.js
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import EncabezadoGeneral from "../home/encabezado/EncabezadoGeneral";
import PieDePagina from "../../welcome/pie/pie";


const LayoutGeneral = () => {
  const location = useLocation();

  // Opcional: en ciertas rutas como /registro, también mostrar el encabezado simple
  const mostrarEncabezado = ["/acercaDe","/terminos", 
                              "/privacidad", "/deslindeLegal",
                             "/contacto", "/ayuda", "/mapa-del-sitio", 
                             "/preguntasFrecuentes"].includes(location.pathname);
  return (
    <div className="min-h-screen pt-20">
      {mostrarEncabezado && <EncabezadoGeneral />}
      <Outlet />
      <PieDePagina />
    </div>
    
  );
};

export default LayoutGeneral;
