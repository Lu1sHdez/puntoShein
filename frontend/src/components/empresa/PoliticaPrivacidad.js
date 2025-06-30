import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { dataLoadingAnimation } from "../Funciones";
import axios from "axios";
import { API_URL } from "../../ApiConexion";

const PoliticaPrivacidad = () => {
  const [contenido, setContenido] = useState("");
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerDocumento = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/documento/documentos/Aviso%20de%20Privacidad`);
        setContenido(res.data.contenido);
      } catch (err) {
        setError("No se pudo cargar el aviso de privacidad.");
      } finally {
        setCargando(false);
      }
    };

    obtenerDocumento();
  }, []);

  return (
    <motion.section
      {...dataLoadingAnimation}
      className="px-6 sm:px-10 py-10 max-w-5xl mx-auto bg-white border border-gray-300 rounded-md shadow-md"
    >
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-serif font-semibold text-gray-800 tracking-wide">
          Aviso de Privacidad
        </h1>
        <p className="text-sm text-gray-500 mt-2">
          Última actualización: junio de 2025
        </p>
      </header>

      {cargando && (
        <p className="text-center text-gray-500 text-sm">Cargando contenido...</p>
      )}

      {error && (
        <p className="text-center text-red-600 text-base font-medium">{error}</p>
      )}

      {!cargando && !error && (
        <article
          className="prose prose-gray max-w-none text-justify leading-relaxed text-base text-gray-700"
          dangerouslySetInnerHTML={{ __html: contenido }}
        />
      )}
    </motion.section>
  );
};

export default PoliticaPrivacidad;
