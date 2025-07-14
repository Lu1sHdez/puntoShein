import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../../ApiConexion';
import { mostrarNotificacion } from '../../../../../Animations/NotificacionSwal';

const PasoCategoria = ({ datos, setDatos, onBack }) => {
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [filteredSubcategorias, setFilteredSubcategorias] = useState([]);
  const [nuevaCategoria, setNuevaCategoria] = useState('');
  const [nuevaSubcategoria, setNuevaSubcategoria] = useState('');
  const [showCrearCategoria, setShowCrearCategoria] = useState(false);
  const [showCrearSubcategoria, setShowCrearSubcategoria] = useState(false);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/categorias`, {
          withCredentials: true
        });
        setCategorias(res.data);
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    const fetchSubcategorias = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/subcategorias`, {
          withCredentials: true
        });
        setSubcategorias(res.data);
      } catch (error) {
        console.error('Error al obtener subcategorías:', error);
      }
    };

    fetchCategorias();
    fetchSubcategorias();
  }, []);

  useEffect(() => {
    if (datos.categoria_id) {
      const filtered = subcategorias.filter(
        sub => sub.categoria_id === parseInt(datos.categoria_id)
      );
      setFilteredSubcategorias(filtered);
    } else {
      setFilteredSubcategorias([]);
    }
  }, [datos.categoria_id, subcategorias]);

  const handleCategoriaChange = (e) => {
    const categoriaId = e.target.value;
    setDatos({ ...datos, categoria_id: categoriaId, subcategoria_id: '' });
  };

  const handleSubcategoriaChange = (e) => {
    setDatos({ ...datos, subcategoria_id: e.target.value });
  };

  const handleCrearCategoria = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/admin/categorias`,
        { nombre: nuevaCategoria },
        { withCredentials: true }
      );
      setCategorias([...categorias, res.data]);
      setDatos({ ...datos, categoria_id: res.data.id, subcategoria_id: '' });
      setNuevaCategoria('');
      setShowCrearCategoria(false);
      mostrarNotificacion("success", "Categoría creada correctamente.");
    } catch (error) {
      console.error('Error al crear categoría:', error);
    }
  };

  const handleCrearSubcategoria = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/admin/subcategorias`,
        { nombre: nuevaSubcategoria, categoria_id: datos.categoria_id },
        { withCredentials: true }
      );
      setSubcategorias([...subcategorias, res.data]);
      setDatos({ ...datos, subcategoria_id: res.data.id });
      setNuevaSubcategoria('');
      setShowCrearSubcategoria(false);
      mostrarNotificacion("success", "Subcategoría creada correctamente.");
    } catch (error) {
      console.error('Error al crear subcategoría:', error);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 text-center">
        Paso 3: Categoría y Subcategoría
      </h3>

      {/* Selección de categoría */}
      <select
        value={datos.categoria_id}
        onChange={handleCategoriaChange}
        className="w-full border rounded p-2"
      >
        <option value="">Selecciona una categoría</option>
        {categorias.map(cat => (
          <option key={cat.id} value={cat.id}>
            {cat.nombre}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={() => setShowCrearCategoria(!showCrearCategoria)}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {showCrearCategoria ? 'Cancelar' : 'Crear Nueva Categoría'}
      </button>

      {showCrearCategoria && (
        <div>
          <input
            type="text"
            value={nuevaCategoria}
            onChange={(e) => setNuevaCategoria(e.target.value)}
            className="w-full border rounded p-2 mt-2"
            placeholder="Nombre de la nueva categoría"
          />
          <button
            type="button"
            onClick={handleCrearCategoria}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Crear Categoría
          </button>
        </div>
      )}

      {/* Selección de subcategoría */}
      <select
        value={datos.subcategoria_id}
        onChange={handleSubcategoriaChange}
        className="w-full border rounded p-2"
        disabled={!datos.categoria_id}
      >
        <option value="">Selecciona una subcategoría</option>
        {filteredSubcategorias.map(sub => (
          <option key={sub.id} value={sub.id}>
            {sub.nombre}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={() => setShowCrearSubcategoria(!showCrearSubcategoria)}
        className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
        disabled={!datos.categoria_id}
      >
        {showCrearSubcategoria ? 'Cancelar' : 'Crear Nueva Subcategoría'}
      </button>

      {showCrearSubcategoria && datos.categoria_id && (
        <div>
          <input
            type="text"
            value={nuevaSubcategoria}
            onChange={(e) => setNuevaSubcategoria(e.target.value)}
            className="w-full border rounded p-2 mt-2"
            placeholder="Nombre de la nueva subcategoría"
          />
          <button
            type="button"
            onClick={handleCrearSubcategoria}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Crear Subcategoría
          </button>
        </div>
      )}

      {/* Botón Volver */}
      <div className="flex justify-start mt-4">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Volver
        </button>
      </div>
    </div>
  );
};

export default PasoCategoria;
