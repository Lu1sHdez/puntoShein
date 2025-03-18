// src/components/home/encabezado/Usuarios.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Usuarios = () => {
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [rolUsuario, setRolUsuario] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("");
        setLoading(false);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        const rol = decoded.rol; // Obtener el rol del token

        let endpoint = "";
        if (rol === "administrador") {
          endpoint = "http://localhost:4000/api/admin/perfil";
        } else if (rol === "empleado") {
          endpoint = "http://localhost:4000/api/empleado/perfil";
        } else {
          endpoint = "http://localhost:4000/api/usuario/perfil";
        }

        const response = await axios.get(endpoint, { withCredentials: true });
        setNombreUsuario(response.data.nombre); // Asegúrate de que el campo sea "nombre"
        setRolUsuario(rol);
      } catch (error) {
        setError("Error al obtener los datos del usuario");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatosUsuario();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="text-sm">
        <p className="text-white">{nombreUsuario}</p>
        <p className="text-gray-400">{rolUsuario}</p>
      </div>
    </div>
  );
};

export default Usuarios;