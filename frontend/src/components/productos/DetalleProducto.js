import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Breadcrumbs from "../home/Breadcrumbs"; //Importamos las migas de pan personalizadas
import { mostrarStock } from "../../utils/funtionProductos"; 

const DetalleProducto = () => {
  const { id } = useParams();
  const navigate = useNavigate();
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

  const { mensaje, color, icono } = mostrarStock(producto.stock);

  const handleAgregarCarrito = () => {
    console.log(`🛒 Producto agregado al carrito: ${producto.nombre}`);
    alert("Producto agregado al carrito");
  };

  const handleComprarAhora = () => {
    navigate(`/checkout?producto=${producto.id}`);
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
          {/* Mostrar información del stock con diseño dinámico */}
          <div className={`flex items-center mt-2 ${color}`}>
            {icono}
            <span className="font-medium">{mensaje}</span>
          </div>

          <p className="text-2xl font-semibold text-pink-600 mt-4">${producto.precio}</p>

          {/* 🛒 Botones de acción */}
          <div className="flex flex-col space-y-4 mt-6">
            <button 
              onClick={handleComprarAhora} 
              className="w-full bg-blue-600 text-white py-3 rounded-lg shadow-md text-lg font-semibold transition transform hover:scale-105 hover:bg-blue-700"
            >
              Comprar Ahora
            </button>
            
            <button 
              onClick={handleAgregarCarrito} 
              className="w-full bg-pink-600 text-white py-3 rounded-lg shadow-md text-lg font-semibold transition transform hover:scale-105 hover:bg-pink-700"
            >
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetalleProducto;
