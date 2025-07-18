import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  fetchPreguntas,
  crearPregunta,
  editarPregunta,
  eliminarPregunta,
} from "./Funciones";
import { dataLoadingAnimation } from "../../../components/Funciones";
import CargandoBarra from "../../../Animations/CargandoBarra";
import ModalCrearPregunta from "./modales//ModalCrearPregunta";
import ModalEditarPregunta from "./modales/ModalEditarPregunta";

const PreguntasFrecuentes = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModalCrear, setShowModalCrear] = useState(false);
  const [preguntaAEditar, setPreguntaAEditar] = useState(null);

  useEffect(() => {
    const obtenerPreguntas = async () => {
      try {
        const data = await fetchPreguntas();
        setPreguntas(data);
      } catch (err) {
        setError("Error al obtener las preguntas frecuentes");
      } finally {
        setLoading(false);
      }
    };
    obtenerPreguntas();
  }, []);

  const toggleAnswer = (index) => {
    setActiveQuestion((prev) => (prev === index ? null : index));
  };

  const handleCrearPregunta = async (pregunta, respuesta) => {
    try {
      const nuevaPregunta = await crearPregunta(pregunta, respuesta);
      setPreguntas((prev) => [...prev, nuevaPregunta]);
      setShowModalCrear(false);
    } catch (err) {
      setError("Error al crear la pregunta frecuente");
    }
  };

  const handleEditarPregunta = async (id, pregunta, respuesta) => {
    try {
      const preguntaEditada = await editarPregunta(id, pregunta, respuesta);
      setPreguntas((prev) =>
        prev.map((p) => (p.id === id ? preguntaEditada : p))
      );
      setPreguntaAEditar(null);
    } catch (err) {
      setError("Error al editar la pregunta frecuente");
    }
  };

  const handleEliminarPregunta = async (id) => {
    try {
      await eliminarPregunta(id);
      setPreguntas((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError("Error al eliminar la pregunta frecuente");
    }
  };

  if (loading) return <CargandoBarra message='Cargando preguntas...'/>;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <motion.div {...dataLoadingAnimation} className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-sm">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Preguntas Frecuentes</h2>

      <div className="overflow-y-auto max-h-96 mb-6">
        {preguntas.length > 0 ? (
          preguntas.map((pregunta, index) => (
            <motion.div
              key={pregunta.id}
              className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(index)}
              >
                <h3 className="text-lg font-semibold text-gray-700">
                  {index + 1}. {pregunta.pregunta}
                </h3>
                <motion.div animate={{ rotate: activeQuestion === index ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  {activeQuestion === index ? <FaChevronUp className="text-gray-500" /> : <FaChevronDown className="text-gray-500" />}
                </motion.div>
              </div>
              <AnimatePresence>
                {activeQuestion === index && (
                  <motion.p
                    className="mt-2 text-gray-600"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    {pregunta.respuesta}
                  </motion.p>
                )}
              </AnimatePresence>
              <div className="mt-4 flex space-x-4">
                <button
                  className="text-blue-500 hover:text-blue-700 transition duration-200 flex items-center"
                  onClick={() => setPreguntaAEditar(pregunta)}
                >
                  <FaEdit className="inline-block mr-2" />
                  Editar
                </button>
                <button
                  className="text-red-500 hover:text-red-700 transition duration-200 flex items-center"
                  onClick={() => handleEliminarPregunta(pregunta.id)}
                >
                  <FaTrash className="inline-block mr-2" />
                  Eliminar
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-600">No hay preguntas frecuentes disponibles.</div>
        )}
      </div>

      <button
        className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center"
        onClick={() => setShowModalCrear(true)}
      >
        <FaPlus className="inline-block mr-2" /> Crear Nueva Pregunta
      </button>

      {showModalCrear && (
        <ModalCrearPregunta
          onClose={() => setShowModalCrear(false)}
          onCrear={handleCrearPregunta}
        />
      )}

      {preguntaAEditar && (
        <ModalEditarPregunta
          preguntaInicial={preguntaAEditar}
          onClose={() => setPreguntaAEditar(null)}
          onEditar={handleEditarPregunta}
        />
      )}
    </motion.div>
  );
};

export default PreguntasFrecuentes;
