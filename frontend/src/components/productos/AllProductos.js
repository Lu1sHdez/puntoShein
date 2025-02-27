// src/components/AllProductos.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProductoCard from "./ProductoCard";  // Importa el componente ProductoCard
import RegresarButton from "../Regresar";
import { motion } from "framer-motion"; // Importamos framer-motion

const AllProductos = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [visibleProductos, setVisibleProductos] = useState(8);
  const location = useLocation(); 

  useEffect(() => {
    const fetchProductos = async () => {
      setCargando(true);
      try {
        const response = await axios.get(`http://localhost:4000/api/productos/allProductos${location.search}`);
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setError("Error al cargar los productos.");
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, [location.search]);

  const handleVerMas = () => {
    setVisibleProductos((prevVisible) => prevVisible + 4);
  };

  return (
    <div className="container mx-auto px-4 mt-0">
      <h2 className="text-2xl font-bold mb-4">Todos los productos</h2>
      {cargando && <p>Cargando productos...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!cargando && productos.length === 0 && <p>No hay productos disponibles.</p>}

      {/* Contenedor de los productos con grid, con margen izquierdo */}
      <div className="ml-1/4 mt-4">
        {/* Animamos la entrada de los productos */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 50 }} // Comienza desvanecido y desplazado hacia abajo
          animate={{ opacity: 1, y: 0 }} // Se desvanece y se desplaza hacia su lugar
          transition={{ duration: 0.8, type: "spring", stiffness: 120 }} // Duración de la animación y efecto de resorte
        >
          {productos.slice(0, visibleProductos).map((producto) => (
            <motion.div
              key={producto.id}
              initial={{ opacity: 0, y: 50 }} // Cada producto comienza desvanecido y desplazado
              animate={{ opacity: 1, y: 0 }} // Los productos aparecen y se colocan en su lugar
              transition={{ duration: 0.5, type: "spring", stiffness: 120 }} // Animación de los productos
            >
              <ProductoCard producto={producto} />
            </motion.div>
          ))}
        </motion.div>

        {/* Botón "Ver más" - Solo se muestra si hay más productos */}
        {visibleProductos < productos.length && (
          <div className="flex justify-center mt-6">
            <motion.button
              onClick={handleVerMas}
              className="bg-pink-600 text-white py-2 px-6 rounded-lg hover:bg-pink-700 transition-all"
              whileHover={{ scale: 1.05 }} // Efecto de hover en el botón
              transition={{ type: "spring", stiffness: 300 }}
            >
              Ver más
            </motion.button>
            <RegresarButton />
          </div>
        )}
      </div>
    </div>
  );
};

export default AllProductos;
