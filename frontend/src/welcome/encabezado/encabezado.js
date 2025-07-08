import React from "react";
import { useNavigate } from "react-router-dom";
import { FaStore } from "react-icons/fa";

const EncabezadoBienvenida = () => {
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo y nombre */}
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate("/")}>
          <FaStore className="text-pink-600 text-2xl" />
          <span className="text-xl font-semibold text-gray-800">Punto Shein</span>
        </div>

        {/* Acciones principales */}
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
      </div>
    </header>
  );
};

export default EncabezadoBienvenida;
