import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";
import { motion } from "framer-motion";
import { FaPlusCircle, FaTimesCircle, FaFileAlt } from "react-icons/fa";
import CargandoModal from "../../../Animations/CargandoModal";
import Swal from "sweetalert2";

const ModalCrearDocumento = ({ onClose, onCrearDocumento, documentoEditar }) => {
  const [tipo, setTipo] = useState("Aviso de Privacidad");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [contenido, setContenido] = useState([]);
  const [loading, setLoading] = useState(false);

  // === Cargar datos si se está editando ===
  useEffect(() => {
    if (documentoEditar) {
      setTipo(documentoEditar.tipo);
      setTitulo(documentoEditar.titulo);
      setDescripcion(documentoEditar.descripcion);

      // Convierte el contenido si viene en formato string JSON
      try {
        const parsed =
          typeof documentoEditar.contenido === "string"
            ? JSON.parse(documentoEditar.contenido)
            : documentoEditar.contenido || [];
        setContenido(parsed);
      } catch {
        setContenido([]);
      }
    }
  }, [documentoEditar]);

  // === Agregar sección ===
  const agregarSeccion = () => {
    setContenido((prev) => [
      ...prev,
      { tituloSeccion: "", subtitulo: "", contenidoLista: [] },
    ]);
  };

  // === Cambiar campos de sección ===
  const manejarCambioSeccion = (index, field, value) => {
    const nuevoContenido = [...contenido];
    nuevoContenido[index][field] = value;
    setContenido(nuevoContenido);
  };

  // === Cambiar lista de viñetas ===
  const manejarCambioLista = (index, lista) => {
    const nuevoContenido = [...contenido];
    nuevoContenido[index].contenidoLista = lista;
    setContenido(nuevoContenido);
  };

  // === Guardar o actualizar documento ===
  const handleGuardarDocumento = async () => {
    if (!tipo.trim() || !titulo.trim() || !descripcion.trim()) return;
    setLoading(true);

    try {
      const contenidoFinal = Array.isArray(contenido)
        ? contenido
        : JSON.parse(contenido || "[]");

      if (documentoEditar) {
        await axios.put(
          `${API_URL}/api/documento/actualizar/${encodeURIComponent(
            documentoEditar.tipo
          )}`,
          { titulo, descripcion, contenido: contenidoFinal },
          { withCredentials: true }
        );

        Swal.fire({
          icon: "success",
          title: "Documento actualizado correctamente",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        await axios.post(
          `${API_URL}/api/documento/crear`,
          { tipo, titulo, descripcion, contenido: contenidoFinal },
          { withCredentials: true }
        );

        Swal.fire({
          icon: "success",
          title: "Documento creado con éxito",
          showConfirmButton: false,
          timer: 1500,
        });
      }

      await onCrearDocumento(); // Recargar lista
      onClose(); // Cerrar modal
    } catch (error) {
      console.error("Error al guardar documento:", error);
      Swal.fire({
        icon: "error",
        title: "Error al guardar el documento",
        text: "Verifica los datos o permisos.",
      });
    } finally {
      setLoading(false);
    }
  };

  // === Animación de entrada ===
  const modalAnimation = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        variants={modalAnimation}
        initial="hidden"
        animate="visible"
        className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 sm:p-8 overflow-y-auto max-h-[90vh] border border-gray-200 relative"
      >
        {/* === Encabezado === */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <FaFileAlt className="text-blue-600 text-2xl" />
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {documentoEditar ? "Editar Documento" : "Crear Documento Legal"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-600 transition"
            title="Cerrar"
          >
            <FaTimesCircle size={24} />
          </button>
        </div>

        {/* === Tipo de documento === */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Tipo de Documento
          </label>
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            disabled={!!documentoEditar}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
          >
            <option>Aviso de Privacidad</option>
            <option>Términos y Condiciones</option>
            <option>Deslinde Legal</option>
          </select>
          {documentoEditar && (
            <p className="text-xs text-gray-500 mt-1">
              El tipo no se puede modificar al editar.
            </p>
          )}
        </div>

        {/* === Título y descripción === */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Título
            </label>
            <input
              type="text"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Ej: Aviso de Privacidad de Punto Shein"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="Breve descripción del documento..."
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition resize-none"
              rows="3"
            />
          </div>
        </div>

        {/* === Contenido === */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-blue-700 mb-3">
            Contenido del Documento
          </h3>

          {contenido.map((seccion, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="border border-gray-200 rounded-lg p-4 mb-4 bg-blue-50/40 shadow-sm"
            >
              <label className="block text-sm font-semibold text-gray-700">
                Título de la sección
              </label>
              <input
                type="text"
                value={seccion.tituloSeccion}
                onChange={(e) =>
                  manejarCambioSeccion(index, "tituloSeccion", e.target.value)
                }
                placeholder="Ej: Introducción"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <label className="block text-sm font-semibold text-gray-700 mt-3">
                Subtítulo
              </label>
              <input
                type="text"
                value={seccion.subtitulo}
                onChange={(e) =>
                  manejarCambioSeccion(index, "subtitulo", e.target.value)
                }
                placeholder="Ej: Responsabilidad de la empresa"
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none"
              />

              <label className="block text-sm font-semibold text-gray-700 mt-3">
                Lista de viñetas
              </label>
              <textarea
                value={seccion.contenidoLista.join("\n")}
                onChange={(e) =>
                  manejarCambioLista(index, e.target.value.split("\n"))
                }
                placeholder="Escribe una viñeta por línea..."
                className="w-full p-2 mt-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none resize-none"
                rows="4"
              />
            </motion.div>
          ))}

          <button
            onClick={agregarSeccion}
            className="mt-3 flex items-center gap-2 px-5 py-2 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 active:bg-green-800 transition-all duration-200 shadow-md"
          >
            <FaPlusCircle />
            Agregar Sección
          </button>
        </div>

        {/* === Botones === */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-10 pt-4 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardarDocumento}
            disabled={loading}
            className={`w-full sm:w-auto px-5 py-2 rounded-lg font-semibold text-white shadow-md transition-all duration-300 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
            }`}
          >
            {loading
              ? "Guardando..."
              : documentoEditar
              ? "Actualizar Documento"
              : "Crear Documento"}
          </button>
        </div>

        <CargandoModal
          mensaje={
            documentoEditar
              ? "Actualizando documento..."
              : "Creando documento..."
          }
          visible={loading}
        />
      </motion.div>
    </motion.div>
  );
};

export default ModalCrearDocumento;
