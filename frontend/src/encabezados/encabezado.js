import React, { useState, useEffect, useRef } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useSesionUsuario from "../context/useSesionUsuario";
import ReactDOM from "react-dom";
import { API_URL } from "../ApiConexion";
import axios from "axios";
import {
  BsBoxSeam,
  BsBoxArrowInRight,
  BsPersonPlus,
  BsBoxArrowRight,
  BsShop,
} from "react-icons/bs";
import CerrarSesionModal from "../modal/CerrarSesion";

const EncabezadoResponsive = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { usuarioAutenticado } = useSesionUsuario();

  const [empresa, setEmpresa] = useState(null);
  const [openNav, setOpenNav] = useState(false);
  const [mostrarModalCerrarSesion, setMostrarModalCerrarSesion] = useState(false);
  const [mostrarNavbar, setMostrarNavbar] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // === Obtener datos de empresa ===
  useEffect(() => {
    if (empresa) return;
    const obtenerEmpresa = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/empresa/empresa`, {
          withCredentials: true,
        });
        setEmpresa(res.data);
      } catch (error) {
        console.error("Error al cargar datos de empresa:", error);
      }
    };
    obtenerEmpresa();
  }, [empresa]);

  // === Ocultar navbar al hacer scroll hacia abajo ===
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

      // progreso de scroll
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (currentY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // === Cerrar menú móvil al hacer clic fuera ===
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (openNav && !e.target.closest(".menu-container")) {
        setOpenNav(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [openNav]);

  // === Lista de navegación ===
  const navList = (
    <ul className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-8 text-gray-800 font-medium">
      <li>
        <Link
          to="/cuerpo"
          onClick={() => setOpenNav(false)}
          className={`flex items-center gap-2 relative transition-all duration-200 ${
            location.pathname === "/cuerpo"
              ? "text-blue-600 font-semibold after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:rounded"
              : "text-gray-700 hover:text-blue-600"
          }`}
        >
          <BsBoxSeam className="text-blue-600" />Productos
        </Link>
      </li>

      {usuarioAutenticado ? (
        <li>
          <button
            onClick={() => {
              setMostrarModalCerrarSesion(true);
              setOpenNav(false);
            }}
            className="flex items-center gap-2 hover:text-red-600 transition-colors"
          >
            <BsBoxArrowRight className="text-red-600" />Cerrar sesión
          </button>
        </li>
      ) : (
        <>
          <li>
            <button
              onClick={() => {
                navigate("/login");
                setOpenNav(false);
              }}
              className={`flex items-center gap-2 hover:text-blue-600 transition-colors ${
                location.pathname === "/login" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              <BsBoxArrowInRight className="text-blue-600" />
              Ingresar
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                navigate("/registro");
                setOpenNav(false);
              }}
              className={`flex items-center gap-2 hover:text-blue-600 transition-colors ${
                location.pathname === "/registro" ? "text-blue-600 font-semibold" : ""
              }`}
            >
              <BsPersonPlus className="text-blue-600" />
              Registrate
            </button>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <>
      <Navbar
        blurred={false}
        role="navigation"
        aria-label="Barra de navegación principal"
        className={`sticky top-0 z-50 mx-auto max-w-full px-3 sm:px-6 lg:px-8 py-3
        bg-white/80 backdrop-blur-xl border-b border-gray-200 shadow-md/30
        transition-all duration-500 ease-in-out transform
        ${mostrarNavbar ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"}`}
      >
        <div className="menu-container flex items-center justify-between text-gray-900">
          {/* Logo y nombre de empresa */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-3 cursor-pointer select-none animate-fade-in-up"
          >
            {empresa?.logo ? (
              <img
                src={empresa.logo}
                alt="Logo de la empresa"
                className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-200"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <BsShop className="text-blue-600 text-xl" />
              </div>
            )}
            <Typography
              as="span"
              className="font-bold text-base sm:text-lg uppercase tracking-wide"
            >
              {empresa?.nombre || "Punto Shein"}
            </Typography>
          </div>

          {/* Menú Desktop */}
          <div className="hidden lg:block">{navList}</div>

          {/* Botón hamburguesa móvil */}
          <IconButton
            variant="text"
            ripple={false}
            aria-expanded={openNav}
            aria-controls="mobile-menu"
            aria-label="Abrir menú de navegación"
            className="ml-auto text-gray-800 hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-6 w-6"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </IconButton>
        </div>

        {/* Menú móvil animado */}
        <MobileNav
          open={openNav}
          className={`pb-3 transform transition-all duration-500 ease-in-out origin-top ${
            openNav
              ? "max-h-[400px] opacity-100 translate-y-0"
              : "max-h-0 opacity-0 -translate-y-2"
          }`}
        >
          <div className="pt-2 border-t border-gray-100">{navList}</div>
        </MobileNav>

        {/* Barra de progreso del scroll */}
        <div
          className="absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all"
          style={{ width: `${scrollProgress}%` }}
        />
      </Navbar>

      {/* Overlay oscuro en móvil */}
      {openNav && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setOpenNav(false)}
        ></div>
      )}

      {/* Modal de cierre de sesión */}
      {mostrarModalCerrarSesion &&
        ReactDOM.createPortal(
          <CerrarSesionModal
            visible={mostrarModalCerrarSesion}
            onClose={() => setMostrarModalCerrarSesion(false)}
          />,
          document.body
        )}
    </>
  );
};

export default EncabezadoResponsive;
