// src/admin/secciones/LayoutAdmin.js
import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import EncabezadoAdmin from "../encabezados/EncabezadoAdmin";
import Sidebar from "../admin/sidebar/Sidebar";
import axios from "axios";
import { API_URL } from "../ApiConexion";
import { useSidebar } from "../context/SidebarContext";

const LayoutAdmin = () => {
  const location = useLocation();
  const { colapsado } = useSidebar(); 
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
                             "/admin/productos/editar/:id",
                             "/admin/empresa/actualizar", "/admin/productos/crear", 
                             "/admin/productos/editar/:id", "/admin/inicio-rapido", 
                             "/admin/preguntasFrecuentes", "/admin/opiniones", "/admin/documentos", 
                             "/admin/prediccion"].includes(location.pathname);
    
  return (
    <>
      {/* Encabezado fijo arriba */}
      {mostrarEncabezado && <EncabezadoAdmin />}

      {/* Sidebar fijo a la izquierda */}
      <div className="flex">
        {mostrarEncabezado && <Sidebar admin={admin} />}

        <main className={`flex-1 transition-all duration-300 pt-16 p-6 bg-gray-50 min-h-screen ${
          mostrarEncabezado ? (colapsado ? "ml-20" : "ml-64") : ""
        }`}>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default LayoutAdmin;
