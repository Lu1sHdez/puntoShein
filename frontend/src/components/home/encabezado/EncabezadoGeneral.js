// src/components/home/encabezado/EncabezadoGeneral.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useSesionUsuario from "../../../context/useSesionUsuario";

const EncabezadoGeneral = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { usuarioAutenticado, datos } = useSesionUsuario();

  const nombre = datos?.nombre || "Usuario";
  const fotoPerfil = datos?.foto_perfil || "";

  const generarIniciales = (nombre) => {
    if (!nombre) return "";
    const palabras = nombre.trim().split(" ");
    return palabras.length >= 2
      ? `${palabras[0][0]}${palabras[1][0]}`.toUpperCase()
      : palabras[0][0].toUpperCase();
  };

  const iniciales = generarIniciales(nombre);

  const cerrarSesion = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo o nombre del sitio */}
        <Link
          to="/inicio"
          className="text-2xl font-bold text-pink-600 hover:text-pink-700"
        >
          Punto Shein
        </Link>

        {/* Autenticado */}
        {usuarioAutenticado && datos ? (
          <div className="flex items-center space-x-4">
            {/* Perfil */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/perfil")}
            >
              {fotoPerfil ? (
                <img
                  src={fotoPerfil}
                  alt="Perfil"
                  className="h-9 w-9 rounded-full object-cover border border-gray-300 shadow"
                />
              ) : (
                <div className="h-9 w-9 bg-pink-600 text-white rounded-full flex items-center justify-center font-semibold shadow">
                  {iniciales}
                </div>
              )}
              <span className="text-sm text-gray-700 font-medium hover:text-pink-600">
                {nombre}
              </span>
            </div>

            {/* Cerrar sesión */}
            <button
              onClick={cerrarSesion}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-red-400 hover:text-white transition"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          // No autenticado
          <Link
            to="/login"
            className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition"
          >
            Iniciar sesión
          </Link>
        )}
      </div>
    </header>
  );
};

export default EncabezadoGeneral;
