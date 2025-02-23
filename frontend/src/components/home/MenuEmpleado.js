import React, { useState } from "react";
import { FaUserCircle, FaUsers, FaSignOutAlt } from "react-icons/fa";  // Usamos los iconos correctos
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const MenuEmpleado = ({ usuarioAutenticado, handleLogout }) => {
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

  const token = localStorage.getItem('token');
  let rolUsuario = '';
  if (token) {
    try {
      const decoded = jwtDecode(token);
      rolUsuario = decoded.rol;
    } catch (error) {
      console.error('Error al decodificar el token', error);
    }
  }

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
                to="/perfil"
                onClick={() => setMenuAbierto(false)}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
              >
                <FaUsers className="mr-2" />
                Mi perfil
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

export default MenuEmpleado;
