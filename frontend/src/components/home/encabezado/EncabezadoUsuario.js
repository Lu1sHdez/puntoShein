import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

const EncabezadoUsuario = () => {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const token = localStorage.getItem("token");

  const cerrarSesion = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
  };

  const handleBuscar = (e) => {
    e.preventDefault();
    if (busqueda.trim()) {
      navigate(`/buscar?nombre=${busqueda}`); // Redirige a la página de búsqueda con el parámetro
    }
  };

  const handleCarritoClick = () => {
    // Verifica si el token es válido y si el rol del usuario es "usuario"
    if (!token) {
      navigate("/login"); // Si no hay token, redirige a login
    } else {
      const decoded = jwtDecode(token);
      if (decoded.rol === "usuario") {
        navigate("/productos/carrito"); // Redirige a carrito si es usuario
      } else {
        alert("Acceso denegado. Solo los usuarios pueden acceder al carrito.");
      }
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo o nombre del sitio */}
        <Link to="/" className="text-3xl font-bold text-pink-600 hover:text-pink-700">
          Punto Shein
        </Link>

        {/* Barra de búsqueda */}
        <form onSubmit={handleBuscar} className="relative w-1/2 max-w-lg">
          <input
            type="text"
            value={busqueda}
            onChange={handleBusquedaChange}
            placeholder="Buscar productos..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500 transition duration-300 ease-in-out"
          />
          <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-pink-600">
            <FaSearch size={20} />
          </button>
        </form>

        {/* Carrito de compras */}
        <div className="relative flex items-center space-x-4">
          <div className="relative">
            <FaShoppingCart
              className="text-2xl cursor-pointer text-gray-600 hover:text-pink-600" 
              onClick={handleCarritoClick}
            />
            <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {10} {/* Aquí va el número de productos del carrito */}
            </span>
          </div>

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
                className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-pink-600 hover:text-white transition"
              >
                Cerrar sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default EncabezadoUsuario;
