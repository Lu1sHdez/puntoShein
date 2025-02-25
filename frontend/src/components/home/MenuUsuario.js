// src/components/MenuUsuario.js

import React, { useState } from "react";
import { FaUserCircle, FaUsers, FaSignInAlt, FaSignOutAlt, FaUserPlus } from "react-icons/fa";
import { Link } from "react-router-dom";

const MenuUsuario = ({ usuarioAutenticado, handleLogout }) => {
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
              <Link
                to="/usuario/perfil"
                onClick={() => setMenuAbierto(false)}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
              >
                <FaUsers className="mr-2" />
                Mi perfil
              </Link>

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
          ) : (
            <>
              <Link
                to="/login"
                onClick={() => setMenuAbierto(false)}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
              >
                <FaSignInAlt className="mr-2" />
                Iniciar sesión
              </Link>

              <Link
                to="/registro"
                onClick={() => setMenuAbierto(false)}
                className="w-full text-left px-4 py-2 hover:bg-gray-200 flex items-center"
              >
                <FaUserPlus className="mr-2" />
                Registrarse
              </Link>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuUsuario;
