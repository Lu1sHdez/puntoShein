import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";
import { Link } from "react-router-dom";

const SeccionRecomendaciones = ({ productoId }) => {
  const [recomendaciones, setRecomendaciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!productoId) return;

    const fetchRecomendaciones = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/recomendacion/id/${productoId}`);
        const originales = res.data.recomendaciones || [];

        const vistos = new Set();
        const unicos = originales.filter((rec) => {
          const id = rec.productoConsecuente?.id;
          if (id && !vistos.has(id)) {
            vistos.add(id);
            return true;
          }
          return false;
        });

        setRecomendaciones(unicos);
      } catch (error) {
        console.error("Error al cargar recomendaciones", error);
      } finally {
        setCargando(false);
      }
    };

    fetchRecomendaciones();
  }, [productoId]);

  if (cargando) {
    return <p className="text-center py-6">Cargando recomendaciones...</p>;
  }

  if (!recomendaciones.length) {
    return <p className="text-center py-6">No hay recomendaciones disponibles.</p>;
  }

  return (
    <section className="bg-white py-8 px-6 rounded shadow max-w-7xl mx-auto my-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Productos recomendados para ti</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {recomendaciones.map((rec) => (
          <Link
            to={`/producto/${rec.productoConsecuente.id}`}
            key={rec.productoConsecuente.id}
            className="border rounded p-4 hover:shadow-lg transition cursor-pointer block"
          >
            <img
              src={rec.productoConsecuente.imagen}
              alt={rec.productoConsecuente.nombre}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h3 className="font-medium">{rec.productoConsecuente.nombre}</h3>
            <p className="text-gray-600">Precio: ${parseFloat(rec.productoConsecuente.precio).toFixed(2)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SeccionRecomendaciones;
