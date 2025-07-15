import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../ApiConexion';
const ModalGestionCategorias = ({ visible, onClose, categorias, refreshCategorias }) => {
  const [tipo, setTipo] = useState('categoria'); // 'categoria' o 'subcategoria'
  const [nombre, setNombre] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });

  if (!visible) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!nombre) {
      setMensaje({ texto: 'El nombre es requerido', tipo: 'error' });
      return;
    }

    if (tipo === 'subcategoria' && !categoriaSeleccionada) {
      setMensaje({ texto: 'Debe seleccionar una categoría', tipo: 'error' });
      return;
    }

    try {
      const endpoint = tipo === 'categoria' ? 'categorias' : 'subcategorias';
      const payload = tipo === 'categoria' 
        ? { nombre } 
        : { nombre, categoria_id: categoriaSeleccionada };

      await axios.post(
        `${API_URL}/api/productos/${endpoint}`,
        payload,
        { withCredentials: true }
      );

      setMensaje({ texto: `${tipo === 'categoria' ? 'Categoría' : 'Subcategoría'} creada con éxito`, tipo: 'success' });
      setNombre('');
      refreshCategorias();
    } catch (error) {
      const errorMsg = error.response?.data?.mensaje || 'Error al crear';
      setMensaje({ texto: errorMsg, tipo: 'error' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-[95%] max-w-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {tipo === 'categoria' ? 'Nueva Categoría' : 'Nueva Subcategoría'}
        </h2>

        <div className="flex mb-4">
          <button
            onClick={() => setTipo('categoria')}
            className={`px-4 py-2 mr-2 ${tipo === 'categoria' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Categoría
          </button>
          <button
            onClick={() => setTipo('subcategoria')}
            className={`px-4 py-2 ${tipo === 'subcategoria' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            Subcategoría
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          {tipo === 'subcategoria' && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Categoría Padre</label>
              <select
                value={categoriaSeleccionada}
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de {tipo === 'categoria' ? 'la Categoría' : 'la Subcategoría'}
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder={`Ej: ${tipo === 'categoria' ? 'Ropa' : 'Camisetas'}`}
              required
            />
          </div>

          {mensaje.texto && (
            <div className={`mb-4 p-2 rounded ${mensaje.tipo === 'error' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
              {mensaje.texto}
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalGestionCategorias;