import React, { useState, useEffect, useRef } from "react";
import { 
  FaUser, 
  FaSignInAlt, 
  FaSignOutAlt, 
  FaUserPlus, 
  FaShoppingCart,
  FaHeart,
  FaHistory,
  FaCog,
  FaHome
} from "react-icons/fa";
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
  const [, setIsMobile] = useState(false);

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
      className="relative" ref={menuRef}>
      <button 
        onClick={mobile ? toggleMenu : undefined}
        onMouseEnter={!mobile ? () => setMenuAbierto(true) : undefined}
        className="flex items-center space-x-2 w-full"
      >
        <FaUser className="text-xl sm:text-2xl" />
        <div className="text-left">
          <p className="text-xs sm:text-sm text-white leading-tight">{nombreUsuario}</p>
          <p className="text-[10px] sm:text-xs text-gray-400 leading-tight capitalize">{rolUsuario}</p>
        </div>
        {mobile && (
          <span className="ml-auto transform transition-transform duration-200">
            {menuAbierto ? "▲" : "▼"}
          </span>
        )}
      </button>

      {menuAbierto && (
        <motion.div
        className={`absolute ${mobile ? 'relative w-full mt-2' : 'right-0 mt-2 w-48'} bg-white text-black shadow-lg rounded-md p-2 z-50`}
        onMouseLeave={!mobile ? () => setMenuAbierto(false) : undefined}
        {...menuAnimado}
        >
          {usuarioAutenticado ? (
            <>
              {/* Inicio */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <Link
                  to="/"
                  onClick={handleMenuClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaHome className="mr-2" />
                  Inicio
                </Link>
              </motion.div>

              {/* Mi Perfil */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                <Link
                  to="/usuario/perfil"
                  onClick={handleMenuClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaUser className="mr-2" />
                  Mi Perfil
                </Link>
              </motion.div>

              {/* Mis Compras */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <Link
                  to="/usuario/compras"
                  onClick={handleMenuClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaShoppingCart className="mr-2" />
                  Mis Compras
                </Link>
              </motion.div>

              {/* Favoritos */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
                <Link
                  to="/usuario/favoritos"
                  onClick={handleMenuClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaHeart className="mr-2" />
                  Favoritos
                </Link>
              </motion.div>

              {/* Historial */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <Link
                  to="/usuario/historial"
                  onClick={handleMenuClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaHistory className="mr-2" />
                  Historial
                </Link>
              </motion.div>

              {/* Configuración */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
                <Link
                  to="/usuario/configuracion"
                  onClick={handleMenuClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaCog className="mr-2" />
                  Configuración
                </Link>
              </motion.div>

              {/* Divider */}
              <div className="border-t border-gray-300 my-1"></div>

              {/* Cerrar Sesión */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <button
                  onClick={() => {
                    handleLogout();
                    handleMenuClick();
                  }}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center text-red-600"
                >
                  <FaSignOutAlt className="mr-2" />
                  Cerrar Sesión
                </button>
              </motion.div>
            </>
          ) : (
            <>
              {/* Opciones para usuarios no autenticados */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <Link
                  to="/login"
                  onClick={handleMenuClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaSignInAlt className="mr-2" />
                  Iniciar Sesión
                </Link>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <Link
                  to="/registro"
                  onClick={handleMenuClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaUserPlus className="mr-2" />
                  Registrarse
                </Link>
              </motion.div>
            </>
          )}
        </motion.div>
      )}
    </div>
  );
};

export default MenuUsuario;