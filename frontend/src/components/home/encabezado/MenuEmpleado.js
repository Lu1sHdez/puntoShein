import React, { useState, useEffect } from "react";
import { FaUserCircle, FaUsers, FaSignOutAlt } from "react-icons/fa"; // Usamos los iconos correctos
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Importamos motion para las animaciones
import { menuAnimado } from "../../home/encabezado/Funciones"; // Importamos las animaciones
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const MenuEmpleado = ({ usuarioAutenticado, handleLogout }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [rolUsuario, setRolUsuario] = useState("");

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const decoded = jwtDecode(token);
        const rol = decoded.rol;
        let endpoint = rol === "administrador"
          ? "http://localhost:4000/api/admin/perfil"
          : rol === "empleado"
          ? "http://localhost:4000/api/empleado/perfil"
          : "http://localhost:4000/api/usuario/perfil";
        const response = await axios.get(endpoint, { withCredentials: true });
        setNombreUsuario(response.data.nombre);
        setRolUsuario(rol);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    obtenerDatosUsuario();
  }, []);
  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setMenuAbierto(true);
  };

  const handleMouseLeave = () => {
    const id = setTimeout(() => {
      setMenuAbierto(false);
    }, 1000);
    setTimeoutId(id);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center space-x-2">
        <FaUserCircle className="text-xl sm:text-2xl" />
        <div className="text-left">
          <p className="text-xs sm:text-sm text-white leading-tight">{nombreUsuario}</p>
          <p className="text-[10px] sm:text-xs text-gray-400 leading-tight capitalize">{rolUsuario}</p>
        </div>
      </button>

      {menuAbierto && (
        <motion.div
          className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md p-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...menuAnimado} // Aplicamos las animaciones del menú
        >
          {usuarioAutenticado ? (
            <>
              {/* Animación para "Mi perfil" */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <Link
                  to="/empleado/perfil"
                  onClick={() => setMenuAbierto(false)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaUsers className="mr-2" />
                  Mi perfil
                </Link>
              </motion.div>
              {/* Animación para "Mi perfil" */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <Link
                  to="/empleado/dashboard"
                  onClick={() => setMenuAbierto(false)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaUsers className="mr-2" />
                  Dashboard
                </Link>
              </motion.div>

              {/* Animación para "Cerrar sesión" */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuAbierto(false);
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaSignOutAlt className="mr-2" />
                  Cerrar sesión
                </button>
              </motion.div>
            </>
          ) : null}
        </motion.div>
      )}
    </div>
  );
};

export default MenuEmpleado;
