import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import useBuscarProductos from "../hooks/useBuscarProductos";
import ProductoCard from "../components/productos/ProductoCard";

const BuscarProductos = () => {
  const [searchParams] = useSearchParams();
  const nombre = searchParams.get("nombre");
  const { productos, loading, error, buscarProductos } = useBuscarProductos();

  useEffect(() => {
    if (nombre) {
      buscarProductos(nombre);
    }
  }, [nombre]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Resultados de búsqueda para "{nombre}"</h2>

      {loading && <p>Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && productos.length === 0 && <p>No se encontraron productos.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default BuscarProductos;
