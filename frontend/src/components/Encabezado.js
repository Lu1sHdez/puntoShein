// src/components/Encabezado.js
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaShoppingCart, FaSearch, FaFilter, FaBars } from "react-icons/fa";
import MenuUsuario from "../components/MenuUsuario";
import useAuth from "../hooks/useAuth";

const FiltrosAvanzados = ({ visible, onClose }) => {
  // ... (código de filtros avanzados igual que antes)
};

const Encabezado = () => {
  const [menuFiltrosAbierto, setMenuFiltrosAbierto] = useState(false);
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const navigate = useNavigate();
  const { usuarioAutenticado } = useAuth();

  useEffect(() => {
    // ...
  }, []);

  const handleBuscar = () => {
    console.log("Buscando:", busqueda);
  };

  const handleLogout = () => {
    navigate("/cerrar-sesion");
  };

  return (
    // Se cambia a bg-black text-white
    <header className="fixed top-0 left-0 w-full z-50 bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo + Nombre */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1732688337/oyki4qctlifup2fw6krl.png"
              alt="Logo"
              className="h-20 w-auto"
            />
            <h1 className="text-lg font-bold">Punto Shein</h1>
          </Link>
        </div>

        {/* Botón Hamburguesa (solo en pantallas pequeñas) */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
        >
          <FaBars />
        </button>

        {/* Navegación Principal (pantallas grandes) */}
        <nav className="hidden lg:flex space-x-6">
          <button onClick={() => navigate("/")} className="hover:underline">
            Inicio
          </button>
          <button onClick={() => navigate("/productos")} className="hover:underline">
            Productos
          </button>
          <button onClick={() => navigate("/ofertas")} className="hover:underline">
            Ofertas
          </button>
          <button onClick={() => navigate("/contacto")} className="hover:underline">
            Contacto
          </button>
        </nav>

        {/* Sección derecha: Búsqueda + Filtros + Carrito + Usuario */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Búsqueda */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <FaSearch
                onClick={handleBuscar}
                className="absolute left-2 top-2 text-gray-400 cursor-pointer"
              />
              <input
                type="text"
                value={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
                placeholder="Buscar producto"
                className="pl-8 pr-2 py-1 w-32 md:w-48 rounded-md text-black border border-gray-300 focus:outline-none"
              />
            </div>
            <button
              onClick={handleBuscar}
              className="bg-white text-black py-1 px-3 rounded-md hover:bg-gray-200 transition"
            >
              Buscar
            </button>
          </div>

          {/* Botón para Filtros Avanzados */}
          <button
            onClick={() => setMenuFiltrosAbierto(!menuFiltrosAbierto)}
            className="relative flex items-center bg-white text-black px-3 py-1 rounded-md shadow-md hover:bg-gray-200 transition"
          >
            <FaFilter className="mr-2" />
            Avanzado
          </button>

          {/* Carrito */}
          <FaShoppingCart
            className="text-2xl cursor-pointer"
            onClick={() => navigate("/carrito")}
          />

          {/* Menú de Usuario */}
          <MenuUsuario
            usuarioAutenticado={usuarioAutenticado}
            navigate={navigate}
            handleLogout={handleLogout}
          />
        </div>
      </div>

      {/* Menú de Navegación en móvil */}
      {menuMovilAbierto && (
        <nav className="lg:hidden mt-4 px-4">
          <div className="flex flex-col space-y-2 bg-gray-800 p-4 rounded-md shadow-md">
            <button onClick={() => navigate("/")} className="hover:underline text-left">
              Inicio
            </button>
            <button onClick={() => navigate("/productos")} className="hover:underline text-left">
              Productos
            </button>
            <button onClick={() => navigate("/ofertas")} className="hover:underline text-left">
              Ofertas
            </button>
            <button onClick={() => navigate("/contacto")} className="hover:underline text-left">
              Contacto
            </button>

            {/* Sección de Búsqueda y Botón Filtros, también visible en mobile */}
            <div className="mt-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="relative flex-1">
                  <FaSearch
                    onClick={handleBuscar}
                    className="absolute left-2 top-2 text-gray-400 cursor-pointer"
                  />
                  <input
                    type="text"
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    placeholder="Buscar..."
                    className="pl-8 pr-2 py-1 w-full rounded-md text-black border border-gray-300 focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleBuscar}
                  className="bg-white text-black py-1 px-3 rounded-md hover:bg-gray-200 transition"
                >
                  Buscar
                </button>
              </div>

              <button
                onClick={() => setMenuFiltrosAbierto(!menuFiltrosAbierto)}
                className="w-full flex items-center justify-center bg-white text-black px-3 py-2 rounded-md shadow-md hover:bg-gray-200 transition"
              >
                <FaFilter className="mr-2" />
                Avanzado
              </button>
            </div>

            {/* Carrito y usuario en mobile */}
            <div className="mt-4 flex items-center space-x-4">
              <FaShoppingCart
                className="text-2xl cursor-pointer"
                onClick={() => navigate("/carrito")}
              />
              <MenuUsuario
                usuarioAutenticado={usuarioAutenticado}
                navigate={navigate}
                handleLogout={handleLogout}
              />
            </div>
          </div>
        </nav>
      )}

      {/* Dropdown Filtros Avanzados */}
      <div className="relative">
        <FiltrosAvanzados
          visible={menuFiltrosAbierto}
          onClose={() => setMenuFiltrosAbierto(false)}
        />
      </div>
    </header>
  );
};

export default Encabezado;
