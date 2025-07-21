// src/components/home/encabezado/EncabezadoEmpleado.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import useSesionUsuario from "../context/useSesionUsuario";
import useAuth from "../hooks/useAuth";

const EncabezadoEmpleado = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { usuarioAutenticado, datos } = useSesionUsuario();

  const nombre = datos?.nombre || "Empleado";
  const fotoPerfil = datos?.foto_perfil || "";

  const generarIniciales = (nombre) => {
    if (!nombre) return "";
    const palabras = nombre.trim().split(" ");
    return palabras.length >= 2
      ? `${palabras[0][0]}${palabras[1][0]}`.toUpperCase()
      : palabras[0][0].toUpperCase();
  };

  const iniciales = generarIniciales(nombre);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="bg-gray-50 shadow px-6 py-4 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo o nombre del sitio */}
        <Link
          to="/empleado/dashboard"
          className="text-2xl font-bold text-blue-600 hover:text-blue-700"
        >
          Panel de Empleado - Punto Shein
        </Link>

        {/* Perfil y cerrar sesión */}
        <div className="flex items-center space-x-4">
          {/* Perfil */}
          <Link
            to="/empleado/perfil"
            className="flex items-center space-x-2 text-gray-700 hover:text-pink-600"
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
            <span className="text-sm">{nombre}</span>
          </Link>

          {/* Cerrar sesión */}
          <button
            onClick={handleLogout}
            className="btn-cerrar"
          >
            <FaSignOutAlt />
            <span className="text-sm">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default EncabezadoEmpleado;
