import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductoCard from "../../productos/ProductoCard";
import Fondo from "./Fondo";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  aparecer,
  deslizarIzquierda,
  contenedorEscalonado,
  itemEscalonado
} from "../../../Animations/Animacion";
import {
  transicionPagina,
  hoverBoton,
  clicBoton
} from "../../../Animations/Transicion";
import { API_URL } from "../../../ApiConexion";

const Cuerpo = () => {
  const [productosDestacados, setProductosDestacados] = useState([]);
  const [ofertas, setOfertas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/productos/destacados`);
        if (Array.isArray(response.data)) {
          setProductosDestacados(response.data);
        } else {
          console.warn("Respuesta no válida para productosDestacados:", response.data);
          setProductosDestacados([]);
        }
      } catch (error) {
        console.error("Error al obtener productos destacados:", error);
        setProductosDestacados([]);
      }
    };

    const fetchOfertas = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/ofertas`);
        if (Array.isArray(response.data)) {
          setOfertas(response.data);
        } else {
          console.warn("Respuesta no válida para ofertas:", response.data);
          setOfertas([]);
        }
      } catch (error) {
        console.error("Error al obtener ofertas:", error);
        setOfertas([]);
      }
    };

    fetchProductos();
    fetchOfertas();
  }, []);

  const navigateAllProductos = () => {
    navigate("/productos");
  };

  return (
    <main className="bg-gray-50">
      {/* Banner Principal */}
      <Fondo backgroundUrl="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1738378032/pshein_dsluvs.jpg">
        <motion.h1
          className="text-5xl font-extrabold"
          variants={aparecer}
          initial="hidden"
          animate="visible"
          transition={transicionPagina}
        >
          Bienvenido a Punto Shein
        </motion.h1>
        <motion.p
          className="mt-4 text-2xl font-light"
          variants={deslizarIzquierda}
          initial="hidden"
          animate="visible"
          transition={transicionPagina}
        >
          Tu tienda de moda en línea con ofertas increíbles
        </motion.p>
        <motion.button
          className="mt-6 inline-block bg-red-600 text-white py-3 px-8 rounded-lg text-xl shadow-lg transform hover:scale-105 transition-all"
          onClick={navigateAllProductos}
          whileHover={hoverBoton}
          whileTap={clicBoton}
        >
          Explorar Productos
        </motion.button>
      </Fondo>

      {/* Productos Destacados */}
      <motion.section
        className="py-20 px-6"
        variants={contenedorEscalonado}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-4xl font-extrabold text-center mb-12">
          Productos Destacados
        </h2>

        {productosDestacados.length === 0 ? (
          <p className="text-center text-gray-500">No hay productos destacados por ahora.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
            {productosDestacados.map((producto) => (
              <motion.div key={producto.id} variants={itemEscalonado}>
                <ProductoCard producto={producto} />
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Ofertas Especiales */}
      <motion.section
        className="bg-red-600 text-white py-20 px-6"
        variants={contenedorEscalonado}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-4xl font-extrabold text-center mb-12">
          Ofertas Especiales
        </h2>

        {ofertas.length === 0 ? (
          <p className="text-center text-white">No hay ofertas activas por ahora.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            {ofertas.map((oferta) => (
              <motion.div
                key={oferta.id}
                className="bg-white text-black p-6 rounded-lg shadow-lg"
                variants={itemEscalonado}
              >
                <img
                  src={oferta.imagen}
                  alt={oferta.titulo}
                  className="w-full h-64 object-cover rounded-lg shadow-md"
                />
                <h3 className="text-2xl font-semibold mt-6">{oferta.titulo}</h3>
                <p className="mt-2 text-lg">{oferta.descripcion}</p>
                <motion.button
                  className="mt-6 inline-block bg-red-600 text-white py-3 px-8 rounded-lg text-xl shadow-md hover:bg-red-700 transition-all"
                  whileHover={hoverBoton}
                  whileTap={clicBoton}
                >
                  Ver Oferta
                </motion.button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Testimonios de Clientes */}
      <motion.section
        className="py-20 px-6 bg-gray-100"
        variants={contenedorEscalonado}
        initial="hidden"
        animate="visible"
      >
        <h2 className="text-4xl font-extrabold text-center mb-12">
          Lo que dicen nuestros clientes
        </h2>
        <div className="flex flex-wrap justify-center gap-10">
          {[
            "¡Excelente experiencia de compra! Los productos son de calidad y la entrega fue rápida.",
            "Amo mis nuevas prendas, me llegó todo muy rápido y como esperaba. ¡100% recomendado!",
            "Todo perfecto, el servicio al cliente es excepcional y los productos son excelentes.",
          ].map((testimonio, index) => (
            <motion.div
              key={index}
              className="w-full md:w-1/3 p-6 bg-white rounded-lg shadow-lg"
              variants={itemEscalonado}
            >
              <p className="text-lg">{testimonio}</p>
              <p className="text-sm text-gray-600 mt-4">
                - {["Juan Pérez", "María Gómez", "Luis Hernández"][index]}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </main>
  );
};

export default Cuerpo;
