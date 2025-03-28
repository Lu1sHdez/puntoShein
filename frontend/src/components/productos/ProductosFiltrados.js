// src/components/productos/ProductosFiltrados.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ProductoCard from "./ProductoCard";
import { API_URL } from "../../ApiConexion";

const ProductosFiltrados = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  const location = useLocation();

  useEffect(() => {
    const fetchProductos = async () => {
      const params = new URLSearchParams(window.location.search);
      const categoriaId = params.get("categoria_id");
      const subcategoriaId = params.get("subcategoria_id");

      setCargando(true);

      try {
        const response = await axios.get(`${API_URL}/api/productos/filtrar`, {
          params: {
            categoria_id: categoriaId,
            subcategoria_id: subcategoriaId,
          },
        });
        setProductos(response.data);

      } catch (error) {
        console.error("Error al obtener productos filtrados:", error);
        setError("Error al cargar los productos.");
      } finally {
        setCargando(false);
      }
    };

    fetchProductos();
  }, [location.search]);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4">Productos Filtrados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {productos.map((producto) => (
          <ProductoCard key={producto.id} producto={producto} />
        ))}
      </div>
    </div>
  );
};

export default ProductosFiltrados;
