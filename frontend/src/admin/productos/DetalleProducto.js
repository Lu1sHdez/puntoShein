import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RegresarButton from '../../components/Regresar';
import { motion } from 'framer-motion';
import { userLoadingContainer, dataLoadingAnimation } from '../Funciones.js';



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
    return <motion.div {...dataLoadingAnimation} className="text-center">Cargando...</motion.div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <motion.div {...userLoadingContainer}>
      <h1 className="text-3xl mb-6">Detalle del Producto</h1>
      {producto && (
        <div>
          <h2 className="text-xl font-bold">{producto.nombre}</h2>
          <p><strong>Descripción:</strong> {producto.descripcion}</p>
          <p><strong>Precio:</strong> {producto.precio}</p>
          {/* Agregar más detalles del producto si es necesario */}
        </div>
        
      )}
      <RegresarButton/>
    </motion.div>
    
  );
};

export default DetalleProducto;
