import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import EncabezadoUsuario from "./EncabezadoUsuario";
import Sidebar from "../sidebar/Sidebar";
import axios from "axios";
import { API_URL } from "../../ApiConexion";

const LayoutUsuario = () => {
  const location = useLocation();
  const [usuario, setUsuario] = useState(null);

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

  // Verifica si la ruta actual requiere encabezado y sidebar
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

        <main className="flex-1 ml-64 pt-20 p-6 bg-gray-50 min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutUsuario;
