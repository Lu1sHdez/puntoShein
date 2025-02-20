import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const MenuUsuario = ({ usuarioAutenticado, navigate, handleLogout }) => {
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
              <button
                onClick={() => {
                  navigate("/perfil");
                  setMenuAbierto(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Perfil
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuAbierto(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuAbierto(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => {
                  navigate("/registro");
                  setMenuAbierto(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Registrarse
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MenuUsuario;