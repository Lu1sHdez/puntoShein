// src/components/CategoriaSelector.js
import React from 'react';
import { dataLoadingAnimation } from '../../Funciones.js';
import { motion } from 'framer-motion';


const CategoriaSelector = ({ categorias, categoriaId, setCategoriaId, nuevaCategoria, setNuevaCategoria, handleCrearCategoria, showCrearCategoria, setShowCrearCategoria }) => (
  <motion.div {...dataLoadingAnimation} >
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

    <button
      type="button"
      onClick={() => setShowCrearCategoria(!showCrearCategoria)}
      className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
          className="mt-2 px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md"
        >
          Crear Categoría
        </button>
      </div>
    )}
  </motion.div>
);

export default CategoriaSelector;
