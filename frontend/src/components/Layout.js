// src/components/Layout.js
import React from "react";
import Encabezado from "./Encabezado";
import PieDePagina from "./PieDePagina";

// Importa el Breadcrumbs
import Breadcrumbs from "./Breadcrumbs";

const Layout = ({ children }) => {
  return (
    <>
      <Encabezado />
      
      {/* Aquí mostramos los breadcrumbs justo debajo del encabezado */}
      <Breadcrumbs />

      {/* Contenido principal de cada página */}
      <main>{children}</main>

      <PieDePagina />
    </>
  );
};

export default Layout;
