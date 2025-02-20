import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FiltrosAvanzados = () => {
  const [categorias, setCategorias] = useState([]); // Lista de categorías
  const [subcategorias, setSubcategorias] = useState([]); // Lista de subcategorías
  const [categoriaId, setCategoriaId] = useState(""); // ID de la categoría seleccionada
  const [subcategoriaId, setSubcategoriaId] = useState(""); // ID de la subcategoría seleccionada
  const navigate = useNavigate();

  // Cargar categorías desde la base de datos
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/productos/categorias");
        setCategorias(response.data); // Establecer las categorías obtenidas
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
          setSubcategorias(response.data); // Establecer las subcategorías obtenidas
        } catch (error) {
          console.error("Error al obtener subcategorías:", error);
        }
      };

      fetchSubcategorias();
    } else {
      setSubcategorias([]); // Limpiar subcategorías si no hay categoría seleccionada
    }
  }, [categoriaId]);

  // Manejar el cambio de la categoría seleccionada
  const handleCategoryChange = (e) => {
    const selectedCategoriaId = e.target.value;
    setCategoriaId(selectedCategoriaId); // Establecer la categoría seleccionada
    setSubcategoriaId(""); // Limpiar la subcategoría al cambiar la categoría

    // Redirigir a los productos filtrados directamente
    const filtros = {
      categoria_id: selectedCategoriaId,
      subcategoria_id: "", // No hay subcategoría seleccionada
    };
    const queryString = new URLSearchParams(filtros).toString();
    navigate(`/productos/filtrados?${queryString}`); // Redirigir con los filtros aplicados
  };

  // Manejar el cambio de la subcategoría seleccionada
  const handleSubcategoryChange = (e) => {
    const selectedSubcategoriaId = e.target.value;
    setSubcategoriaId(selectedSubcategoriaId); // Establecer la subcategoría seleccionada

    // Redirigir a los productos filtrados directamente
    const filtros = {
      categoria_id: categoriaId,
      subcategoria_id: selectedSubcategoriaId,
    };
    const queryString = new URLSearchParams(filtros).toString();
    navigate(`/productos/filtrados?${queryString}`); // Redirigir con los filtros aplicados
  };

  return (
    <div className="p-4 w-1/2 rounded-md text-black">
      {/* Selector de Categoría */}
      <div className="mb-2">
        <select
          value={categoriaId}
          onChange={handleCategoryChange}
          className="w-full px-3 py-1 border-2 text-black"
        >
          <option value="">Categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria.id} value={categoria.id}>
              {categoria.nombre}
            </option>
          ))}
        </select>
      </div>

      {/* Selector de Subcategoría (solo visible si se selecciona una categoría) */}
      {categoriaId && (
        <div className="mb-2">
          <select
            value={subcategoriaId}
            onChange={handleSubcategoryChange}
            className="w-full px-2 py-1 text-black"
          >
            <option value="">Subcategoría</option>
            {subcategorias.map((subcategoria) => (
              <option key={subcategoria.id} value={subcategoria.id}>
                {subcategoria.nombre}
              </option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
};

export default FiltrosAvanzados;