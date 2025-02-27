// src/components/Búsqueda.js
import React, { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion"; // Importamos Framer Motion

const Busqueda = ({ busqueda, setBusqueda }) => {
  const navigate = useNavigate();
  const location = useLocation(); // Usamos useLocation para saber en qué página estamos

  useEffect(() => {
    // Si la búsqueda está vacía y estamos en la página de búsqueda, mostramos todos los productos
    if (busqueda === "" && location.pathname === "/buscar") {
      navigate("/productos"); // Redirige a productos si la búsqueda está vacía en la página de búsqueda
    }
  }, [busqueda, navigate, location.pathname]);

  return (
    <motion.div
      className="relative flex items-center space-x-3 w-full max-w-[600px]"
      initial={{ opacity: 0, scale: 0.8, x: -20 }} // Animación inicial: opacidad baja, escala pequeña, desplazado a la izquierda
      animate={{ opacity: 1, scale: 1, x: 0 }} // Animación de entrada: aparece con escala normal y se desplaza a su lugar
      transition={{ duration: 0.8, type: "spring", stiffness: 120 }} // Duración más larga y con un efecto de "resorte" más suave
    >
      {/* Input de búsqueda */}
      <input
        type="text"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)} // Filtra en tiempo real
        onKeyDown={(e) => {
          if (e.key === "Enter" && busqueda.trim()) {
            navigate(`/buscar?nombre=${busqueda}`); // Navega con la búsqueda
          }
        }} // Busca cuando presiona Enter
        placeholder="Buscar producto..."
        className="pl-4 pr-12 py-3 w-full rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 
        focus:ring-indigo-500 transition-all shadow-md focus:shadow-xl hover:shadow-2xl focus:ring-opacity-80 text-black 
        hover:bg-gray-100 focus:ring-offset-2"
      />
      
      {/* Ícono de búsqueda al final */}
      <motion.div
        className="absolute right-4 text-gray-600 text-xl"
        initial={{ opacity: 0, x: 30 }} // Animación inicial del ícono (opacidad 0 y desplazado a la derecha)
        animate={{ opacity: 1, x: 0 }} // El ícono se vuelve visible y se mueve a su lugar original
        transition={{ duration: 1, delay: 0.5 }} // Duración de la animación con un pequeño retraso
      >
        <FaSearch />
      </motion.div>
    </motion.div>
  );
};

export default Busqueda;
