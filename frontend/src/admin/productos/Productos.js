import React, { useEffect, useState } from 'react';
import axios from 'axios';  // Para hacer las solicitudes HTTP
import RegresarButton from '../../components/Regresar.js';  // Importamos el botón de regreso
import { Link } from 'react-router-dom';  // Importamos Link para redirigir al formulario de crear producto

const Productos = () => {
  const [productos, setProductos] = useState([]);  // Estado para los productos
  const [loading, setLoading] = useState(true);  // Estado para saber si estamos cargando productos
  const [error, setError] = useState(null);  // Para manejar errores

  useEffect(() => {
    // Función para obtener los productos de la API
    const fetchProductos = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/productos', {
          withCredentials: true,  // Esto es necesario si estás usando cookies
        });
        setProductos(response.data);  // Guardamos los productos en el estado
      } catch (err) {
        setError('No se pudo obtener los productos');
        console.error('Error al obtener los productos:', err);
      } finally {
        setLoading(false);  // Deja de mostrar "Cargando..."
      }
    };

    fetchProductos();  // Llamamos a la función para obtener los productos
  }, []);  // El array vacío asegura que solo se ejecute una vez cuando el componente se monte

  const handleEliminar = async (id) => {
    try {
      // Lógica para eliminar un producto
      await axios.delete(`http://localhost:4000/api/admin/productos/${id}`, {
        withCredentials: true,  // Asegura que las cookies se envíen
      });
      // Actualizamos la lista de productos después de eliminar uno
      setProductos(productos.filter((producto) => producto.id !== id));
    } catch (err) {
      console.error('Error al eliminar el producto:', err);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;  // Mostrar mensaje mientras cargan los productos
  }

  if (error) {
    return <div>{error}</div>;  // Si hay un error, lo mostramos
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Gestión de Productos</h1>

      {/* Botón para agregar un nuevo producto */}
      <div className="mb-4">
        <Link to="/admin/productos/crear" className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition">
          Crear Nuevo Producto
        </Link>
      </div>

      <table className="min-w-full bg-white border border-gray-200">
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
            <tr key={producto.id}>
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
            </tr>
          ))}
        </tbody>
      </table>
      <RegresarButton />  {/* Botón de regresar */}
    </div>
  );
};

export default Productos;
