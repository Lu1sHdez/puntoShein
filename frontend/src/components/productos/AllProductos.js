// src/components/AllProductos.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProductoCard from "./ProductoCard";  // Importa el componente ProductoCard
import RegresarButton from "../Regresar";
import "../../css/Botones.css"
import { motion } from "framer-motion"; 

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
        {/* Contenedor de productos sin animaciones */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {productos.slice(0, visibleProductos).map((producto) => (
            <div key={producto.id}>
              <ProductoCard producto={producto} />
            </div>
          ))}
        </div>

        {/* Botón "Ver más" - Solo se muestra si hay más productos */}
        {visibleProductos < productos.length && (
          <div className="flex justify-center mt-6">
            <motion.button
              onClick={handleVerMas}
              className= "boton-verMas"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}
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
