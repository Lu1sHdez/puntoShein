// src/components/Layout.js
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Encabezado from "./encabezado/Encabezado";
import PieDePagina from "./pie/PieDePagina";
import Breadcrumbs from "./Breadcrumbs";
import Chat from "../chat/Chat";

const Layout = ({ children }) => {
  const location = useLocation(); // Obtiene la ruta actual

  // Verifica si estamos en la página de inicio
  const esInicio = location.pathname === "";

  return (
    <div 
      className={`flex flex-col min-h-screen ${esInicio ? "bg-cover bg-center" : ""}`} 
      style={{
        backgroundImage: esInicio ? 'url("https://res.cloudinary.com/dgbs7sg9j/image/upload/v1738384760/pshein1_dssmlw.avif")' : "",
        backgroundAttachment: esInicio ? "fixed" : "unset", // Esto asegura que la imagen de fondo sea fija solo en la página de inicio
        backgroundSize: "cover", // Asegura que la imagen cubra toda la sección
        backgroundPosition: "center", // Centra la imagen
      }}
    >
      <Encabezado />
      
      <div className="flex-grow pt-20">
        {/* Mostrar migas de pan SOLO si no estamos en la página del producto */}
        {!location.pathname.startsWith("/producto/") && <Breadcrumbs />}
        <div className="relative mt-4 py-5">
          <main className="relative">{children}</main>
        </div>
      </div>
      <Outlet />
      <Chat />
      <PieDePagina />
    </div>
  );
};

export default Layout;
