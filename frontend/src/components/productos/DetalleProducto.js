import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const DetalleProducto = () => {
  const { id } = useParams(); // 📌 Obtiene el ID del producto desde la URL
  const navigate = useNavigate(); // 🚀 Permite la navegación entre páginas
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

    fetchProducto();
  }, [id]);

  if (cargando) return <p className="text-center text-gray-500">Cargando producto...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  // 📌 Función para agregar el producto al carrito
  const handleAgregarCarrito = () => {
    console.log(`🛒 Producto agregado al carrito: ${producto.nombre}`);
    alert("Producto agregado al carrito"); // Puedes reemplazarlo con una función que maneje el carrito global
  };

  // 📌 Función para comprar ahora (redirige a la página de pago)
  const handleComprarAhora = () => {
    navigate(`/checkout?producto=${producto.id}`); // Redirige a una página de pago
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Imagen del producto */}
        <img src={producto.imagen} alt={producto.nombre} className="w-full h-96 object-cover" />

        <div className="p-6">
          {/* Nombre y descripción del producto */}
          <h2 className="text-2xl font-bold mb-2">{producto.nombre}</h2>
          <p className="text-gray-600 mb-4">{producto.descripcion}</p>

          {/* Precio */}
          <p className="text-pink-600 text-xl font-bold mb-4">${producto.precio}</p>

          {/* Botones de acción */}
          <div className="flex flex-col space-y-3">
            <button 
              onClick={handleComprarAhora} 
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold">
              Comprar Ahora
            </button>
            
            <button 
              onClick={handleAgregarCarrito} 
              className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition font-semibold">
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
