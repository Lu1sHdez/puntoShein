import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import RegresarButton from '../../../components/Regresar';
import { useNavigate } from 'react-router-dom';
import { formAnimation } from '../../Funciones.js';
import { motion } from 'framer-motion';

const CrearProducto = () => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [stock, setStock] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState('');
  const [subcategoriaId, setSubcategoriaId] = useState('');
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [nuevaSubcategoria, setNuevaSubcategoria] = useState('');
  const [error, setError] = useState(null);
  const [showCrearCategoria, setShowCrearCategoria] = useState(false); // Control de visibilidad para crear nueva categoría
  const [showCrearSubcategoria, setShowCrearSubcategoria] = useState(false); // Control de visibilidad para crear nueva subcategoría
  const navigate = useNavigate();

  // Obtener las categorías y subcategorías desde la API
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/categorias', { withCredentials: true });
        setCategorias(response.data);
      } catch (err) {
        setError('Error al obtener las categorías');
        console.error("Error al obtener las categorías:", err);
      }
    };

    const fetchSubcategorias = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/subcategorias', { withCredentials: true });
        setSubcategorias(response.data);
      } catch (err) {
        setError('Error al obtener las subcategorías');
        console.error("Error al obtener las subcategorías:", err);
      }
    };

    fetchCategorias();
    fetchSubcategorias();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const producto = {
        nombre,
        descripcion,
        precio,
        imagen,
        stock,
        subcategoria_id: subcategoriaId || nuevaSubcategoria,
      };

      console.log('Producto a enviar:', producto);

      await axios.post('http://localhost:4000/api/admin/productos', producto, { withCredentials: true });

      Swal.fire({
        title: '¡Éxito!',
        text: 'Producto creado exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      navigate('/admin/productos');
    } catch (err) {
      setError('Error al crear el producto');
      console.error('Error al crear el producto:', err);
    }
  };

  const handleCategoriaChange = (e) => {
    setCategoriaId(e.target.value);
    setSubcategoriaId('');
  };

  const handleCrearCategoria = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/admin/categorias', { nombre: nuevaCategoria }, { withCredentials: true });
      setCategorias([...categorias, response.data]);
      setCategoriaId(response.data.id);
      setNuevaCategoria('');
      setShowCrearCategoria(false); // Cerrar el formulario al crear una categoría
    } catch (err) {
      console.error('Error al crear la categoría:', err);
    }
  };

  const handleCrearSubcategoria = async () => {
    try {
      const response = await axios.post('http://localhost:4000/api/admin/subcategorias', { nombre: nuevaSubcategoria, categoria_id: categoriaId }, { withCredentials: true });
      setSubcategorias([...subcategorias, response.data]);
      setSubcategoriaId(response.data.id);
      setNuevaSubcategoria('');
      setShowCrearSubcategoria(false); // Cerrar el formulario al crear una subcategoría
    } catch (err) {
      console.error('Error al crear la subcategoría:', err);
    }
  };

  return (
    <motion.div {...formAnimation} className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg -mt-5">
      <h1 className="text-3xl font-bold text-center mb-6">Crear Producto</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Nombre del Producto */}
        <div>
          <label htmlFor="nombre" className="block text-lg font-semibold text-gray-700">Nombre del Producto</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="Nombre del producto"
          />
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="descripcion" className="block text-lg font-semibold text-gray-700">Descripción</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="Descripción del producto"
          />
        </div>

        {/* Precio */}
        <div>
          <label htmlFor="precio" className="block text-lg font-semibold text-gray-700">Precio</label>
          <input
            type="number"
            id="precio"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="Precio del producto"
          />
        </div>

        {/* Stock */}
        <div>
          <label htmlFor="stock" className="block text-lg font-semibold text-gray-700">Stock</label>
          <input
            type="number"
            id="stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="Cantidad en stock"
          />
        </div>

        {/* Imagen */}
        <div>
          <label htmlFor="imagen" className="block text-lg font-semibold text-gray-700">Imagen URL</label>
          <input
            type="text"
            id="imagen"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
            placeholder="URL de la imagen del producto"
          />
        </div>

        {/* Seleccionar Categoría */}
        <div>
          <label htmlFor="categoria_id" className="block text-lg font-semibold text-gray-700">Seleccionar Categoría</label>
          <select
            id="categoria_id"
            value={categoriaId}
            onChange={handleCategoriaChange}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
            ))}
          </select>

          {/* Crear Nueva Categoría */}
          <div className="mt-4">
            <button
              type="button"
              onClick={() => setShowCrearCategoria(!showCrearCategoria)} // Toggle para mostrar/ocultar el formulario de nueva categoría
              className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md "
            >
              {showCrearCategoria ? 'Cancelar' : 'Crear Nueva Categoría'}
            </button>

            {showCrearCategoria && (
              <div className="mt-2">
                <input
                  type="text"
                  value={nuevaCategoria}
                  onChange={(e) => setNuevaCategoria(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-md mt-2"
                  placeholder="Nombre de la nueva categoría"
                />
                <button
                  type="button"
                  onClick={handleCrearCategoria}
                  className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Crear Categoría
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Seleccionar Subcategoría */}
        {categoriaId && (
          <div>
            <label htmlFor="subcategoria_id" className="block text-lg font-semibold text-gray-700">Seleccionar Subcategoría</label>
            <select
              id="subcategoria_id"
              value={subcategoriaId}
              onChange={(e) => setSubcategoriaId(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md mt-2"
            >
              <option value="">Seleccionar subcategoría</option>
              {subcategorias
                .filter(sub => sub.categoria_id === parseInt(categoriaId))
                .map((sub) => (
                  <option key={sub.id} value={sub.id}>{sub.nombre}</option>
                ))}
            </select>

            {/* Crear Nueva Subcategoría */}
            <div className="mt-4">
              <button
                type="button"
                onClick={() => setShowCrearSubcategoria(!showCrearSubcategoria)} // Toggle para mostrar/ocultar el formulario de nueva subcategoría
                className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                {showCrearSubcategoria ? 'Cancelar' : 'Crear Nueva Subcategoría'}
              </button>

              {showCrearSubcategoria && (
                <div className="mt-2">
                  <input
                    type="text"
                    value={nuevaSubcategoria}
                    onChange={(e) => setNuevaSubcategoria(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-md mt-2"
                    placeholder="Nombre de la nueva subcategoría"
                  />
                  <button
                    type="button"
                    onClick={handleCrearSubcategoria}
                    className="mt-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    Crear Subcategoría
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Botón para crear el producto */}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-md "
        >
          Crear Producto
        </button>
        <RegresarButton />
      </form>
    </motion.div>
  );
};

export default CrearProducto;