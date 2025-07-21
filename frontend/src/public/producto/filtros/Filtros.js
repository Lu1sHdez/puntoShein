import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";

const Filtros = ({
  categoriaSeleccionada,
  setCategoriaSeleccionada,
  subcategoriaSeleccionada,
  setSubcategoriaSeleccionada,
  cerrarSidebar,
}) => {
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]); 

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/filtro/categorias`);
        setCategorias(res.data);
      } catch (error) {
        console.error("Error al obtener categorías:", error);
      }
    };
    fetchCategorias();
  }, []);

  useEffect(() => {
    if (!categoriaSeleccionada) {
      setSubcategorias([]);
      return;
    }

    const fetchSubcategorias = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/filtro/subcategorias?categoria_id=${categoriaSeleccionada}`
        );
        setSubcategorias(res.data);
      } catch (error) {
        console.error("Error al obtener subcategorías:", error);
      }
    };
    fetchSubcategorias();
  }, [categoriaSeleccionada]);

  return (
    <div className="p-6 space-y-6 h-full flex flex-col">
    <div>
        <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
        Filtros de productos
        </h2>
        <p className="text-sm font-semibold text-gray-700 mb-2">Categoría</p>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scroll">
        {categorias.map((cat) => (
            <label key={cat.id} className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                checked={categoriaSeleccionada === String(cat.id)}
                onChange={() =>
                setCategoriaSeleccionada(
                    categoriaSeleccionada === String(cat.id) ? "" : String(cat.id)
                )
                }
                className="accent-blue-600"
            />
            <span className="text-sm text-gray-600">{cat.nombre}</span>
            </label>
        ))}
        </div>
    </div>

    <div>
        <p className="text-sm font-semibold text-gray-700 mb-2">Subcategoría</p>
        <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scroll">
        {subcategorias.length === 0 ? (
        <p className="text-sm text-gray-400 italic">
            No hay subcategorías disponibles para esta categoría.
        </p>
        ) : (
        subcategorias.map((sub) => (
            <label key={sub.id} className="flex items-center gap-2 cursor-pointer">
            <input
                type="checkbox"
                checked={subcategoriaSeleccionada === String(sub.id)}
                onChange={() =>
                setSubcategoriaSeleccionada(
                    subcategoriaSeleccionada === String(sub.id) ? "" : String(sub.id)
                )
                }
                className="accent-blue-600"
            />
            <span className="text-sm text-gray-600">{sub.nombre}</span>
            </label>
        ))
        )}

        </div>
    </div>

    <div className="mt-auto pt-4 border-t">
        <button
        onClick={cerrarSidebar}
        className="btn-principal w-full py-2 text-base"
        >
        Aplicar filtros
        </button>
    </div>
    </div>

  );
};

export default Filtros;
