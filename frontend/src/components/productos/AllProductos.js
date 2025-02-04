import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductoCard from "./ProductoCard";

const AllProductos = () => {
  const [productos, setProductos] = useState([]); // Lista de productos obtenidos del backend
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);
  const [visibleProductos, setVisibleProductos] = useState(8); // Mostrar inicialmente 12 productos

  useEffect(() => {
    const fetchProductos = async () => {
      setCargando(true);
      try {
        const response = await axios.get("http://localhost:4000/api/productos/allProductos");
        setProductos(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
        setError("Error al cargar los productos.");
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, []);

  // Función para cargar más productos al hacer clic en "Ver más"
  const handleVerMas = () => {
    setVisibleProductos((prevVisible) => prevVisible + 4);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Todos los productos</h2>
      {cargando && <p>Cargando productos...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!cargando && productos.length === 0 && <p>No hay productos disponibles.</p>}

      {/* Contenedor de los productos con grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {productos.slice(0, visibleProductos).map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>

      {/* Botón "Ver más" - Solo se muestra si hay más productos */}
      {visibleProductos < productos.length && (
        <div className="flex justify-center mt-6">
          <button
            onClick={handleVerMas}
            className="bg-pink-600 text-white py-2 px-6 rounded-lg hover:bg-pink-700 transition"
          >
            Ver más
          </button>
        </div>
      )}
    </div>
  );
};

export default AllProductos;
