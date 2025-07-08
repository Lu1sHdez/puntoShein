// src/components/home/LayoutEmpleado.js
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import EncabezadoAdmin from "./encabezado/EncabezadoAdmin"; // Importar el encabezado para admins
import PieDePagina from "../../welcome/pie/pie"; // Pie de página general

const LayoutEmpleado = () => {
  const location = useLocation();

  // Opcional: en ciertas rutas como /registro, también mostrar el encabezado simple
  const mostrarEncabezado = ["/admin/dashboard", "/admin/sidebar", "/admin/empresa", "/admin/perfil",
                             "/admin/actualizarPerfil", "/admin/configuracion", "/admin/usuarios", 
                             "/admin/usuarios/:id","/admin/empleados", "/admin/productos", 
                             "/admin/gestionProductos", "/admin/productos/detalle/:id", 
                             "/admin/empresa/actualizar", "/admin/productos/crear", 
                             "/admin/productos/editar/:id", "/admin/inicio-rapido", 
                             "/admin/preguntasFrecuentes"].includes(location.pathname);
    
  return (
    <div className="min-h-screen pt-20">
      {mostrarEncabezado && <EncabezadoAdmin />}
      <div className="flex">
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default LayoutEmpleado;
