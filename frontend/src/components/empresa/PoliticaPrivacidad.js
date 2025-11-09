import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { dataLoadingAnimation } from "../Funciones";
import axios from "axios";
import CargandoBarra from "../../Animations/CargandoBarra";
import { API_URL } from "../../ApiConexion";

const PoliticaPrivacidad = () => {
  const [documento, setDocumento] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const obtenerDocumento = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/documento/obtener/Aviso%20de%20Privacidad`
        );

        // Verifica si el contenido está en formato JSON o string
        const contenido =
          typeof res.data.contenido === "string"
            ? JSON.parse(res.data.contenido)
            : res.data.contenido;

        setDocumento({
          titulo: res.data.titulo,
          descripcion: res.data.descripcion,
          fecha: res.data.fecha_actualizacion,
          contenido,
        });
      } catch (err) {
        console.error("Error al obtener documento:", err);
        setError(
          "No se pudo cargar el aviso de privacidad. Por favor, intenta más tarde."
        );
      } finally {
        setCargando(false);
      }
    };

    obtenerDocumento();
  }, []);

  // Función para formatear la fecha
  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="relative isolate overflow-hidden bg-white py-20 sm:py-24">
      {/* Fondo difuminado superior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%-12rem)] aspect-[1155/678] w-[40rem] 
                     -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr 
                     from-blue-400 to-blue-700 opacity-20 
                     sm:left-[calc(50%-36rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>

      {/* === Contenido principal === */}
      <motion.div
        {...dataLoadingAnimation}
        className="max-w-5xl mx-auto px-6 sm:px-10 py-10 bg-white border border-gray-200 rounded-2xl shadow-lg"
      >
        {/* Encabezado */}
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-3">
            {documento?.titulo || "Aviso de Privacidad"}
          </h1>
          <p className="text-gray-600 text-base max-w-2xl mx-auto">
            {documento?.descripcion}
          </p>
          {documento?.fecha && (
            <p className="text-sm text-gray-500 mt-3">
              Última actualización: {formatFecha(documento.fecha)}
            </p>
          )}
        </header>

        {/* Contenido dinámico */}
        {cargando ? (
          <div className="flex justify-center py-8">
            <CargandoBarra message="Cargando aviso de privacidad..." />
          </div>
        ) : error ? (
          <p className="text-center text-red-600 text-base font-semibold">
            {error}
          </p>
        ) : documento && documento.contenido ? (
          <div className="space-y-10 animate-fade-in-up">
            {documento.contenido.map((seccion, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="p-5 border border-gray-100 rounded-xl bg-gradient-to-br from-blue-50 to-white shadow-sm hover:shadow-md transition-all duration-300"
              >
                <h2 className="text-2xl font-bold text-blue-700 mb-1">
                  {seccion.tituloSeccion}
                </h2>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  {seccion.subtitulo}
                </h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 text-base">
                  {seccion.contenidoLista.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-base">
            No hay información disponible actualmente.
          </p>
        )}
      </motion.div>

      {/* Fondo inferior difuminado */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-15rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%+4rem)] aspect-[1155/678] w-[40rem] 
                     -translate-x-1/2 bg-gradient-to-tr from-blue-400 
                     to-blue-700 opacity-20 
                     sm:left-[calc(50%+36rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
};

export default PoliticaPrivacidad;
