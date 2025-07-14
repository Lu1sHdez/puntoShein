import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../../ApiConexion';

const PasoCategoria = ({ datos, setDatos, onNext, onBack }) => {
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);

  // Obtener categorías al montar
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/productos/categorias`);
        setCategorias(res.data);
      } catch (err) {
        console.error('Error al obtener categorías:', err);
      }
    };
    fetchCategorias();
  }, []);

  // Obtener subcategorías cuando cambia la categoría seleccionada
  useEffect(() => {
    const fetchSubcategorias = async () => {
      if (datos.categoria_id) {
        try {
          const res = await axios.get(`${API_URL}/api/productos/subcategorias?categoria_id=${datos.categoria_id}`);
          setSubcategorias(res.data);
        } catch (err) {
          console.error('Error al obtener subcategorías:', err);
        }
      }
    };
    fetchSubcategorias();
  }, [datos.categoria_id]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 text-center">Paso 3: Categoría y Subcategoría</h3>

      <select
        value={datos.categoria_id}
        onChange={(e) => setDatos({ ...datos, categoria_id: e.target.value, subcategoria_id: '' })}
        className="w-full border rounded p-2"
      >
        <option value="">Selecciona una categoría</option>
        {categorias.map(cat => (
          <option key={cat.id} value={cat.id}>{cat.nombre}</option>
        ))}
      </select>

      <select
        value={datos.subcategoria_id}
        onChange={(e) => setDatos({ ...datos, subcategoria_id: e.target.value })}
        className="w-full border rounded p-2"
        disabled={!datos.categoria_id}
      >
        <option value="">Selecciona una subcategoría</option>
        {subcategorias.map(sub => (
          <option key={sub.id} value={sub.id}>{sub.nombre}</option>
        ))}
      </select>

      <div className="flex justify-between">
        <button onClick={onBack} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
          Volver
        </button>
        <button
          onClick={onNext}
          disabled={!datos.subcategoria_id}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 disabled:opacity-50"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default PasoCategoria;
