  // src/components/home/encabezado/Encabezado.js
  import React, { useState, useEffect, useRef } from "react";
  import { useNavigate, Link } from "react-router-dom";
  import { FaShoppingCart, FaBars, FaChevronDown, FaUser } from "react-icons/fa";
  import MenuUsuario from "./MenuUsuario";
  import MenuAdmin from "./MenuAdmin";
  import MenuEmpleado from "./MenuEmpleado";
  import useAuth from "../../../hooks/useAuth";
  import Filtros from "../../productos/FiltrosAvanzados";
  import { jwtDecode } from "jwt-decode";
  import axios from "axios";
  import "../../../css/Texto.css";
  import Busqueda from "./Busqueda";
  import { obtenerCantidad } from "../../cart/Funciones";
  import Usuarios from "./Usuarios"; // Importar el componente Usuarios

  const Encabezado = () => {
    const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [filtrosVisible, setFiltrosVisible] = useState(false);
    const [empresa, setEmpresa] = useState(null);
    const navigate = useNavigate();
    const filtroRef = useRef(null);
    const [totalCantidad, setTotalCantidad] = useState(0);
    const { usuarioAutenticado, logout } = useAuth();

    // Función para obtener los datos de la empresa desde la API
    const fetchEmpresa = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/empresa/empresa", {
          withCredentials: true,
        });
        setEmpresa(response.data);
      } catch (error) {
        console.error("Error al obtener los datos de la empresa:", error);
      }
    };

    // Función para obtener la cantidad de productos en el carrito
    const fetchCarrito = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const decoded = jwtDecode(token);
          const usuarioId = decoded.id;
          const cantidadTotal = await obtenerCantidad(usuarioId);
          setTotalCantidad(cantidadTotal);
        }
      } catch (error) {
        console.error("Error al obtener cantidad", error);
      }
    };

    useEffect(() => {
      fetchEmpresa();
      fetchCarrito();
    }, []);

    // Función de cerrar sesión
    const handleLogout = () => {
      logout();
      navigate("/cerrar-sesion");
      window.location.reload();  
    };

    // Detectar clic fuera del filtro
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (filtroRef.current && !filtroRef.current.contains(event.target)) {
          setFiltrosVisible(false);
        }
      };

      document.addEventListener("mousedown", handleClickOutside);

      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, []);

    // Determinar el menú a mostrar según el rol del usuario
    const token = localStorage.getItem("token");
    let rolUsuario = "";
    if (token) {
      try {
        const decoded = jwtDecode(token);
        rolUsuario = decoded.rol;
      } catch (error) {
        console.error("Error al decodificar el token", error);
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
                <p>Cargando...</p>
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
          <nav className="hidden lg:flex space-x-4">
            <button onClick={() => navigate("/productos")} className="hover:underline">Productos</button>
            <button onClick={() => navigate("/ofertas")} className="hover:underline">Ofertas</button>
            <button onClick={() => navigate("/contacto")} className="hover:underline">Contacto</button>
            <div className="relative">
              <FaShoppingCart className="text-2xl cursor-pointer" onClick={() => navigate("productos/carrito")} />
              {totalCantidad > 0 && (
                <span className="absolute -top-4 right-1 bg-red-600 text-white text-xs rounded-full px-1 py-0.5 transform translate-x-1 translate-y-1">
                  {totalCantidad}
                </span>
              )}
            </div>

            {menu} 
            <div className="flex items-center space-x-2"> 
              <Usuarios /> 
            </div>  
            
          </nav>
        </div>

        {/* Menú de Navegación en móvil */}
        {menuMovilAbierto && (
          <nav className="lg:hidden mt-4 px-4">
            <div className="flex flex-col space-y-2 bg-gray-800 p-4 rounded-md shadow-md">
              <button onClick={() => navigate("/productos")} className="hover:underline text-left">Productos</button>
              <button onClick={() => navigate("/ofertas")} className="hover:underline text-left">Ofertas</button>
              <button onClick={() => navigate("/contacto")} className="hover:underline text-left">Contacto</button>
              <div className="relative">
                <FaShoppingCart className="text-2xl cursor-pointer" onClick={() => navigate("productos/carrito")} />
                {totalCantidad > 0 && (
                  <span className="absolute top-0 right-0 bg-red-600 text-white text-xs rounded-full px-1 py-0.5 transform translate-x-1 translate-y-1">
                    {totalCantidad}
                  </span>
                )}
              </div>
              {/* Mostrar nombre y rol del usuario en móvil */}
              <div className="flex items-center space-x-2">
                
                <Usuarios /> 
                <FaUser className="text-xl" />
              </div>
              {menu}
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