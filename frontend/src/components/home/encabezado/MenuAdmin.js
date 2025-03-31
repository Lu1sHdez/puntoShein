import React, { useState, useEffect,useRef} from "react";
import { FaUserCircle, FaCog, FaUsers, FaBox, FaUserTie, FaTh, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Importamos motion para las animaciones
import { menuAnimado } from "../../home/encabezado/Funciones"; // Importamos las animaciones
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { API_URL } from "../../../ApiConexion";

const MenuAdmin = ({ usuarioAutenticado, handleLogout, mobile, onItemClick }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [nombreUsuario, setNombreUsuario] = useState("");
  const [rolUsuario, setRolUsuario] = useState("");
  const menuRef = useRef(null);

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

  // Cerrar menú al hacer clic fuera
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

  const handleMenuClick = () => {
    setMenuAbierto(false);
    if (onItemClick) onItemClick();
  };

  const toggleMenu = () => {
    setMenuAbierto(!menuAbierto);
  };

  const handleItemClick = () => {
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
        <FaUserCircle className="text-xl sm:text-2xl" />
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
              {/* Icono de Mi Perfil */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <Link
                  to="/admin/perfil"
                  onClick={handleItemClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaUserCircle className="mr-2" />
                  Mi perfil
                </Link>
              </motion.div>

              {/* Icono de Configuración */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <Link
                  to="/admin/configuracion"
                  onClick={handleItemClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaCog className="mr-2" />
                  Configuración
                </Link>
              </motion.div>

              {/* Icono de Dashboard */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
                <Link
                  to="/admin/dashboard"
                  onClick={handleItemClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaTh className="mr-2" />
                  Dashboard
                </Link>
              </motion.div>

              {/* Icono de Empresa */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                <Link
                  to="/admin/empresa"
                  onClick={handleItemClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaBox className="mr-2" />
                  Empresa
                </Link>
              </motion.div>

              {/* Icono de Productos */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                <Link
                  to="/admin/productos"
                  onClick={handleItemClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaBox className="mr-2" />
                  Productos
                </Link>
              </motion.div>

              {/* Icono de Empleados */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                <Link
                  to="/admin/empleados"
                  onClick={handleItemClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaUserTie className="mr-2" />
                  Empleados
                </Link>
              </motion.div>

              {/* Icono de Usuarios */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                <Link
                  to="/admin/usuarios"
                  onClick={handleItemClick}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaUsers className="mr-2" />
                  Usuarios
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
          ) : null}
        </motion.div>
      )}
    </div>
  );
};

export default MenuAdmin;
