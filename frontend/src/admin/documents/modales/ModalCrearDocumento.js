import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";
import { motion } from "framer-motion";
import CargandoModal from "../../../Animations/CargandoModal";

const ModalCrearDocumento = ({ onClose, onCrearDocumento }) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [contenido, setContenido] = useState([]);
  const [loading, setLoading] = useState(false);

  // Agregar nueva sección
  const agregarSeccion = () => {
    setContenido((prev) => [
      ...prev,
      { tituloSeccion: "", subtitulo: "", contenidoLista: [] },
    ]);
  };

  // Cambiar campos de sección
  const manejarCambioSeccion = (index, field, value) => {
    const nuevoContenido = [...contenido];
    nuevoContenido[index][field] = value;
    setContenido(nuevoContenido);
  };

  // Cambiar lista de viñetas
  const manejarCambioLista = (index, lista) => {
    const nuevoContenido = [...contenido];
    nuevoContenido[index].contenidoLista = lista;
    setContenido(nuevoContenido);
  };

  // Crear documento
  const handleCrearDocumento = async () => {
    if (!titulo.trim() || !descripcion.trim()) return;

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/documento/documentos`, {
        tipo: "Aviso de Privacidad",
        titulo,
        descripcion,
        contenido,
      });
      await onCrearDocumento();
      onClose();
    } catch (error) {
      console.error("Error al crear documento:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] animate-fade-in-up border border-gray-100">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
          Crear Documento Legal
        </h2>

        {/* Campos principales */}
        <div className="space-y-4">
          {/* Título */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej: Aviso de Privacidad"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            />
          </div>

          {/* Descripción */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Breve descripción del documento"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition resize-none"
              rows="3"
            />
          </div>
        </div>

        {/* Secciones del documento */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-blue-700 mb-3">
            Contenido del Documento
          </h3>

          {contenido.map((seccion, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg p-4 mb-4 bg-gray-50"
            >
              <label className="block text-sm font-medium text-gray-700">
                Título de la sección
              </label>
              <input
                type="text"
                value={seccion.tituloSeccion}
                onChange={(e) =>
                  manejarCambioSeccion(index, "tituloSeccion", e.target.value)
                }
                placeholder="Ej: Introducción"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
              />

              <label className="block text-sm font-medium text-gray-700 mt-3">
                Subtítulo
              </label>
              <input
                type="text"
                value={seccion.subtitulo}
                onChange={(e) =>
                  manejarCambioSeccion(index, "subtitulo", e.target.value)
                }
                placeholder="Ej: Responsabilidad de la empresa"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none"
              />

              <label className="block text-sm font-medium text-gray-700 mt-3">
                Lista de viñetas
              </label>
              <textarea
                value={seccion.contenidoLista.join("\n")}
                onChange={(e) =>
                  manejarCambioLista(index, e.target.value.split("\n"))
                }
                placeholder="Escribe una viñeta por línea..."
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none resize-none"
                rows="4"
              />
            </div>
          ))}

          {/* Botón agregar sección */}
          <button
            onClick={agregarSeccion}
            className="mt-2 px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 active:bg-green-800 transition"
          >
            + Agregar Sección
          </button>
        </div>

        {/* Botones finales */}
        <div className="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 active:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleCrearDocumento}
            disabled={loading}
            className={`px-5 py-2 rounded-lg font-semibold text-white transition-all duration-300 shadow-sm ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            }`}
          >
            {loading ? "Creando..." : "Crear Documento"}
          </button>
        </div>

        {/* Modal de carga */}
        <CargandoModal mensaje="Creando documento..." visible={loading} />
      </div>
    </motion.div>
  );
};

export default ModalCrearDocumento;
