import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaUsers, FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { menuAnimado } from "../../home/encabezado/Funciones";
import { motion } from "framer-motion";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../../ApiConexion";

const MenuUsuario = ({ usuarioAutenticado, handleLogout }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [setEsTactil] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [rolUsuario, setRolUsuario] = useState("");
  const menuRef = useRef(null); 

  useEffect(() => {
    const detectarTactil = () => {
      setEsTactil(window.matchMedia("(pointer: coarse)").matches);
    };
    detectarTactil();
    window.addEventListener("resize", detectarTactil);
    return () => window.removeEventListener("resize", detectarTactil);
  }, []);

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const decoded = jwtDecode(token);
        const rol = decoded.rol;
        let endpoint = rol === "administrador"
          ? `${API_URL}/api/admin/perfil`
          : rol === "empleado"
          ? `${API_URL}/api/empleado/perfil`
          : `${API_URL}/api/usuario/perfil`;
        const response = await axios.get(endpoint, { withCredentials: true });
        setNombreUsuario(response.data.nombre);
        setRolUsuario(rol);
      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
      }
    };

    obtenerDatosUsuario();
  }, []);

  // Cierra el menú si el usuario hace clic fuera de él
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative z-40" ref={menuRef}>
      <button
        onClick={() => setMenuAbierto(!menuAbierto)}
        className="flex items-center space-x-2 px-2 py-1 boton-nav cursor-pointer"
      >
        <FaUser className="text-xl sm:text-2xl" />
        <div className="text-left">
          <p className="text-xs sm:text-sm text-white leading-tight">{nombreUsuario}</p>
          <p className="text-[10px] sm:text-xs text-gray-400 leading-tight capitalize">{rolUsuario}</p>
        </div>
      </button>

      {menuAbierto && (
        <motion.div
          className="absolute right-0 mt-2 w-48 sm:w-56 bg-white text-black shadow-lg rounded-md p-2 overflow-hidden max-h-[50vh] overflow-y-auto"
          {...menuAnimado}
        >
          {usuarioAutenticado ? (
            <>
              <Link
                to="/usuario/perfil"
                onClick={() => setMenuAbierto(false)}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center text-sm"
              >
                <FaUsers className="mr-2" />
                Mi perfil
              </Link>
              <Link
                to="/usuario/dashboard"
                onClick={() => setMenuAbierto(false)}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center text-sm"
              >
                <FaUsers className="mr-2" />
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuAbierto(false);
                }}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center text-sm"
              >
                <FaSignOutAlt className="mr-2" />
                Cerrar sesión
              </button>
            </>
          ) : (
            <>

              <Link
                to="/login"
                onClick={() => setMenuAbierto(false)}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center text-sm"
              >
                <FaSignInAlt className="mr-2" />
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                onClick={() => setMenuAbierto(false)}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center text-sm"
              >
                <FaUserPlus className="mr-2" />
                Registrarse
              </Link>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MenuUsuario;
