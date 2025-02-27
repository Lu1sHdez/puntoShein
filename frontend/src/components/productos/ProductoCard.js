// src/components/ProductoCard.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importamos framer-motion para las animaciones
import "../../css/TarjetaProductos.css"; // Ruta correcta al archivo de estilos

const ProductoCard = ({ producto }) => {
  const navigate = useNavigate();

  const handleVerDetalles = () => {
    navigate(`/producto/${producto.id}`); // Redirige a la página de detalles del producto
  };

  return (
    <motion.div
      className="tarjeta-producto"
      initial={{ opacity: 0, y: 50 }} // Inicia la animación desvanecido y desplazado
      animate={{ opacity: 1, y: 0 }} // Se desvanece y se mueve a su lugar
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }} // Animación con resorte
    >
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-full h-64 object-cover"
      />
      <h3 className="nombre-producto">{producto.nombre}</h3>
      <p className="descripcion">{producto.descripcion}</p>
      <p className="precio">${producto.precio}</p>

      {/* Contenedor para los botones */}
      <div className="botones">
        <motion.button
          className="boton-agregar"
          whileHover={{ scale: 1.1 }} // Aumenta el tamaño del botón al hacer hover
          transition={{ type: "spring", stiffness: 400 }}
        >
          Agregar al carrito
        </motion.button>
        <motion.button
          onClick={handleVerDetalles}
          className="boton-detalles"
          whileHover={{ scale: 1.1 }} // Aumenta el tamaño del botón al hacer hover
          transition={{ type: "spring", stiffness: 400 }}
        >
          Ver detalles
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductoCard;
