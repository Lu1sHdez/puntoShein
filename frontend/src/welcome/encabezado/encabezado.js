import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStore, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useSesionUsuario from "../../context/useSesionUsuario";

const EncabezadoBienvenida = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  // ✅ Usamos el nuevo hook centralizado
  const { usuarioAutenticado, datos } = useSesionUsuario();

  // Iniciales
  const generarIniciales = (nombre) => {
    if (!nombre) return "";
    const palabras = nombre.trim().split(" ");
    return palabras.length >= 2
      ? `${palabras[0][0]}${palabras[1][0]}`.toUpperCase()
      : palabras[0][0].toUpperCase();
  };

  const iniciales = generarIniciales(datos?.nombre);
  const fotoPerfil = datos?.foto_perfil;
  const nombreUsuario = datos?.nombre;

  const cerrarSesion = () => {
    logout();
    navigate("/inicio");
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Logo y nombre del sitio */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/inicio")}
        >
          <FaStore className="text-pink-600 text-2xl" />
          <span className="text-xl font-semibold text-gray-800">Punto Shein</span>
        </div>

        {/* Usuario autenticado */}
        {usuarioAutenticado && datos && (
          <div className="flex items-center space-x-4">
            {/* Perfil */}
            <div
              className="flex items-center space-x-2 group cursor-pointer"
              onClick={() => navigate("/usuario/perfil")}
            >
              {fotoPerfil ? (
                <img
                  src={fotoPerfil}
                  alt="Foto de perfil"
                  className="h-10 w-10 rounded-full object-cover border border-gray-300 shadow"
                />
              ) : (
                <div className="h-10 w-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-semibold shadow">
                  {iniciales}
                </div>
              )}
              <span className="text-sm text-gray-700 group-hover:text-pink-600 font-medium">
                {nombreUsuario}
              </span>
            </div>

            {/* Cerrar sesión */}
            <button
              onClick={cerrarSesion}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition"
            >
              <FaSignOutAlt />
              Cerrar sesión
            </button>
          </div>
        )}

        {/* No autenticado */}
        {!usuarioAutenticado && (
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-sm px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate("/registro")}
              className="text-sm px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
            >
              Regístrate
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default EncabezadoBienvenida;
