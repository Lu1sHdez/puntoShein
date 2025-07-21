import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import EncabezadoUsuario from "../encabezados/EncabezadoUsuario";
import Sidebar from "../usuario/sidebar/Sidebar";
import axios from "axios";
import { API_URL } from "../ApiConexion";
import { useSidebar } from "../context/SidebarContext";

const LayoutUsuario = () => {
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);
  const { colapsado } = useSidebar(); //Usamos el contexto

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/usuario/perfil`, {
          withCredentials: true,
        });
        setUsuario(res.data);
      } catch (error) {
        console.error("Error al obtener perfil del usuario:", error);
      }
    };

    obtenerPerfil();
  }, []);

  const mostrarLayout =
    [
      "/usuario/carrito",
      "/productos",
      "/buscar",
      "/productos/filtrados",
      "/productos/carrito",
      "/usuario/pedidos",
      "/autenticacion-requerida",
      "/usuario/dashboard",
      "/usuario/perfil",
      "/usuario/actualizarPerfil",
      "/checkout/pago",
    ].some((ruta) => location.pathname.startsWith(ruta));

  return (
    <div className="min-h-screen pt-20">
      {mostrarLayout && <EncabezadoUsuario />}

      <div className="flex">
        {mostrarLayout && <Sidebar usuario={usuario} />}

        <main
          className={`flex-1 transition-all duration-300 p-6 bg-gray-50 min-h-screen pt-16 ${
            mostrarLayout ? (colapsado ? "ml-20" : "ml-64") : ""
          }`}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutUsuario;
