// src/context/useSesionUsuario.js
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { API_URL } from "../ApiConexion";

const useSesionUsuario = () => {
  const [usuarioAutenticado, setUsuarioAutenticado] = useState(false);
  const [rol, setRol] = useState(null);
  const [id, setId] = useState(null);
  const [datos, setDatos] = useState(null); // Aquí se guarda nombre, foto, correo, etc.
  const [tokenValido, setTokenValido] = useState(false);

  useEffect(() => {
    const verificarSesion = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUsuarioAutenticado(false);
        setDatos(null);
        return;
      }

      try {
        const decoded = jwtDecode(token);
        setRol(decoded.rol);
        setId(decoded.id);
        setUsuarioAutenticado(true);
        setTokenValido(true);

        // Determina el endpoint según el rol
        const endpoint =
          decoded.rol === "administrador"
            ? `${API_URL}/api/admin/perfil`
            : decoded.rol === "empleado"
            ? `${API_URL}/api/empleado/perfil`
            : `${API_URL}/api/usuario/perfil`;

        const response = await axios.get(endpoint, {
          withCredentials: true,
        });

        setDatos(response.data);
      } catch (error) {
        console.error("Error al verificar la sesión:", error);
        setUsuarioAutenticado(false);
        setTokenValido(false);
        setDatos(null);
      }
    };

    verificarSesion();
  }, []);

  return {
    usuarioAutenticado,
    tokenValido,
    id,
    rol,
    datos, // contiene nombre, foto_perfil, correo, etc.
  };
};

export default useSesionUsuario;
