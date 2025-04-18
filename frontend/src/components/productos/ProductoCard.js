// src/components/productos/ProductoCard.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importamos framer-motion para las animaciones
import agregarCarrito from "../cart/Agregar"; // Importamos la función agregarCarrito desde los servicios
import axios from "axios";
import "../../css/TarjetaProductos.css";
import "../../css/Botones.css"
import { API_URL } from "../../ApiConexion";

const ProductoCard = ({ producto }) => {
  const [usuario, setUsuario] = useState(null); // Estado para almacenar los datos del usuario
  const [mensaje, setMensaje] = useState(""); // Estado para mostrar el mensaje
  const navigate = useNavigate();

  useEffect(() => {
    // Función para obtener los datos del usuario
    const obtenerUsuario = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/usuario/perfil`, {
          withCredentials: true, // Asegura que las cookies se envíen con la solicitud
        });
        setUsuario(response.data); // Almacena los datos del usuario en el estado
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };

    obtenerUsuario();
  }, []);

  const handleVerDetalles = () => {
    navigate(`/producto/${producto.id}`); // Redirige a la página de detalles del producto
  };

  const handleAgregarCarrito = () => {
    if (usuario) {
      // Llama a la función de agregar al carrito
      agregarCarrito(usuario, producto).then((responseMessage) => {
        setMensaje(responseMessage); // Muestra el mensaje después de agregar al carrito
      });
    } else {
      setMensaje("Por favor, inicia sesión para agregar productos al carrito.");
    }
  };
  
  return (
    <motion.div
      className="tarjeta-producto"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <img
        src={producto.imagen}
        alt={producto.nombre}
        className="w-full h-64 object-cover"
      />
      <h3 className="nombre-producto">{producto.nombre}</h3>
      <p className="descripcion">{producto.descripcion}</p>
      <p className="precio">${producto.precio}</p>

      <div className="botones">
        <motion.button
          onClick={handleAgregarCarrito} // Llama a la función para agregar al carrito
          className="boton-agregar"
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          Agregar al carrito
        </motion.button>
        <motion.button
          onClick={handleVerDetalles}
          className="boton-detalles"     
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 400 }}     
        >
          Ver detalles
        </motion.button>
      </div>

      {mensaje && <p className="mensaje">{mensaje}</p>} {/* Mostrar mensaje de estado */}
    </motion.div>
  );
};

export default ProductoCard;
