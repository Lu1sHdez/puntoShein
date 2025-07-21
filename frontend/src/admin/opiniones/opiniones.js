import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../ApiConexion";
import TablaOpiniones from "./components/TablaOpiniones";

const OpinionesAdmin = () => {
  const [opiniones, setOpiniones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const obtenerOpiniones = async () => {
    try {
      setCargando(true);
      const res = await axios.get(`${API_URL}/api/opinion/todas`, {
        withCredentials: true,
      });
      setOpiniones(res.data);
    } catch (error) {
      console.error(error);
      setError("Error al cargar opiniones.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerOpiniones();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Gestión de Opiniones
      </h2>

      {cargando ? (
        <p className="text-center text-gray-600">Cargando opiniones...</p>
      ) : error ? (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      ) : opiniones.length === 0 ? (
        <p className="text-center text-gray-500">No hay opiniones registradas.</p>
      ) : (
        <TablaOpiniones opiniones={opiniones} actualizarListado={obtenerOpiniones} />
      )}
    </div>
  );
};

export default OpinionesAdmin;
