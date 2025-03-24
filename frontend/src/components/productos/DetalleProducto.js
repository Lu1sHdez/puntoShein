import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../home/Breadcrumbs"; // Importamos las migas de pan personalizadas
import { mostrarStock } from "../../utils/funtionProductos"; 
import RegresarButton from "../Regresar";
import agregarCarrito from "../cart/Agregar";
import Swal from "sweetalert2"; 
import "../../css/Botones.css"
import { motion } from "framer-motion";
import { mostrarNotificacion } from "../../Animations/NotificacionSwal";


const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [producto, setProducto] = useState(null);
  const [usuario, setUsuario] = useState(null); // Estado para almacenar el usuario

  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Obtener los detalles del producto
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/productos/${id}`);
        setProducto(response.data);
      } catch (error) {
        console.error("Error al obtener detalles del producto:", error);
        setError("No se pudo cargar la información del producto.");
      } finally {
        setCargando(false);
      }
    };

    // Obtener los datos del usuario
    const obtenerUsuario = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/usuario/perfil", {
          withCredentials: true, // Asegura que las cookies se envíen con la solicitud
        });
        setUsuario(response.data); // Almacena los datos del usuario en el estado
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };

    fetchProducto();
    obtenerUsuario(); // Llamamos a la función para obtener el perfil del usuario
  }, [id]);

  if (cargando) return <p className="text-center text-gray-500">Cargando producto...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const { mensaje, color, icono } = mostrarStock(producto.stock);

  const handleAgregarCarrito = () => {
    // Verificamos si el usuario está logueado antes de agregar al carrito
    if (!usuario) {
      Swal.fire({
        icon: "warning",
        title: "Inicia sesión o regístrate",
        text: "Para agregar este producto al carrito, debes iniciar sesión o registrarte.",
        confirmButtonText: "Aceptar",
      });
      return;
    }
    
    // Si está logueado, llamamos a la función de agregar al carrito
    agregarCarrito(usuario, producto);
  };
  const handleComprarAhora = async () => {
    if (!usuario || !usuario.id) {
      Swal.fire({
        icon: "warning",
        title: "Inicia sesión o regístrate",
        text: "Para comprar este producto, debes iniciar sesión o registrarte.",
        confirmButtonText: "Aceptar",
      });
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:4000/api/compra/comprar",
        {
          producto_id: producto.id,
          cantidad: 1,
          usuario_id: usuario.id,
        },
        {
          withCredentials: true,
        }
      );
      mostrarNotificacion("success", "La compra se ha registrado exitosamente.")

  
      // Opcional: puedes volver a cargar el producto para actualizar el stock
      const updatedProducto = await axios.get(`http://localhost:4000/api/productos/${id}`);
      setProducto(updatedProducto.data);
  
    } catch (error) {
      console.error("Error al comprar:", error);
      Swal.fire({
        icon: "error",
        title: "Error al comprar",
        text: error.response?.data?.mensaje || "No se pudo completar la compra.",
        confirmButtonText: "Aceptar",
      });
    }
  };
  

  return (
    <div className="container mx-auto py-0 text-left">
      {/* 🏷 Migas de pan con mejor diseño y espaciado */}
      <div className="mt-0 text-left mb-1">
        <Breadcrumbs producto={producto} />
      </div>

      <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden flex flex-col lg:flex-row">
        <div className="w-full lg:w-1/2 flex justify-center items-center p-6">
          <img 
            src={producto.imagen} 
            alt={producto.nombre} 
            className="rounded-lg shadow-md object-cover w-full max-w-md h-auto"
          />
        </div>

        {/* Detalles del producto */}
        <div className="w-full lg:w-1/2 p-6">
          <h2 className="text-3xl font-bold text-gray-900">{producto.nombre}</h2>
          <p className="text-gray-600 mt-2">{producto.descripcion}</p>
          <p className="text-gray-600 mt-2">Color: {producto.color}</p>

          {/* Mostrar información del stock con diseño dinámico */}
          <div className={`flex items-center mt-2 ${color}`}>
            {icono}
            <span className="font-medium">{mensaje}</span>
          </div>

          <p className="text-2xl font-semibold text-pink-600 mt-4">${producto.precio}</p>

          <div className="botones-acciones flex space-x-4">
            <motion.button 
              onClick={handleComprarAhora} 
              className="boton-comprar"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}>
              Comprar Ahora
            </motion.button>
            
            <motion.button 
              onClick={handleAgregarCarrito} 
              className="boton-agregar"
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400 }}>
              Agregar al Carrito
            </motion.button>
            <RegresarButton/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
