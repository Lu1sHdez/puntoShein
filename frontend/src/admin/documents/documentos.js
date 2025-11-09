import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaFileAlt, FaPlusCircle, FaClock, FaEdit } from "react-icons/fa";
import CargandoBarra from "../../Animations/CargandoBarra.js";
import { API_URL } from "../../ApiConexion.js";
import { dataLoadingAnimation } from "../../components/Funciones.js";
import ModalCrearDocumento from "./modales/ModalCrearDocumento.js";

const Documentos = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [documentoEditar, setDocumentoEditar] = useState(null);

  const fetchDocumentos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/documento/obtener`, {
        withCredentials: true,
      });

      if (response.data.mensaje !== "No se encontraron documentos.") {
        setDocumentos(response.data);
      } else {
        setDocumentos([]);
      }
    } catch (error) {
      setError("Error al obtener los documentos.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocumentos();
  }, []);

  // === Formatear fecha ===
  const formatFecha = (fecha) => {
    const date = new Date(fecha);
    return date.toLocaleDateString("es-MX", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (loading) return <CargandoBarra message="Cargando documentos..." />;
  if (error)
    return (
      <div className="text-center py-4 text-red-500 font-semibold">{error}</div>
    );

  return (
    <motion.div
      {...dataLoadingAnimation}
      className="p-6 sm:p-8 max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 animate-fade-in-up"
    >
      {/* === Encabezado === */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center sm:text-left">
          📄 Documentos Legales
        </h1>
        <button
          onClick={() => {
            setDocumentoEditar(null);
            setMostrarModal(true);
          }}
          className="mt-4 sm:mt-0 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-full shadow-md transition-all duration-200"
        >
          <FaPlusCircle />
          <span>Crear Documento</span>
        </button>
      </div>

      {/* === Contenedor === */}
      <section className="p-6 border border-gray-200 rounded-xl shadow-sm bg-gradient-to-br from-gray-50 to-white">
        <h2 className="text-xl font-semibold text-blue-700 mb-5 flex items-center gap-2">
          <FaFileAlt className="text-blue-600" /> Lista de Documentos Legales
        </h2>

        {documentos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <FaFileAlt className="text-7xl text-gray-300 mb-4 animate-float" />
            <p className="text-gray-500 text-base mb-4">
              No se han creado documentos legales aún.
            </p>
            <button
              onClick={() => setMostrarModal(true)}
              className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200"
            >
              Crear Documento
            </button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {documentos.map((documento) => (
              <motion.div
                key={documento.id}
                whileHover={{ scale: 1.03 }}
                className="flex flex-col justify-between bg-white border border-gray-100 rounded-lg p-5 shadow-sm hover:shadow-md transition-all duration-200 relative"
              >
                {/* Icono */}
                <div className="absolute top-4 right-4">
                  <FaFileAlt className="text-blue-500 text-2xl" />
                </div>

                {/* Contenido */}
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {documento.titulo}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {documento.descripcion || "Sin descripción disponible."}
                  </p>
                </div>

                {/* Pie */}
                <div className="mt-5 border-t pt-3 flex justify-between items-center text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <FaClock />
                    <span>{formatFecha(documento.fecha_actualizacion)}</span>
                  </div>
                  <span className="text-blue-600 font-semibold text-xs bg-blue-50 px-2 py-1 rounded-md">
                    {documento.tipo}
                  </span>
                </div>

                {/* Botón Editar */}
                <button
                  onClick={() => {
                    setDocumentoEditar(documento);
                    setMostrarModal(true);
                  }}
                  className="absolute bottom-3 right-3 flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 transition-all duration-200"
                >
                  <FaEdit /> Editar
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* === Modal Crear/Editar Documento === */}
      {mostrarModal && (
        <ModalCrearDocumento
          onClose={() => setMostrarModal(false)}
          onCrearDocumento={fetchDocumentos}
          documentoEditar={documentoEditar}
        />
      )}
    </motion.div>
  );
};

export default Documentos;
