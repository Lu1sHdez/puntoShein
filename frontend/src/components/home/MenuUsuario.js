import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";

const MenuUsuario = ({ usuarioAutenticado, navigate, handleLogout }) => {
  const [menuAbierto, setMenuAbierto] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null); // Para manejar el retraso al cerrar el menú

  // Maneja el evento de pasar el cursor sobre el ícono de usuario o el menú
  const handleMouseEnter = () => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Cancelar el cierre si el cursor vuelve al menú
      setTimeoutId(null);
    }
    setMenuAbierto(true);
  };

  // Maneja el evento de retirar el cursor del ícono de usuario o el menú
  const handleMouseLeave = () => {
    // Agregar un pequeño retraso antes de cerrar el menú
    const id = setTimeout(() => {
      setMenuAbierto(false);
    }, 500); // 500 ms de retraso
    setTimeoutId(id);
  };

  return (
    <div
      className="relative"
      onMouseEnter={handleMouseEnter} // Mostrar menú al pasar el cursor
      onMouseLeave={handleMouseLeave} // Ocultar menú con retraso al retirar el cursor
    >
      <button className="flex items-center space-x-2">
        <FaUserCircle className="text-2xl" />
      </button>

      {menuAbierto && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md p-2"
          onMouseEnter={handleMouseEnter} // Mantener el menú abierto si el cursor está sobre él
          onMouseLeave={handleMouseLeave} // Ocultar el menú con retraso al retirar el cursor
        >
          {usuarioAutenticado ? (
            <>
              <button
                onClick={() => {
                  navigate("/perfil");
                  setMenuAbierto(false); // Cerrar el menú después de hacer clic
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Perfil
              </button>
              <button
                onClick={() => {
                  handleLogout();
                  setMenuAbierto(false); // Cerrar el menú después de hacer clic
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
                  setMenuAbierto(false); // Cerrar el menú después de hacer clic
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              >
                Iniciar sesión
              </button>
              <button
                onClick={() => {
                  navigate("/registro");
                  setMenuAbierto(false); // Cerrar el menú después de hacer clic
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