import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate, useParams } from 'react-router-dom';
import RegresarButton from '../../../components/Regresar';

const EditarProducto = () => {
  const { id } = useParams(); // Obtenemos el ID del producto de la URL
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [imagen, setImagen] = useState('');
  const [stock, setStock] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState('');
  const [subcategoriaId, setSubcategoriaId] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Obtener el producto actual para editarlo
  useEffect(() => {
    const fetchProducto = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/admin/productos/${id}`, {
          withCredentials: true,
        });
        const producto = response.data;
        setNombre(producto.nombre);
        setDescripcion(producto.descripcion);
        setPrecio(producto.precio);
        setImagen(producto.imagen);
        setStock(producto.stock);
        setCategoriaId(producto.subcategoria.categoria_id); // Establecer la categoría actual
        setSubcategoriaId(producto.subcategoria_id); // Establecer la subcategoría actual
      } catch (err) {
        setError('Error al obtener el producto');
        console.error("Error al obtener el producto:", err);
      }
    };

    fetchProducto();
  }, [id]);

  // Obtener todas las categorías
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/admin/categorias', {
          withCredentials: true,
        });
        setCategorias(response.data);
      } catch (err) {
        setError('Error al obtener las categorías');
        console.error("Error al obtener las categorías:", err);
      }
    };

    fetchCategorias();
  }, []);

  // Obtener subcategorías basadas en la categoría seleccionada
  useEffect(() => {
    const fetchSubcategorias = async () => {
      if (categoriaId) {
        try {
          const response = await axios.get(`http://localhost:4000/api/admin/subcategorias?categoria_id=${categoriaId}`, {
            withCredentials: true,
          });
          setSubcategorias(response.data);
        } catch (err) {
          setError('Error al obtener las subcategorías');
          console.error("Error al obtener las subcategorías:", err);
        }
      }
    };

    fetchSubcategorias();
  }, [categoriaId]);

  // Manejar el envío del formulario
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
        subcategoria_id: subcategoriaId,
      };

      // Hacemos una solicitud PUT para actualizar el producto
      await axios.put(`http://localhost:4000/api/admin/productos/${id}`, producto, {
        withCredentials: true,
      });

      Swal.fire({
        title: '¡Éxito!',
        text: 'Producto actualizado exitosamente',
        icon: 'success',
        confirmButtonText: 'Aceptar',
      });

      navigate('/admin/productos');
    } catch (err) {
      setError('Error al actualizar el producto');
      console.error('Error al actualizar el producto:', err);
    }
  };

  const cancelar =()=> {
    navigate('/admin/productos');
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg -mt-5">
      <h1 className="text-3xl font-bold text-center mb-6">Editar Producto</h1>

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
            onChange={(e) => setCategoriaId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
          >
            <option value="">Seleccionar categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
            ))}
          </select>
        </div>

        {/* Seleccionar Subcategoría */}
        <div>
          <label htmlFor="subcategoria_id" className="block text-lg font-semibold text-gray-700">Seleccionar Subcategoría</label>
          <select
            id="subcategoria_id"
            value={subcategoriaId}
            onChange={(e) => setSubcategoriaId(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md mt-2"
          >
            <option value="">Seleccionar subcategoría</option>
            {subcategorias.map((subcategoria) => (
              <option key={subcategoria.id} value={subcategoria.id}>{subcategoria.nombre}</option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-pink-600 hover:bg-pink-700 text-white rounded-md"
            >
              Actualizar Producto
            </button>
            <button
              type="button"
              onClick={cancelar}
              className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
        </div>
        
      </form>

      <RegresarButton />
    </div>
  );
};

export default EditarProducto;