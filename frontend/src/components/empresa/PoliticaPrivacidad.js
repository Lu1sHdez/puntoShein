import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { dataLoadingAnimation } from "../Funciones";
import axios from "axios";
import CargandoBarra from "../../Animations/CargandoBarra";
import { API_URL } from "../../ApiConexion";
import { Link } from "react-router-dom";

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
        setError("No se pudo cargar el aviso de privacidad. Por favor, intenta más tarde.");
      } finally {
        setCargando(false);
      }
    };

    obtenerDocumento();
  }, []);

  return (
    <motion.section
      {...dataLoadingAnimation}
      className="max-w-5xl mx-auto px-6 sm:px-10 py-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-6"
    >
      {/* Botón de regreso */}
      <div className="mb-6">
        <Link
          to="/"
          className="btn-atras"
        >
          ← Volver al inicio
        </Link>
      </div>

      {/* Encabezado */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Aviso de Privacidad</h1>
        <p className="text-sm text-gray-500 mt-1">Última actualización: junio de 2025</p>
      </header>

      {/* Cargando */}
      {cargando && (
        <div className="flex justify-center py-8">
          <CargandoBarra message="Cargando aviso de privacidad..." />
        </div>
      )}

      {/* Error */}
      {error && (
        <p className="text-center text-red-600 text-base font-semibold">{error}</p>
      )}

      {/* Contenido */}
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
