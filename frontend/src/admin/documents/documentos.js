import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaFileAlt, FaPlusCircle } from "react-icons/fa";
import CargandoBarra from "../../Animations/CargandoBarra.js";
import { API_URL } from "../../ApiConexion.js";
import { dataLoadingAnimation } from "../../components/Funciones.js";
import RegresarButton from "../../components/Regresar.js";
import ModalCrearDocumento from "./modales/ModalCrearDocumento.js";

const Documentos = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarModalCrear, setMostrarModalCrear] = useState(false);

  const fetchDocumentos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/documento/documentos`, {
        withCredentials: true,
      });

      if (response.data.mensaje !== "No se encontraron documentos.") {
        setDocumentos(response.data);
      }
    } catch (error) {
      setError("Error al obtener los documentos");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocumentos();
  }, []);

  if (loading) return <CargandoBarra message="Cargando documentos..." />;
  if (error)
    return (
      <div className="text-center py-4 text-red-500 font-semibold">{error}</div>
    );

  return (
    <motion.div
      {...dataLoadingAnimation}
      className="p-6 sm:p-8 max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 animate-fade-in-up"
    >
      {/* === Encabezado === */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center sm:text-left">
          Documentos Legales
        </h1>
        <button
          onClick={() => setMostrarModalCrear(true)}
          className="mt-4 sm:mt-0 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full shadow-sm transition-all duration-200"
        >
          <FaPlusCircle />
          <span>Crear Documento</span>
        </button>
      </div>

      {/* === Sección de Documentos === */}
      <section className="p-5 border border-gray-200 rounded-xl shadow-sm bg-gradient-to-br from-gray-50 to-white">
        <h2 className="text-xl font-semibold text-blue-700 mb-4">
          Lista de Documentos Legales
        </h2>

        {documentos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <FaFileAlt className="text-7xl text-gray-300 mb-4 animate-float" />
            <p className="text-gray-500 text-base mb-4">
              No se han creado documentos legales aún.
            </p>
            <button
              onClick={() => setMostrarModalCrear(true)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              Crear Documento
            </button>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {documentos.map((documento) => (
              <div
                key={documento.id}
                className="flex flex-col justify-between bg-white border border-gray-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-200"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {documento.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {documento.descripcion || "Sin descripción."}
                  </p>
                </div>
                <div className="mt-4 text-right">
                  <a
                    href={documento.archivo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 hover:underline text-sm font-semibold"
                  >
                    Ver documento
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* === Modal Crear Documento === */}
      {mostrarModalCrear && (
        <ModalCrearDocumento
          onClose={() => setMostrarModalCrear(false)}
          onCrearDocumento={fetchDocumentos}
        />
      )}
    </motion.div>
  );
};

export default Documentos;
