import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import RegresarButton from '../../components/Regresar.js';
import Swal from 'sweetalert2';
import { dataLoadingAnimation } from '../Funciones.js';
import { motion } from 'framer-motion';
import { LuRefreshCw } from "react-icons/lu";
import '../../css/Texto.css';
import BuscarProducto from './BuscarProductos';  // Importar el componente de búsqueda
import ProductoCard from './ProductoCard';  // Importar el componente ProductoCard

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState('');
  const [selectedSubcategoria, setSelectedSubcategoria] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); 
  const [visibleProductos, setVisibleProductos] = useState(8);  // Estado para controlar cuántos productos se muestran

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

  // Función para mostrar más productos
  const handleVerMas = () => {
    setVisibleProductos((prevVisible) => prevVisible + 4);  // Aumenta la cantidad de productos visibles
  };

  // Cargando productos o error
  if (loading) {
    return <motion.div {...dataLoadingAnimation} className="text-center">Cargando...</motion.div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4 bg-red-100 border border-red-400 rounded">{error}</div>;
  }

  return (
    <motion.div {...dataLoadingAnimation} className="p-6">
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

      {/* Mostrar productos como tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {productos.slice(0, visibleProductos).map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            onEliminar={handleEliminar}
          />
        ))}
      </div>

      {/* Botón "Ver más" - Solo se muestra si hay más productos */}
      {visibleProductos < productos.length && (
          <div className="flex justify-center mt-6">
            <motion.button
              onClick={handleVerMas}
              className="bg-pink-600 text-white py-2 px-6 rounded-lg hover:bg-pink-700 transition-all"
              whileHover={{ scale: 1.05 }} // Efecto de hover en el botón
              transition={{ type: "spring", stiffness: 300 }}
            >
              Ver más
            </motion.button>
            <RegresarButton />
          </div>
        )}

      <RegresarButton />
    </motion.div>
  );
};

export default Productos;
