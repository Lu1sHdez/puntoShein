import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; // Importamos framer-motion para las animaciones
import axios from "axios"; // Para hacer la solicitud
import "../../css/TarjetaProductos.css"; // Ruta correcta al archivo de estilos

const ProductoCard = ({ producto }) => {
  const navigate = useNavigate();

  const handleVerDetalles = () => {
    navigate(`/producto/${producto.id}`); // Redirige a la página de detalles del producto
  };

  const handleAgregarCarrito = async () => {
    // Obtener el token desde localStorage
    const token = localStorage.getItem("token"); // Obtenemos el token desde localStorage

    console.log("Token desde localStorage:", token); // Ver el token en la consola

    if (!token) {
      alert("Debes iniciar sesión para agregar productos al carrito");
      return;
    }

    try {
      // Realizar la solicitud POST al backend para agregar al carrito
      const response = await axios.post(
        "http://localhost:4000/api/carrito/agregar",
        {
          producto_id: producto.id,
          cantidad: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Enviar el token en la cabecera de la solicitud
          },
          withCredentials: true, // Esto asegura que las cookies se envíen con la solicitud
        }
      );

      alert(response.data.message); // Mostrar mensaje de éxito del backend
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
      alert("Hubo un problema al agregar el producto al carrito");
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
    </motion.div>
  );
};

export default ProductoCard;
