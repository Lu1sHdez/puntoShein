import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useBuscarProductos from "../../hooks/useBuscarProductos"; // Hook para obtener los productos
import ProductoCard from "./ProductoCard";

const BuscarProductos = () => {
  const [searchParams] = useSearchParams();  // Obtener los parámetros de búsqueda de la URL
  const nombre = searchParams.get("nombre"); // Parámetro de búsqueda (nombre del producto)
  const { productos, loading, error, buscarProductos } = useBuscarProductos();

  // Usamos un estado para evitar consultas innecesarias
  const [ultimoNombre, setUltimoNombre] = React.useState("");

  // UseEffect para ejecutar la búsqueda solo si el nombre cambia
  useEffect(() => {
    if (nombre && nombre !== ultimoNombre) {
      setUltimoNombre(nombre);  // Guardamos el último valor de búsqueda
      buscarProductos(nombre);  // Llamamos al hook para buscar productos
    }
  }, [nombre, buscarProductos, ultimoNombre]);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Título con el nombre del producto buscado */}
      <h2 className="text-2xl font-bold mb-4">Resultados de búsqueda para "{nombre}"</h2>

      {/* Estado de carga */}
      {loading && <p>Cargando...</p>}

      {/* Mostrar el error si ocurre algún problema */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Si no hay productos encontrados y no está cargando, mostrar mensaje */}
      {!loading && productos.length === 0 && <p>No se encontraron productos.</p>}

      {/* Muestra los productos si no hay error o carga */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default BuscarProductos;
