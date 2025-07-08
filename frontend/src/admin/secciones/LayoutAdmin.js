// src/admin/secciones/LayoutAdmin.js
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import EncabezadoAdmin from "./EncabezadoAdmin";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";
import { API_URL } from "../../ApiConexion";

const LayoutAdmin = () => {
  const location = useLocation();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const obtenerAdmin = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/perfil`, {
          withCredentials: true,
        });
        setAdmin(res.data);
      } catch (error) {
        console.error("Error al cargar el admin:", error);
      }
    };

    obtenerAdmin();
  }, []);

  // Opcional: en ciertas rutas como /registro, también mostrar el encabezado simple
  const mostrarEncabezado = ["/admin/dashboard", "/admin/sidebar", "/admin/empresa", "/admin/perfil",
                             "/admin/actualizarPerfil", "/admin/configuracion", "/admin/usuarios", 
                             "/admin/usuarios/:id","/admin/empleados", "/admin/productos", 
                             "/admin/gestionProductos", "/admin/productos/detalle/:id", 
                             "/admin/empresa/actualizar", "/admin/productos/crear", 
                             "/admin/productos/editar/:id", "/admin/inicio-rapido", 
                             "/admin/preguntasFrecuentes"].includes(location.pathname);
    
  return (
    <>
      {/* Encabezado fijo arriba */}
      {mostrarEncabezado && <EncabezadoAdmin />}

      {/* Sidebar fijo a la izquierda */}
      <div className="flex">
        {mostrarEncabezado && <Sidebar admin={admin} />}

        {/* Contenido principal ajustado */}
        <main className="flex-1 ml-64 pt-20 p-6 bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default LayoutAdmin;
