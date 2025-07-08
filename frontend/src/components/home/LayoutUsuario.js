// src/components/home/LayoutUsuario.js
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import EncabezadoUsuario from "./encabezado/EncabezadoUsuario";
import PieDePagina from "../../welcome/pie/pie";


const LayoutUsuario = () => {
  const location = useLocation();

  const mostrarEncabezado = [
    "/productos",
    "/producto/:id", 
    "/buscar", 
    "/productos/filtrados", 
    "/productos/agregar", 
    "/productos/carrito", 
    "/autenticacion-requerida",
    "/usuario/dashboard",
    "/usuario/perfil",
    "/usuario/actualizarPerfil",
    "/checkout/pago",
    "/productos/agregar",
    "/productos/carrito",
    
  ].includes(location.pathname);

  return (
    <div className="min-h-screen pt-20">
      {mostrarEncabezado && <EncabezadoUsuario />}
      <Outlet />
      <PieDePagina />
    </div>
  );
};

export default LayoutUsuario;
