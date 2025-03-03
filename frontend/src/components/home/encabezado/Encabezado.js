// src/components/home/encabezado/Encabezado.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaShoppingCart, FaBars, FaChevronDown } from "react-icons/fa";
import MenuUsuario from "./MenuUsuario";
import MenuAdmin from "./MenuAdmin";
import MenuEmpleado from "./MenuEmpleado";
import useAuth from "../../../hooks/useAuth";
import Filtros from "../../productos/FiltrosAvanzados";
import { jwtDecode } from "jwt-decode";
import axios from "axios"; // Importar axios para las solicitudes HTTP
import "../../../css/Texto.css";  // Ruta correcta a Texto.css
import Busqueda from "./Busqueda";  // Importar el componente Busqueda

const Encabezado = () => {
  const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
  const [busqueda, setBusqueda] = useState("");
  const [filtrosVisible, setFiltrosVisible] = useState(false);
  const [empresa, setEmpresa] = useState(null); // Nuevo estado para la empresa
  const navigate = useNavigate();
  const filtroRef = useRef(null);
  const { usuarioAutenticado, logout } = useAuth();

  // Función para obtener los datos de la empresa desde la API
  const fetchEmpresa = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/empresa/empresa", {
        withCredentials: true, // Si usas autenticación basada en cookies
      });
      setEmpresa(response.data); // Guardar los datos de la empresa en el estado
    } catch (error) {
      console.error("Error al obtener los datos de la empresa:", error);
    }
  };

  useEffect(() => {
    fetchEmpresa(); // Llamamos a la función para obtener los datos de la empresa
  }, []);

  // Función de cerrar sesión
  const handleLogout = () => {
    logout();
    navigate("/cerrar-sesion");
  };

  // Detectar clic fuera del filtro
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filtroRef.current && !filtroRef.current.contains(event.target)) {
        setFiltrosVisible(false); // Cerrar el filtro si se hace clic fuera de él
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Determinar el menú a mostrar según el rol del usuario
  const token = localStorage.getItem('token');
  let rolUsuario = '';
  if (token) {
    try {
      const decoded = jwtDecode(token);
      rolUsuario = decoded.rol;
    } catch (error) {
      console.error('Error al decodificar el token', error);
    }
  }

  let menu;
  if (rolUsuario === "administrador") {
    menu = <MenuAdmin usuarioAutenticado={usuarioAutenticado} navigate={navigate} handleLogout={handleLogout} />;
  } else if (rolUsuario === "empleado") {
    menu = <MenuEmpleado usuarioAutenticado={usuarioAutenticado} navigate={navigate} handleLogout={handleLogout} />;
  } else {
    menu = <MenuUsuario usuarioAutenticado={usuarioAutenticado} navigate={navigate} handleLogout={handleLogout} />;
  }

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-black text-white p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo + Nombre */}
        <div className="flex items-center space-x-2">
          <Link to="/" className="flex items-center space-x-2">
            {empresa ? (
              <>
                <img
                  src={empresa.logo}
                  alt="Logo"
                  className="h-20 w-auto"
                />
                <h2 className="texto-grande">{empresa.nombre}</h2>
              </>
            ) : (
              <p>Cargando...</p> // Mientras la empresa se carga, muestra un texto.
            )}
          </Link>
        </div>

        {/* Botón Hamburguesa (solo en pantallas pequeñas) */}
        <button
          className="lg:hidden text-2xl"
          onClick={() => setMenuMovilAbierto(!menuMovilAbierto)}
        >
          <FaBars />
        </button>

        {/* Sección derecha: Búsqueda + Filtros + Carrito + Usuario */}
        <div className="hidden lg:flex items-center space-x-12">
          {/* Componente de Búsqueda */}
          <Busqueda busqueda={busqueda} setBusqueda={setBusqueda} />
          {/* Botón para mostrar los filtros avanzados */}
          <button
            onClick={() => setFiltrosVisible(!filtrosVisible)}
            className="flex items-center space-x-3 text-rem px-1 py-2"
          >
            <span>Filtros</span>
            <FaChevronDown size={12} className={`transform ${filtrosVisible ? "rotate-180" : ""}`} />
          </button>
        </div>

        {/* Navegación Principal (pantallas grandes) */}
        <nav className="hidden lg:flex space-x-6">
          <button onClick={() => navigate("/")} className="hover:underline">Inicio</button>
          <button onClick={() => navigate("/productos")} className="hover:underline">Productos</button>
          <button onClick={() => navigate("/ofertas")} className="hover:underline">Ofertas</button>
          <button onClick={() => navigate("/contacto")} className="hover:underline">Contacto</button>
          <FaShoppingCart className="text-2xl cursor-pointer" onClick={() => navigate("productos/carrito")} />
          {menu} {/* Aquí se mostrará el menú dependiendo del rol */}
        </nav>
      </div>

      {/* Menú de Navegación en móvil */}
      {menuMovilAbierto && (
        <nav className="lg:hidden mt-4 px-4">
          <div className="flex flex-col space-y-2 bg-gray-800 p-4 rounded-md shadow-md">
            <button onClick={() => navigate("/")} className="hover:underline text-left">Inicio</button>
            <button onClick={() => navigate("/productos")} className="hover:underline text-left">Productos</button>
            <button onClick={() => navigate("/ofertas")} className="hover:underline text-left">Ofertas</button>
            <button onClick={() => navigate("/contacto")} className="hover:underline text-left">Contacto</button>

            {/* Sección de Búsqueda y Botón Filtros, también visible en mobile */}
            <div className="mt-4">
              <Busqueda busqueda={busqueda} setBusqueda={setBusqueda} />
            </div>
          </div>
        </nav>
      )}

      {/* Filtros avanzados debajo del buscador */}
      {filtrosVisible && (
        <div ref={filtroRef} className="absolute top-16 right-0 p-4 mt-4 rounded-md w-80">
          <Filtros />
        </div>
      )}
    </header>
  );
};

export default Encabezado;
