// src/components/home/encabezado/EncabezadoAdmin.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

const EncabezadoAdmin = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login"); // Redirigir al login después de cerrar sesión
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo o nombre del sitio */}
        <Link to="/admin/dashboard" className="text-2xl font-bold text-pink-600 hover:text-pink-700">
          Panel de Administrador - Punto Shein
        </Link>

        {/* Barra de navegación */}
        <div className="flex items-center space-x-4">
          <Link to="/admin/perfil" className="text-gray-700 flex items-center space-x-2">
            <FaUserCircle className="text-xl" />
            <span className="text-sm">Perfil</span>
          </Link>
          
          {/* Botón de cerrar sesión */}
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center space-x-2"
          >
            <FaSignOutAlt />
            <span className="text-sm">Cerrar sesión</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default EncabezadoAdmin;
