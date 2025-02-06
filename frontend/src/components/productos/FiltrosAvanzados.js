// src/components/productos/FiltrosAvanzados.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FiltrosAvanzados = ({ onApplyFilters }) => {
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [categoriaId, setCategoriaId] = useState("");
  const [subcategoriaId, setSubcategoriaId] = useState("");
  const navigate = useNavigate();

  // Cargar categorías desde la base de datos
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/productos/categorias");
        setCategorias(response.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };

    fetchCategorias();
  }, []);

  // Cargar subcategorías según la categoría seleccionada
  useEffect(() => {
    if (categoriaId) {
      const fetchSubcategorias = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/productos/subcategorias?categoria_id=${categoriaId}`);
          setSubcategorias(response.data);
        } catch (error) {
          console.error("Error al obtener subcategorías:", error);
        }
      };

      fetchSubcategorias();
    }
  }, [categoriaId]);

  const handleApplyFilters = () => {
    const filtros = {
      categoria_id: categoriaId,
      subcategoria_id: subcategoriaId,
    };

    // Redirigir a la página de productos filtrados
    const queryString = new URLSearchParams(filtros).toString();
    navigate(`/productos/filtrados?${queryString}`);
  };

  return (
    <div className="p-4 bg-gray-100 rounded-md shadow-md text-black">
      <h3 className="text-lg font-bold mb-2">Filtros Avanzados</h3>

      <div className="mb-2">
        <label className="block text-sm">Categoría:</label>
        <select
          value={categoriaId}
          onChange={(e) => setCategoriaId(e.target.value)}
          className="w-full px-2 py-1 border rounded-md text-black"
        >
          <option value="">Selecciona una categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>

      {categoriaId && (
        <div className="mb-2">
          <label className="block text-sm">Subcategoría:</label>
          <select
            value={subcategoriaId}
            onChange={(e) => setSubcategoriaId(e.target.value)}
            className="w-full px-2 py-1 border rounded-md text-black"
          >
            <option value="">Selecciona una subcategoría</option>
            {subcategorias.map((subcategoria) => (
              <option key={subcategoria.id} value={subcategoria.id}>
                {subcategoria.nombre}
              </option>
            ))}
          </select>
        </div>
      )}

      <button
        onClick={handleApplyFilters}
        className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition"
      >
        Aplicar Filtros
      </button>
    </div>
  );
};

export default FiltrosAvanzados;
