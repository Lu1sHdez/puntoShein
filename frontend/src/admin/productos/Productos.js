import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RegresarButton from '../../components/Regresar.js';
import { Link } from 'react-router-dom';
import { userLoadingContainer, dataLoadingAnimation } from '../Funciones.js';
import { motion } from 'framer-motion';

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/productos', {
          withCredentials: true,
        });
        setProductos(response.data);
      } catch (err) {
        setError('No se pudo obtener los productos');
        console.error('Error al obtener los productos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []);

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/admin/productos/${id}`, {
        withCredentials: true,
      });
      setProductos(productos.filter((producto) => producto.id !== id));
    } catch (err) {
      console.error('Error al eliminar el producto:', err);
    }
  };

  if (loading) {
    return <motion.div {...dataLoadingAnimation} className="text-center">Cargando...</motion.div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <motion.div {...userLoadingContainer} className="p-6">
      <h1 className="text-3xl mb-6">Gestión de Productos</h1>

      <div className="mb-4">
        <Link to="/admin/productos/crear" className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition">
          Crear Nuevo Producto
        </Link>
      </div>

      <motion.table className="min-w-full bg-white border border-gray-200" initial="initial" animate="animate" exit="exit" transition={{ duration: 0.5 }}>
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Nombre</th>
            <th className="py-2 px-4 border-b">Descripción</th>
            <th className="py-2 px-4 border-b">Precio</th>
            <th className="py-2 px-4 border-b">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <motion.tr key={producto.id} {...dataLoadingAnimation}>
              <td className="py-2 px-4 border-b">{producto.id}</td>
              <td className="py-2 px-4 border-b">{producto.nombre}</td>
              <td className="py-2 px-4 border-b">{producto.descripcion}</td>
              <td className="py-2 px-4 border-b">{producto.precio}</td>
              <td className="py-2 px-4 border-b">
                <button className="text-blue-500 hover:text-blue-700">Editar</button>
                <button
                  className="text-red-500 hover:text-red-700 ml-4"
                  onClick={() => handleEliminar(producto.id)}
                >
                  Eliminar
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
      <RegresarButton />
    </motion.div>
  );
};

export default Productos;
