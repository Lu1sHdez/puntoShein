import React, { useState } from 'react';
import ModalGestionCategorias from './ModalGestionCategorias';

const PasoCategoriaSubcategoria = ({ 
  producto, 
  setProducto, 
  categorias, 
  subcategorias, 
  onCategoriaChange, 
  onSiguiente, 
  onAnterior,
  refreshData 
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Selecciona la Categoría y Subcategoría</h3>

      <div className="flex justify-end mb-4">
        <button 
          onClick={() => setModalVisible(true)}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
        >
          + Nueva Categoría/Subcategoría
        </button>
      </div>

      {/* Select para categoría */}
      <div className="mb-4">
        <label htmlFor="categoria_id" className="block text-sm font-medium text-gray-700">Categoría</label>
        <select
          id="categoria_id"
          name="categoria_id"
          value={producto.categoria_id}
          onChange={onCategoriaChange}
          className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
        >
          <option value="">Seleccione una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Select para subcategoría */}
      {producto.categoria_id && (
        <div className="mb-4">
          <div className="flex justify-between items-center">
            <label htmlFor="subcategoria_id" className="block text-sm font-medium text-gray-700">Subcategoría</label>
          </div>
          <select
            id="subcategoria_id"
            name="subcategoria_id"
            value={producto.subcategoria_id}
            onChange={(e) => setProducto({ ...producto, subcategoria_id: e.target.value })}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">Seleccione una subcategoría</option>
            {subcategorias.map((subcategoria) => (
              <option key={subcategoria.id} value={subcategoria.id}>
                {subcategoria.nombre}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Botones de navegación */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onAnterior}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Anterior
        </button>
        <button
          onClick={onSiguiente}
          disabled={!producto.categoria_id || !producto.subcategoria_id}
          className={`px-4 py-2 text-white rounded ${(!producto.categoria_id || !producto.subcategoria_id) ? 'bg-gray-300 cursor-not-allowed' : 'bg-pink-500 hover:bg-pink-600'}`}
        >
          Siguiente
        </button>
      </div>

      <ModalGestionCategorias
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        categorias={categorias}
        refreshCategorias={refreshData}
      />
    </div>
  );
};

export default PasoCategoriaSubcategoria;