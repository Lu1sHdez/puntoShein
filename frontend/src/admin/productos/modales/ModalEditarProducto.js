import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../ApiConexion.js';

const ModalEditarProducto = ({ visible, producto, onClose, onSave }) => {
  const [nombre, setNombre] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [precio, setPrecio] = useState('');
  const [color, setColor] = useState('');
  const [stock, setStock] = useState('');
  const [imagen, setImagen] = useState('');
  const [subcategoria, setSubcategoria] = useState('');
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [tallas, setTallas] = useState([{ talla_id: '', stock: 0 }]);

  useEffect(() => {
    if (producto) {
      setNombre(producto.nombre);
      setDescripcion(producto.descripcion);
      setPrecio(producto.precio);
      setColor(producto.color);
      setStock(producto.stock);
      setImagen(producto.imagen);
      setSubcategoria(producto.subcategoria_id);
      setTallas(producto.tallas.map(talla => ({ talla_id: talla.id, stock: talla.stock })));
    }
  }, [producto]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/productos/categorias`);
        setCategorias(response.data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    const fetchSubcategorias = async () => {
      if (subcategoria) {
        try {
          const response = await axios.get(`${API_URL}/api/productos/subcategorias?categoria_id=${subcategoria}`);
          setSubcategorias(response.data);
        } catch (error) {
          console.error('Error al obtener subcategorías:', error);
        }
      }
    };
    fetchSubcategorias();
  }, [subcategoria]);

  const handleTallaChange = (index, field, value) => {
    const updatedTallas = [...tallas];
    updatedTallas[index][field] = value;
    setTallas(updatedTallas);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_URL}/api/productos/editar/${producto.id}`, {
        nombre,
        descripcion,
        precio,
        color,
        imagen,
        stock,
        subcategoria_id: subcategoria,
        tallas
      });

      onSave();
      onClose();
    } catch (error) {
      console.error('Error al editar el producto:', error);
    }
  };

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${visible ? 'block' : 'hidden'}`}>
      <div className="bg-white p-8 rounded-lg shadow-xl w-4/5 md:w-1/2 lg:w-1/3 max-w-4xl">
        <h2 className="text-3xl font-semibold text-pink-600 mb-4">Editar Producto</h2>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Nombre */}
            <div className="mb-4">
              <label className="block mb-2">Nombre</label>
              <input
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="p-2 w-full border rounded"
                required
              />
            </div>

            {/* Descripción */}
            <div className="mb-4">
              <label className="block mb-2">Descripción</label>
              <input
                type="text"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="p-2 w-full border rounded"
                required
              />
            </div>

            {/* Precio */}
            <div className="mb-4">
              <label className="block mb-2">Precio</label>
              <input
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
                className="p-2 w-full border rounded"
                required
              />
            </div>

            {/* Color */}
            <div className="mb-4">
              <label className="block mb-2">Color</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="p-2 w-full border rounded"
                required
              />
            </div>

            {/* Stock */}
            <div className="mb-4">
              <label className="block mb-2">Stock</label>
              <input
                type="number"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="p-2 w-full border rounded"
                required
              />
            </div>

            {/* Imagen URL */}
            <div className="mb-4">
              <label className="block mb-2">Imagen URL</label>
              <input
                type="text"
                value={imagen}
                onChange={(e) => setImagen(e.target.value)}
                className="p-2 w-full border rounded"
              />
            </div>

            {/* Subcategoría */}
            <div className="mb-4">
              <label className="block mb-2">Subcategoría</label>
              <select
                value={subcategoria}
                onChange={(e) => setSubcategoria(e.target.value)}
                className="p-2 w-full border rounded"
                required
              >
                <option value="">Seleccionar Subcategoría</option>
                {subcategorias.map((subcat) => (
                  <option key={subcat.id} value={subcat.id}>
                    {subcat.nombre}
                  </option>
                ))}
              </select>
            </div>

            {/* Tallas y Stock */}
            <div className="mb-4 col-span-2">
              <label className="block mb-2">Tallas y Stock</label>
              {tallas.map((talla, index) => (
                <div key={index} className="flex items-center space-x-4 mb-2">
                  <select
                    value={talla.talla_id}
                    onChange={(e) => handleTallaChange(index, 'talla_id', e.target.value)}
                    className="p-2 border rounded"
                  >
                    {/* Aquí puedes mapear las tallas disponibles */}
                  </select>
                  <input
                    type="number"
                    value={talla.stock}
                    onChange={(e) => handleTallaChange(index, 'stock', e.target.value)}
                    className="p-2 w-20 border rounded"
                    placeholder="Stock"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Botón de Guardar Cambios */}
          <div className="flex justify-end mt-4">
            <button type="submit" className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:outline-none transition-all duration-200">
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditarProducto;
