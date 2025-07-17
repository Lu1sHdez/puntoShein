// src/components/AllProductos.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProductoCard from "./ProductoCard";
import RegresarButton from "../Regresar";
import "../../css/Botones.css";
import { motion } from "framer-motion";
import { API_URL } from "../../ApiConexion";
import CargandoBarra from "../../Animations/CargandoBarra";

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
        const response = await axios.get(`${API_URL}/api/productos/obtener${location.search}`);
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
    <div className="min-h-screen w-full bg-gray-50 py-6">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Catálogo de Productos</h2>

        {cargando && (
          <div className="flex justify-center items-center py-8">
            <CargandoBarra size="md" color="primary" message="Cargando productos..." />
          </div>
        )}

        {error && <p className="text-red-500 text-center">{error}</p>}
        {!cargando && productos.length === 0 && <p className="text-center text-gray-500">No hay productos disponibles.</p>}

        <section className="grid auto-fit gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-8 gap-6">
            {productos.slice(0, visibleProductos).map((producto) => (
              <ProductoCard key={producto.id} producto={producto} />
            ))}
          </div>
        </section>

        {visibleProductos < productos.length && (
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <motion.button
              onClick={handleVerMas}
              className="boton-verMas"
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
