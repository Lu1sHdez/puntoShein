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
      className="relative flex items-center space-x-1 w-full max-w-[1200px]"  // Hacer el input más ancho
      initial={{ opacity: 0, scale: 0.8, x: -20 }} 
      animate={{ opacity: 1, scale: 1, x: 0 }} 
      transition={{ duration: 0.8, type: "spring", stiffness: 120 }} 
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
        placeholder="Buscar productos..."
        className="pl-8 pr-20 py-4 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 
          focus:ring-indigo-500 transition-all shadow-md focus:shadow-xl hover:shadow-2xl focus:ring-opacity-80 
          text-black hover:bg-gray-100 focus:ring-offset-2 text-left text-xl w-full"  // Aumenta el tamaño de la letra y hace el input más ancho
      />
      
      {/* Ícono de búsqueda al final */}
      <motion.div
        className="absolute right-4 text-gray-600 text-xl"
        initial={{ opacity: 0, x: 30 }} 
        animate={{ opacity: 1, x: 0 }} 
        transition={{ duration: 1, delay: 0.5 }} 
      >
        <FaSearch />
      </motion.div>
    </motion.div>
  );
};

export default Busqueda;
