// src/components/home/encabezado/EncabezadoGeneral.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const EncabezadoGeneral = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo o nombre del sitio */}
        <Link to="/" className="text-2xl font-bold text-pink-600 hover:text-pink-700">
          Punto Shein
        </Link>

        {/* Botón de login o cerrar sesión */}
        <div>
          {!token ? (
            <Link
              to="/login"
              className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition"
            >
              Iniciar sesión
            </Link>
          ) : (
            <button
              onClick={cerrarSesion}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-red-400 hover:text-white transition"
            >
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default EncabezadoGeneral;
