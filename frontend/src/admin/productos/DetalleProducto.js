import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RegresarButton from '../../components/Regresar';
import { motion } from 'framer-motion';
import { dataLoadingAnimation } from '../../components/Funciones.js';

const DetalleProducto = () => {
  const [producto, setProducto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();  // Obtener el ID del producto desde la URL

  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/admin/productos/${id}`, {
          withCredentials: true,
        }); 
        setProducto(response.data);
      } catch (err) {
        setError('No se pudo obtener los detalles del producto');
        console.error('Error al obtener los detalles del producto:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducto();
  }, [id]);

  // Cargando productos o error
  if (loading) {
    return <motion.div {...dataLoadingAnimation} className="text-center text-xl text-gray-500 py-6">Cargando...</motion.div>;
  }

  if (error) {
    return <div className="text-center text-red-600 py-6">{error}</div>;
  }

  return (
    <motion.div {...dataLoadingAnimation} className="p-6 bg-white shadow-md rounded-lg max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center text-black mb-6">Detalle del Producto</h1>

      {producto && (
        <div className="space-y-4">
          <div className="bg-indigo-50 p-4 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800">{producto.nombre}</h2>
            <p className="text-lg text-gray-700"><strong>Descripción:</strong> {producto.descripcion}</p>
            <p className="text-lg text-gray-700"><strong>Color:</strong> {producto.color}</p>
            <p className="text-lg text-gray-700"><strong>Precio:</strong> ${producto.precio}</p>
            <div className="mb-4">
              <strong className="text-gray-700"></strong>
              {producto.imagen ? (
                <img src={producto.imagen} alt="imagen de la producto" className="w-32 h-auto" />
              ) : (
                <p className="text-gray-600">No disponible</p>
              )}
            </div>
          </div>

          {/* Puedes agregar más detalles si es necesario */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-semibold text-gray-800">Detalles adicionales</h3>
            {/* Puedes agregar más información del producto aquí */}
            {/* Ejemplo: <p><strong>Stock:</strong> {producto.stock}</p> */}
          </div>
        </div>
      )}

      {/* Botón de regreso estilizado */}
      <div className="mt-6">
        <RegresarButton />
      </div>
    </motion.div>
  );
};

export default DetalleProducto;
