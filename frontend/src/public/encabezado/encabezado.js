import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../ApiConexion";
import useSesionUsuario from "../../context/useSesionUsuario";
import useAuth from "../../hooks/useAuth";
import ReactDOM from "react-dom";
import { useCart } from "../../context/CartContext";
import CargandoModal from "../../Animations/CargandoModal";
import {
  BsCart3,
  BsSearch,
  BsGear,
  BsPersonCircle,
  BsBoxArrowInRight,
  BsPersonPlus,
  BsBoxArrowRight,
  BsList,
  BsX,
} from "react-icons/bs";
import ModalAutenticacion from "../autenticacion/Autenticacion";

const EncabezadoPublico = () => {
  const [empresa, setEmpresa] = useState(null);
  const { usuarioAutenticado, datos } = useSesionUsuario();
  const { logout } = useAuth();
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { cantidadCarrito, actualizarCantidad } = useCart();

  const [openMobile, setOpenMobile] = useState(false);
  const [openSearchMobile, setOpenSearchMobile] = useState(false);
  const [openUserMenu, setOpenUserMenu] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarNavbar, setMostrarNavbar] = useState(true);
  const [termino, setTermino] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // === Generar iniciales ===
  const generarIniciales = (nombre) => {
    if (!nombre) return "";
    const partes = nombre.trim().split(" ");
    return partes.length >= 2
      ? `${partes[0][0]}${partes[1][0]}`.toUpperCase()
      : partes[0][0].toUpperCase();
  };
  const iniciales = generarIniciales(datos?.nombre);
  const fotoPerfil = datos?.foto_perfil;
  const nombreUsuario = datos?.nombre;

  // === Cerrar sesión ===
  const cerrarSesion = async () => {
    setCargando(true);
    try {
      await axios.post(`${API_URL}/api/autenticacion/logout`, {}, { withCredentials: true });
      logout();
      setTimeout(() => {
        setCargando(false);
        navigate("/cuerpo");
        window.location.reload();
      }, 1000);
    } catch (error) {
      setCargando(false);
      Swal.fire({
        icon: "error",
        title: "Error al cerrar sesión",
        text: error.response?.data?.mensaje || "Ocurrió un error inesperado.",
      });
    }
  };

  // === Mostrar/Ocultar navbar con scroll ===
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setMostrarNavbar(currentY <= lastScrollY.current || currentY < 60);
          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }

      // progreso del scroll
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (currentY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // === Obtener empresa ===
  useEffect(() => {
    const obtenerEmpresa = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/empresa/empresa`, {
          withCredentials: true,
        });
        setEmpresa(res.data);
      } catch (error) {
        console.error("Error al obtener datos de empresa:", error);
      }
    };
    obtenerEmpresa();
  }, []);

  // === Actualizar cantidad carrito ===
  useEffect(() => {
    if (datos?.id) actualizarCantidad(datos.id);
  }, [datos]);

  // === Buscar productos ===
  const handleBuscar = (e) => {
    e.preventDefault();
    const q = termino.trim();
    if (!q) return;
    navigate(`/cuerpo?buscar=${encodeURIComponent(q)}`);
    setTermino("");
    setOpenSearchMobile(false);
    setOpenMobile(false);
  };

  return (
    <header
      className={`sticky top-0 left-0 w-full z-50 border-b border-gray-100
      bg-white/80 backdrop-blur-xl shadow-md/30 transition-all duration-500 ease-in-out transform
      ${mostrarNavbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Contenedor principal */}
        <div className="flex items-center justify-between h-16 text-gray-900">
          {/* Logo + Hamburguesa */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setOpenMobile(!openMobile);
                setOpenSearchMobile(false);
              }}
              className="md:hidden text-gray-800 hover:text-blue-600 transition"
              aria-label="Menú"
            >
              {openMobile ? <BsX size={24} /> : <BsList size={24} />}
            </button>

            <Link
              to="/"
              className="flex items-center gap-3 cursor-pointer select-none group animate-fade-in-up"
            >
              {empresa ? (
                <>
                  <img
                    src={empresa.logo}
                    alt="Logo"
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-200 group-hover:ring-blue-300 transition-all duration-200"
                  />
                  <span className="text-gray-900 text-lg sm:text-xl font-bold uppercase tracking-wide group-hover:text-blue-600 transition">
                    {empresa.nombre}
                  </span>
                </>
              ) : (
                <div className="h-10 w-10 bg-blue-100 rounded-full"></div>
              )}
            </Link>
          </div>

          {/* Buscador Desktop */}
          {location.pathname === "/cuerpo" && (
            <form
              onSubmit={handleBuscar}
              className="hidden md:flex items-center bg-white/90 rounded-full shadow-inner ring-1 ring-gray-200 max-w-md w-full mx-6 backdrop-blur-md"
            >
              <BsSearch className="text-blue-500 ml-4 mr-2" />
              <input
                type="text"
                placeholder="Buscar productos..."
                value={termino}
                onChange={(e) => setTermino(e.target.value)}
                className="flex-grow h-10 bg-transparent outline-none text-gray-700 placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 m-1 rounded-full hover:bg-blue-700 transition"
              >
                Buscar
              </button>
            </form>
          )}

          {/* Acciones lado derecho */}
          <div className="flex items-center gap-4">
            {/* Buscar móvil */}
            {location.pathname === "/cuerpo" && (
              <button
                onClick={() => {
                  setOpenSearchMobile(!openSearchMobile);
                  setOpenMobile(false);
                }}
                className="md:hidden text-gray-800 hover:text-blue-600 transition"
                aria-label="Buscar"
              >
                <BsSearch size={20} />
              </button>
            )}

            {/* Carrito */}
            <div className="relative">
              <button
                onClick={() =>
                  usuarioAutenticado
                    ? navigate("/productos/carrito")
                    : setMostrarModal(true)
                }
                className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition relative"
              >
                <BsCart3 className="text-blue-600" size={22} />

                {cantidadCarrito > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow-md">
                    {cantidadCarrito}
                  </span>
                )}
              </button>
            </div>

            {/* Usuario */}
            {usuarioAutenticado && datos ? (
              <div className="relative">
                <button
                  onClick={() => setOpenUserMenu(!openUserMenu)}
                  className="flex items-center gap-2 focus:outline-none"
                  aria-label="Menú de usuario"
                >
                  {fotoPerfil ? (
                    <img
                      src={fotoPerfil}
                      alt="Perfil"
                      className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-200"
                    />
                  ) : (
                    <div className="h-9 w-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                      {iniciales}
                    </div>
                  )}
                  <span className="hidden sm:inline text-gray-800 text-sm font-semibold">
                    {nombreUsuario}
                  </span>
                </button>

                {/* Menú de usuario */}
                {openUserMenu && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg ring-1 ring-gray-200 overflow-hidden animate-fade-in-up z-50">
                    <button
                      onClick={() => {
                        setOpenUserMenu(false);
                        navigate("/usuario/perfil");
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 flex items-center gap-2"
                    >
                      <BsPersonCircle className="text-blue-600" /> Mi perfil
                    </button>
                    <button
                      onClick={() => {
                        setOpenUserMenu(false);
                        navigate("/usuario/dashboard");
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-blue-50 flex items-center gap-2"
                    >
                      <BsGear className="text-blue-600" /> Panel
                    </button>
                    <hr />
                    <button
                      onClick={() => {
                        setOpenUserMenu(false);
                        cerrarSesion();
                      }}
                      className="w-full text-left px-4 py-3 text-sm hover:bg-red-50 flex items-center gap-2"
                    >
                      <BsBoxArrowRight className="text-red-600" /> Cerrar Sesión
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex gap-4">
                <button
                  onClick={() => navigate("/login")}
                  className={`flex items-center gap-2 text-gray-700 hover:text-blue-600 transition ${
                    location.pathname === "/login" ? "text-blue-600 font-semibold" : ""
                  }`}
                >
                  <BsBoxArrowInRight className="text-blue-600" /> Ingresar
                </button>
                <button
                  onClick={() => navigate("/registro")}
                  className={`flex items-center gap-2 text-gray-700 hover:text-blue-600 transition ${
                    location.pathname === "/registro" ? "text-blue-600 font-semibold" : ""
                  }`}
                >
                  <BsPersonPlus className="text-blue-600" /> Registrate
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Buscador móvil */}
        {location.pathname === "/cuerpo" && openSearchMobile && (
          <form
            onSubmit={handleBuscar}
            className="md:hidden flex items-center bg-white/90 rounded-xl shadow-md ring-1 ring-gray-200 mt-2 backdrop-blur-md animate-fade-in-up"
          >
            <BsSearch className="text-blue-500 ml-4 mr-2" />
            <input
              type="text"
              placeholder="Buscar productos..."
              value={termino}
              onChange={(e) => setTermino(e.target.value)}
              className="flex-grow h-11 bg-transparent outline-none text-gray-800 placeholder:text-gray-400"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 m-1 rounded-full hover:bg-blue-700 transition"
            >
              Buscar
            </button>
          </form>
        )}
      </div>

      {/* Menú móvil */}
      {openMobile && (
        <>
          <div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden"
            onClick={() => setOpenMobile(false)}
          ></div>
          <div className="md:hidden bg-white border-t border-gray-200 shadow-md backdrop-blur-md relative z-50 animate-fade-in-up">
            <nav className="px-4 py-4 flex flex-col gap-3">
              {!usuarioAutenticado ? (
                <>
                  <button
                    onClick={() => {
                      setOpenMobile(false);
                      navigate("/login");
                    }}
                    className="flex items-center gap-2 text-gray-800 hover:text-blue-600"
                  >
                    <BsBoxArrowInRight className="text-blue-600" /> Ingresar
                  </button>
                  <button
                    onClick={() => {
                      setOpenMobile(false);
                      navigate("/registro");
                    }}
                    className="flex items-center gap-2 text-gray-800 hover:text-blue-600"
                  >
                    <BsPersonPlus className="text-blue-600" /> Registrarse
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setOpenMobile(false);
                      navigate("/usuario/perfil");
                    }}
                    className="flex items-center gap-2 text-gray-800 hover:text-blue-600"
                  >
                   <BsPersonCircle className="text-blue-600" /> Mi perfil
                  </button>
                  <button
                    onClick={() => {
                      setOpenMobile(false);
                      navigate("/usuario/dashboard");
                    }}
                    className="flex items-center gap-2 text-gray-800 hover:text-blue-600"
                  >
                    <BsGear className="text-blue-600" /> Panel
                  </button>
                  <button
                    onClick={() => {
                      setOpenMobile(false);
                      cerrarSesion();
                    }}
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                  >
                    <BsBoxArrowRight className="text-red-600" /> Cerrar sesión
                  </button>
                </>
              )}
            </nav>
          </div>
        </>
      )}

      {/* Barra de progreso scroll */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all"
        style={{ width: `${scrollProgress}%` }}
      ></div>

      {/* Modales */}
      {mostrarModal &&
        ReactDOM.createPortal(
          <ModalAutenticacion onClose={() => setMostrarModal(false)} />,
          document.body
        )}

      {cargando &&
        ReactDOM.createPortal(
          <CargandoModal mensaje="Cerrando sesión..." visible={cargando} />,
          document.body
        )}
    </header>
  );
};

export default EncabezadoPublico;
