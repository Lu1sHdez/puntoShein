import React, { useState, useEffect, useRef } from "react";
import { FaUser, FaUsers, FaSignInAlt, FaSignOutAlt, FaUserPlus, FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { menuAnimado } from "../../home/encabezado/Funciones";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../../ApiConexion";

const MenuUsuario = ({ usuarioAutenticado, handleLogout, mobile, onItemClick }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [rolUsuario, setRolUsuario] = useState("");
  const menuRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.matchMedia("(pointer: coarse)").matches);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  useEffect(() => {
    const obtenerDatosUsuario = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;
      try {
        const decoded = jwtDecode(token);
        const rol = decoded.rol;
        const endpoint = `${API_URL}/api/usuario/perfil`;
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
    document.addEventListener("touchstart", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleMenuClick = () => {
    setMenuAbierto(false);
    if (onItemClick) onItemClick();
  };

  return (
    <div 
      className={`relative ${mobile ? 'w-full' : ''}`} 
      ref={menuRef}
    >
      <button
        onClick={toggleMenu}
        onMouseEnter={!isMobile ? () => setMenuAbierto(true) : undefined}
        className={`flex items-center ${mobile ? 'w-full justify-between px-4 py-3' : 'space-x-2 px-2 py-1'} boton-nav cursor-pointer`}
      >
        <div className="flex items-center space-x-2">
          <FaUser className="text-xl sm:text-2xl" />
          <div className="text-left">
            <p className="text-xs sm:text-sm text-white leading-tight">{nombreUsuario}</p>
            {rolUsuario && (
              <p className="text-[10px] sm:text-xs text-gray-400 leading-tight capitalize">{rolUsuario}</p>
            )}
          </div>
        </div>
        
        {mobile && (
          <span className="ml-2">
            {menuAbierto ? <FaChevronUp /> : <FaChevronDown />}
          </span>
        )}
      </button>

      {menuAbierto && (
        <motion.div
          className={`absolute ${mobile ? 'w-full mt-1' : 'right-0 mt-2 w-48 sm:w-56'} bg-white text-black shadow-lg rounded-md p-2 z-50`}
          onMouseLeave={!isMobile ? () => setMenuAbierto(false) : undefined}
          {...menuAnimado}
        >
          {usuarioAutenticado ? (
            <>
              <Link
                to="/usuario/perfil"
                onClick={handleMenuClick}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center text-sm"
              >
                <FaUsers className="mr-2" />
                Mi perfil
              </Link>
              <Link
                to="/usuario/dashboard"
                onClick={handleMenuClick}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center text-sm"
              >
                <FaUsers className="mr-2" />
                Dashboard
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  handleMenuClick();
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
                onClick={handleMenuClick}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center text-sm"
              >
                <FaSignInAlt className="mr-2" />
                Iniciar sesión
              </Link>
              <Link
                to="/registro"
                onClick={handleMenuClick}
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