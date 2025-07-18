  // src/components/home/encabezado/Encabezado.js
  import React, { useState, useEffect, useRef } from "react";
  import { useNavigate, Link } from "react-router-dom";
  import { FaShoppingCart, FaBars, FaChevronDown} from "react-icons/fa";
  import MenuUsuario from "./MenuUsuario";
  import MenuAdmin from "./MenuAdmin";
  import MenuEmpleado from "./MenuEmpleado";
  import useAuth from "../../../hooks/useAuth";
  import Filtros from "../../productos/FiltrosAvanzados";
  import { jwtDecode } from "jwt-decode";
  import axios from "axios";
  import "../../../css/Texto.css";
  import "../../../css/EncabezadoMovil.css";
  import Busqueda from "./Busqueda";
  import { obtenerCantidad } from "../../cart/Funciones";
  import Usuarios from "./Usuarios"; // Importar el componente Usuarios
  import { API_URL } from "../../../ApiConexion";
  

  const Encabezado = () => {
    const [menuMovilAbierto, setMenuMovilAbierto] = useState(false);
    const [busqueda, setBusqueda] = useState("");
    const [filtrosVisible, setFiltrosVisible] = useState(false);
    const [empresa, setEmpresa] = useState(null);
    const navigate = useNavigate();
    const filtroRef = useRef(null);
    const [totalCantidad, setTotalCantidad] = useState(0);
    const { usuarioAutenticado, logout } = useAuth();
    const menuMovilRef = useRef(null);


    // Función para obtener los datos de la empresa desde la API
    const fetchEmpresa = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/empresa/empresa`, {
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
        if (
          menuMovilRef.current &&
          !menuMovilRef.current.contains(event.target) &&
          menuMovilAbierto
        ) {
          setMenuMovilAbierto(false);
        }
      };
    
      const handleEscapeKey = (event) => {
        if (event.key === "Escape") {
          setMenuMovilAbierto(false);
        }
      };
    
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscapeKey);
      };
    }, [menuMovilAbierto]);
    

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
<div className="w-full py-1 flex items-center justify-between px-4 lg:px-8">
          {/* Logo + Nombre */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <Link to="/" className="flex items-center space-x-3">
              {empresa ? (
                <>
                  <img
                    src={empresa.logo}
                    alt="Logo"
                    className="h-16 w-auto lg:h-20"
                  />
                  <h2 className="texto-grande boton-nav">{empresa.nombre}</h2>
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
              className="flex items-center boton-nav space-x-3 text-rem px-1 py-2"
            >
              <span>Filtros</span>
              <FaChevronDown size={12} className={`transform ${filtrosVisible ? "rotate-180" : ""}`} />
            </button>
          </div>

          {/* Navegación Principal (pantallas grandes) */}
          <nav className="hidden lg:flex space-x-1">
            <button onClick={() => navigate("/productos")} className="boton-nav">Productos</button>
            <button onClick={() => navigate("/ofertas")} className="boton-nav">Ofertas</button>
            <button onClick={() => navigate("/contacto")} className="boton-nav">Contacto</button>
            <div className="relative boton-nav flex items-center">
              <FaShoppingCart className="text-2xl cursor-pointer" onClick={() => navigate("productos/carrito")} />
              {totalCantidad > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs rounded-full px-1 py-0.5">
                  {totalCantidad}
                </span>
              )}
            </div>


            {menu} 

            <div className="flex boton-nav items-center space-x-2"> 
              <Usuarios /> 
            </div>  
            {!usuarioAutenticado && (
              <button
                onClick={() => navigate("/login")}
                className="text-sm boton-nav"
              >
                Inicia sesión
              </button>
            )}

            
          </nav>
        </div>

        {menuMovilAbierto && (
          
        <nav ref={menuMovilRef} className="lg:hidden w-full bg-gray-900 text-white px-4 py-2 fixed top-20 left-0 shadow-lg animate-fadeIn">
          <div className="flex flex-col gap-3 bg-gray-800 rounded-lg p-3 max-h-[70vh] overflow-y-auto">

             {/* Buscador primero para móvil */}
              <div className="mb-2">
                <Busqueda busqueda={busqueda} setBusqueda={setBusqueda} mobile />
              </div>

              {/* Enlaces principales */}
              <div className="flex flex-col gap-1">
                <button
                  onClick={() => {navigate("/productos"); setMenuMovilAbierto(false)}}
                  className="boton-nav-mobile py-2 px-3 text-left"
                >
                  Productos
                </button>
                <button
                  onClick={() => {navigate("/ofertas"); setMenuMovilAbierto(false)}}
                  className="boton-nav-mobile py-2 px-3 text-left"
                >
                  Ofertas
                </button>
                <button
                  onClick={() => {navigate("/contacto"); setMenuMovilAbierto(false)}}
                  className="boton-nav-mobile py-2 px-3 text-left"
                >
                  Contacto
                </button>
              </div>

            {/* Carrito con mejor espaciado */}
              <div 
                className="boton-nav-mobile py-2 px-3 flex items-center justify-between"
                onClick={() => {navigate("productos/carrito"); setMenuMovilAbierto(false)}}
              >
                <div className="relative">
                  <FaShoppingCart className="text-xl" />
                  {totalCantidad > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {totalCantidad}
                    </span>
                  )}
                </div>
              </div>

            {/* Menú de usuario/administrador */}
            <div className="border-t border-gray-700 pt-2">
              {React.cloneElement(menu, { mobile: true, onItemClick: () => setMenuMovilAbierto(false) })}
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