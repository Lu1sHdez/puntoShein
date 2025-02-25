import React, { useState } from "react";
import { FaUserCircle, FaCog, FaUsers, FaBox, FaUserTie, FaTh, FaSignOutAlt } from "react-icons/fa";  // Usamos los iconos correctos
import { Link } from "react-router-dom";

const MenuAdmin = ({ usuarioAutenticado, navigate, handleLogout }) => {
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
        <div
          className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md p-2"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {usuarioAutenticado ? (
            <>
              {/* Icono de Mi Perfil */}
              <Link
                to="/admin/perfil"
                onClick={() => setMenuAbierto(false)}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
              >
                <FaUserCircle className="mr-2" />
                Mi perfil
              </Link>

              {/* Icono de Configuración */}
              <Link
                to="/admin/configuracion"
                onClick={() => setMenuAbierto(false)}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
              >
                <FaCog className="mr-2" />
                Configuración
              </Link>

              {/* Icono de Dashboard */}
              <Link
                to="/admin/dashboard"
                onClick={() => setMenuAbierto(false)}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
              >
                <FaTh className="mr-2" />
                Dashboard
              </Link>

              {/* Icono de Empresa */}
              <Link
                to="/admin/empresa"
                onClick={() => setMenuAbierto(false)}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
                >
                <FaBox className="mr-2" />
                Empresa
              </Link>

              {/* Icono de Productos */}
              <Link
                to="/admin/productos"
                onClick={() => setMenuAbierto(false)}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
              >
                <FaBox className="mr-2" />
                Productos
              </Link>

              {/* Icono de Empleados */}
              <Link
                to="/admin/empleados"
                onClick={() => setMenuAbierto(false)}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
              >
                <FaUserTie className="mr-2" />
                Empleados
              </Link>

              {/* Icono de Usuarios */}
              <Link
                to="/admin/usuarios"
                onClick={() => setMenuAbierto(false)}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
              >
                <FaUsers className="mr-2" />
                Usuarios
              </Link>

              {/* Icono de Cerrar sesión */}
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
            </>
          ) : null}
        </div>
      )}
    </div>
  );
};

export default MenuAdmin;
