// src/components/Cuerpo.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import ProductoCard from "../../productos/ProductoCard"; // Componente para mostrar un producto individual
import Fondo from "./Fondo"; // Importamos el componente de fondo
import { useNavigate } from "react-router-dom";

const Cuerpo = () => {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/productos/destacados");
        setProductosDestacados(response.data);
      } catch (error) {
        console.error("Error al obtener productos destacados:", error);
      }
    };

    const fetchOfertas = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/ofertas");
        setOfertas(response.data);
      } catch (error) {
        console.error("Error al obtener ofertas:", error);
      }
    };

    fetchProductos();
    fetchOfertas();
  }, []);
    
  const navigateAllProductos =()=>{
    navigate("/productos")
  }

  return (
    <main className="bg-gray-50">
      {/* Banner Principal con Fondo.js */}
      <Fondo backgroundUrl="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1738378032/pshein_dsluvs.jpg">
        <motion.h1
          className="text-5xl font-extrabold"
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, type: "spring" }}
        >
          Bienvenido a Punto Shein
        </motion.h1>
        <motion.p
          className="mt-4 text-2xl font-light"
          initial={{ y: 50 }}
          animate={{ y: 0 }}
          transition={{ duration: 1, type: "spring", delay: 0.3 }}
        >
          Tu tienda de moda en línea con ofertas increíbles
        </motion.p>
        <motion.button
          className="mt-6 inline-block bg-red-600 text-white py-3 px-8 rounded-lg text-xl shadow-lg transform hover:scale-105 transition-all"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          onClick={navigateAllProductos}
        >
          Explorar Productos

          {/*  */}
        </motion.button>
      </Fondo>

      {/* Productos Destacados */}
      <section className="py-20 px-6">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Productos Destacados
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
          {productosDestacados.map((producto) => (
            <motion.div
              key={producto.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ProductoCard producto={producto} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ofertas Especiales */}
      <section className="bg-red-600 text-white py-20 px-6">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Ofertas Especiales
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {ofertas.map((oferta) => (
            <motion.div
              key={oferta.id}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-white text-black p-6 rounded-lg shadow-lg transition-transform transform hover:scale-105">
                <img
                  src={oferta.imagen}
                  alt={oferta.titulo}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <h3 className="text-2xl font-semibold mt-6">{oferta.titulo}</h3>
                <p className="mt-2 text-lg">{oferta.descripcion}</p>
                <motion.button
                  className="mt-6 inline-block bg-red-600 text-white py-3 px-8 rounded-lg text-xl shadow-md hover:bg-red-700 transition-all"
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  Ver Oferta
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonios de Clientes */}
      <section className="py-20 px-6 bg-gray-100">
        <motion.h2
          className="text-4xl font-extrabold text-center mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Lo que dicen nuestros clientes
        </motion.h2>
        <div className="flex flex-wrap justify-center gap-10">
          <motion.div
            className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg">
              "¡Excelente experiencia de compra! Los productos son de calidad y la entrega fue rápida."
            </p>
            <p className="text-sm text-gray-600 mt-4">- Juan Pérez</p>
          </motion.div>
          <motion.div
            className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg">
              "Amo mis nuevas prendas, me llegó todo muy rápido y como esperaba. ¡100% recomendado!"
            </p>
            <p className="text-sm text-gray-600 mt-4">- María Gómez</p>
          </motion.div>
          <motion.div
            className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg">
              "Todo perfecto, el servicio al cliente es excepcional y los productos son excelentes."
            </p>
            <p className="text-sm text-gray-600 mt-4">- Luis Hernández</p>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default Cuerpo;
