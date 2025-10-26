import React, { useState, useEffect, useRef } from "react";
import { Navbar, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../ApiConexion";
import axios from "axios";
import { BsShop } from "react-icons/bs";

const EncabezadoResponsive = () => {
  const navigate = useNavigate();
  const [empresa, setEmpresa] = useState(null);
  const [mostrarNavbar, setMostrarNavbar] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  // === Obtener datos de empresa ===
  useEffect(() => {
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
  }, []);

  // === Ocultar navbar al hacer scroll hacia abajo ===
  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (!ticking.current) {
        window.requestAnimationFrame(() => {
          setMostrarNavbar(currentY <= lastScrollY.current || currentY < 60);

          // Calcula progreso del scroll
          const totalHeight = document.body.scrollHeight - window.innerHeight;
          setScrollProgress((currentY / totalHeight) * 100);

          lastScrollY.current = currentY;
          ticking.current = false;
        });
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Navbar
      blurred={false}
      role="navigation"
      aria-label="Encabezado de navegación"
      className={`sticky top-0 z-50 mx-auto max-w-full px-4 py-3 lg:px-8
      bg-white/90 backdrop-blur-xl border-b border-gray-200 shadow-sm
      transition-all duration-500 ease-in-out transform
      ${mostrarNavbar ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"}`}
    >
      <div className="flex items-center justify-between text-gray-900">
        {/* Logo y nombre de la empresa */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none group"
          onClick={() => navigate("/")}
        >
          {empresa?.logo ? (
            <img
              src={empresa.logo}
              alt="Logo de empresa"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-200 group-hover:ring-blue-300 transition-all duration-300"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
              <BsShop className="text-blue-600 text-xl" />
            </div>
          )}

          <Typography
            as="span"
            className="font-bold text-base sm:text-lg uppercase tracking-wide group-hover:text-blue-600 transition-colors"
          >
            {empresa?.nombre || "Punto Shein"}
          </Typography>
        </div>
      </div>

      {/* Barra de progreso de desplazamiento */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-blue-600 transition-all"
        style={{ width: `${scrollProgress}%` }}
      ></div>
    </Navbar>
  );
};

export default EncabezadoResponsive;
