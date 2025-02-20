import React, { } from "react";
import { useLocation } from "react-router-dom";
import Encabezado from "./Encabezado";
import PieDePagina from "./PieDePagina";
import Breadcrumbs from "./Breadcrumbs";
import Chat from "../chat/Chat";

const Layout = ({ children }) => {
  const location = useLocation(); // Obtiene la ruta actual

  // Ocultar las migas de pan en páginas específicas (como Detalle de Producto)
  const ocultarMigas = location.pathname.startsWith("/producto/");

  return (
    <div className="flex flex-col min-h-screen">
      <Encabezado />
     
      <div className="flex-grow pt-20">
        {/* Mostrar migas de pan SOLO si no estamos en la página del producto */}
        {!ocultarMigas && <Breadcrumbs />}
        
        <div className="relative mt-4 py-5">
          <main className="relative">{children}</main>
        </div>
      </div>
      <Chat />
      <PieDePagina />
    </div>
  );
};

export default Layout;
