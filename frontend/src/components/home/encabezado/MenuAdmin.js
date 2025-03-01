import React, { useState } from "react";
import { FaUserCircle, FaCog, FaUsers, FaBox, FaUserTie, FaTh, FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // Importamos motion para las animaciones
import { menuAnimado } from "../../home/encabezado/Funciones"; // Importamos las animaciones

const MenuAdmin = ({ usuarioAutenticado, handleLogout }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

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
    }, 500);
    setTimeoutId(id);
  };

  return (
    <div
      className="relative"

      onMouseEnter={handleMouseEnter}
      
      onMouseLeave={handleMouseLeave}
    >
      <button className="flex items-center space-x-2">
        <FaUserCircle className="text-2xl" />
      </button>

      {menuAbierto && (
        <motion.div
          className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md p-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          {...menuAnimado} // Aplicamos la animación del menú
        >
          {usuarioAutenticado ? (
            <>
              {/* Icono de Mi Perfil */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                <Link
                  to="/admin/perfil"
                  onClick={() => setMenuAbierto(false)}
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
                  onClick={() => setMenuAbierto(false)}
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
                  onClick={() => setMenuAbierto(false)}
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
                  onClick={() => setMenuAbierto(false)}
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
                  onClick={() => setMenuAbierto(false)}
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
                  onClick={() => setMenuAbierto(false)}
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
                  onClick={() => setMenuAbierto(false)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                  <FaUsers className="mr-2" />
                  Usuarios
                </Link>
              </motion.div>

              {/* Icono de Cerrar sesión */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
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

export default MenuAdmin;
