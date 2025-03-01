import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RegresarButton from '../../components/Regresar.js';
import Swal from 'sweetalert2';
import { userLoadingContainer, dataLoadingAnimation } from '../Funciones.js';
import { motion } from 'framer-motion';
import { LuRefreshCw } from "react-icons/lu";
import '../../css/Texto.css'
import BuscarProducto from './BuscarProductos';  // Importar el componente de búsqueda

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedSubcategoria, setSelectedSubcategoria] = useState('');
  const [searchTerm, setSearchTerm] = useState('');  // Guardar el término de búsqueda aquí

  // Obtener todas las categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/productos/categorias', {
          withCredentials: true,
        });
        setCategorias(response.data);
      } catch (err) {
        console.error('Error al obtener categorías:', err);
      }
    };
    fetchCategorias();
  }, []);

  // Obtener subcategorías según la categoría seleccionada
  useEffect(() => {
    const fetchSubcategorias = async () => {
      if (selectedCategoria) {
        try {
          const response = await axios.get(`http://localhost:4000/api/productos/subcategorias?categoria_id=${selectedCategoria}`, {
            withCredentials: true,
          });
          setSubcategorias(response.data);
        } catch (err) {
          console.error('Error al obtener subcategorías:', err);
        }
      }
    };
    fetchSubcategorias();
  }, [selectedCategoria]);


  // Llamar a fetchProductos cuando cambian los filtros o la búsqueda
  useEffect(() => {
        // Función para obtener los productos filtrados
    const fetchProductos = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/admin/filtrar?categoria_id=${selectedCategoria}&subcategoria_id=${selectedSubcategoria}&nombre=${searchTerm}`, {
          withCredentials: true,
        });
        setProductos(response.data);  // Establece los productos filtrados
      } catch (err) {
        setError('No se pudo obtener los productos');
        console.error('Error al obtener los productos:', err);
      } finally {
        setLoading(false);  // Desactiva el estado de carga una vez que la respuesta esté lista
      }
    };
    setLoading(true);  // Activa el loading antes de obtener los productos
    fetchProductos();  // Llama a la función que obtiene los productos
  }, [selectedCategoria, selectedSubcategoria, searchTerm]);

  // Función para eliminar un producto
  const handleEliminar = async (id) => {
    try {
      const confirmacion = await Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: 'Este producto será eliminado permanentemente.',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: 'Cancelar',
      });

      if (confirmacion.isConfirmed) {
        await axios.delete(`http://localhost:4000/api/admin/productos/${id}`, {
          withCredentials: true,
        });
        setProductos(productos.filter((producto) => producto.id !== id));  // Elimina el producto de la lista
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'Producto eliminado exitosamente.',
        });
      }
    } catch (err) {
      console.error('Error al eliminar el producto:', err);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al eliminar el producto.',
      });
    }
  };

  // Función para cargar todos los productos
  const handleCargarTodos = async () => {
    setSelectedCategoria('');  // Restablece la categoría seleccionada
    setSelectedSubcategoria('');  // Restablece la subcategoría seleccionada
    setLoading(true); 
    try {
      const response = await axios.get('http://localhost:4000/api/admin/productos', { withCredentials: true });
      setProductos(response.data);  // Establece los productos
    } catch (err) {
      setError('No se pudo obtener los productos');
      console.error('Error al obtener los productos:', err);
    } finally {
      setLoading(false);  // Desactiva el loading
    }
  };

  // Cargando productos o error
  if (loading) {
    return <motion.div {...dataLoadingAnimation} className="text-center">Cargando...</motion.div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4 bg-red-100 border border-red-400 rounded">{error}</div>;
  }

  return (
    <motion.div {...userLoadingContainer} className="p-6">
      <h1 className="text-3xl mb-6">Todos los productos</h1>

      <div className="mb-4 flex items-center justify-between">
        <Link to="/admin/productos/crear" className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md transition">
          Crear Nuevo Producto
        </Link>

        {/* Botón para cargar todos los productos */}
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded-md transition hover:bg-blue-700"
          onClick={handleCargarTodos}
        >
          <LuRefreshCw size={24} />
        </button>

        {/* Filtro de categorías */}
        <select
          className="p-2 border border-gray-300 rounded-md"
          value={selectedCategoria}
          onChange={(e) => setSelectedCategoria(e.target.value)}
        >
          <option value="">Seleccionar categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>

        {/* Filtro de subcategorías */}
        {selectedCategoria && (
          <select
            className="p-2 border border-gray-300 rounded-md"
            value={selectedSubcategoria}
            onChange={(e) => setSelectedSubcategoria(e.target.value)}
          >
            <option value="">Seleccionar subcategoría</option>
            {subcategorias.map((subcategoria) => (
              <option key={subcategoria.id} value={subcategoria.id}>
                {subcategoria.nombre}
              </option>
            ))}
          </select>
        )}

        {/* Componente de búsqueda */}
        <BuscarProducto setProductos={setProductos} setError={setError} setLoading={setLoading} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>

      <div className="overflow-y-auto max-h-96 shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b font-bold">ID</th>
              <th className="py-2 px-4 border-b font-bold">Nombre</th>
              <th className="py-2 px-4 border-b font-bold">Descripción</th>
              <th className="py-2 px-4 border-b font-bold">Precio</th>
              <th className="py-2 px-4 border-b font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <motion.tr key={producto.id} {...dataLoadingAnimation}>
                <td className="py-2 px-4 border-b">{producto.id}</td>
                <td className="py-2 px-4 border-b">{producto.nombre}</td>
                <td className="py-2 px-4 truncate">{producto.descripcion}</td>
                <td className="py-2 px-4 border-b">{producto.precio}</td>
                <td className="py-2 px-4 border-b">
                  <Link
                    to={`/admin/productos/editar/${producto.id}`}
                    className="text-blue-500 hover:text-blue-700 focus:outline-none transition duration-200"
                  >
                    Editar
                  </Link>
                  <button
                    className="text-white bg-red-500 hover:bg-red-700 focus:outline-none ml-4 px-4 py-2 rounded transition duration-200"
                    onClick={() => handleEliminar(producto.id)}
                  >
                    Eliminar
                  </button>
                  <Link
                    to={`/admin/productos/detalle/${producto.id}`}
                    className="text-green-500 hover:text-green-700 focus:outline-none ml-4 transition duration-200"
                  >
                    Ver más
                  </Link>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <RegresarButton />
    </motion.div>
  );
};

export default Productos;
