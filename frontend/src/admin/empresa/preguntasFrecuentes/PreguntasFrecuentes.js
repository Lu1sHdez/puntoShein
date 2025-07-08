import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaEdit, FaTrash, FaChevronDown, FaChevronUp } from "react-icons/fa";
import {
  fetchPreguntas,
  crearPregunta,
  editarPregunta,
  eliminarPregunta,
} from "./Funciones"; // Importamos las funciones CRUD
import { dataLoadingAnimation } from "../../../components/Funciones";
import CargandoBarra from "../../../Animations/CargandoBarra";

const PreguntasFrecuentes = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para crear pregunta
  const [newPregunta, setNewPregunta] = useState("");
  const [newRespuesta, setNewRespuesta] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false); // Estado para mostrar/ocultar el formulario

  // Estado para edición
  const [editingPregunta, setEditingPregunta] = useState(null);
  const [editedPregunta, setEditedPregunta] = useState("");
  const [editedRespuesta, setEditedRespuesta] = useState("");

  // Obtenemos las preguntas al montar el componente
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

  // Manejo de acordeón
  const toggleAnswer = (index) => {
    setActiveQuestion((prev) => (prev === index ? null : index));
  };

  // Crear
  const handleCrearPregunta = async (e) => {
    e.preventDefault();
    try {
      const nuevaPregunta = await crearPregunta(newPregunta, newRespuesta);
      setPreguntas((prev) => [...prev, nuevaPregunta]);
      setNewPregunta("");
      setNewRespuesta("");
      setShowCreateForm(false); // Ocultamos el formulario después de crear la pregunta
    } catch (err) {
      setError("Error al crear la pregunta frecuente");
    }
  };

  // Editar
  const handleEditarPregunta = async (e) => {
    e.preventDefault();
    try {
      const preguntaEditada = await editarPregunta(
        editingPregunta.id,
        editedPregunta,
        editedRespuesta
      );

      const preguntasActualizadas = preguntas.map((p) =>
        p.id === editingPregunta.id ? preguntaEditada : p
      );

      setPreguntas(preguntasActualizadas);

      // Limpiamos el modo edición
      setEditingPregunta(null);
      setEditedPregunta("");
      setEditedRespuesta("");
    } catch (err) {
      setError("Error al editar la pregunta frecuente");
    }
  };

  // Eliminar
  const handleEliminarPregunta = async (id) => {
    try {
      await eliminarPregunta(id);
      setPreguntas((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      setError("Error al eliminar la pregunta frecuente");
    }
  };

  if (loading) {
    return <CargandoBarra message='Cargando preguntas...'/>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <motion.div
      {...dataLoadingAnimation}
      className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow-sm"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Preguntas Frecuentes
      </h2>

      {/* Listado de preguntas */}
      <div className="overflow-y-auto max-h-96 mb-6">
        {preguntas.length > 0 ? (
          preguntas.map((pregunta, index) => (
            <motion.div
              key={pregunta.id}
              className="mb-4 p-4 bg-gray-50 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
              // Animación al montar/desmontar
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              {/* Título de la pregunta */}
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(index)}
              >
                <h3 className="text-lg font-semibold text-gray-700">
                  {index + 1}. {pregunta.pregunta}
                </h3>
                <motion.div
                  animate={{ rotate: activeQuestion === index ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeQuestion === index ? (
                    <FaChevronUp className="text-gray-500" />
                  ) : (
                    <FaChevronDown className="text-gray-500" />
                  )}
                </motion.div>
              </div>
              {/* Respuesta en acordeón */}
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
              {/* Botones de editar / eliminar */}
              <div className="mt-4 flex space-x-4">
                <button
                  className="text-blue-500 hover:text-blue-700 transition duration-200 flex items-center"
                  onClick={() => {
                    setEditingPregunta(pregunta);
                    setEditedPregunta(pregunta.pregunta);
                    setEditedRespuesta(pregunta.respuesta);
                  }}
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

              {/* Formulario para Editar Pregunta en el mismo lugar */}
              {editingPregunta?.id === pregunta.id && (
                <motion.div
                  className="mt-4 bg-gray-100 p-4 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <form onSubmit={handleEditarPregunta}>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-1">Pregunta</label>
                      <input
                        type="text"
                        value={editedPregunta}
                        onChange={(e) => setEditedPregunta(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-gray-700 mb-1">Respuesta</label>
                      <textarea
                        value={editedRespuesta}
                        onChange={(e) => setEditedRespuesta(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                        rows="3"
                        required
                      />
                    </div>
                    <div className="flex justify-end space-x-4">
                      <button
                        type="button"
                        onClick={() => setEditingPregunta(null)}
                        className="bg-gray-400 text-white py-2 px-4 rounded-lg hover:bg-gray-500 transition"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                      >
                        Guardar Cambios
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </motion.div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-600">
            No hay preguntas frecuentes disponibles.
          </div>
        )}
      </div>

      {/* Botón para abrir el formulario de Crear Pregunta */}
      <button
        className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition duration-200 flex items-center justify-center"
        onClick={() => setShowCreateForm(!showCreateForm)}
      >
        <FaPlus className="inline-block mr-2" />
        {showCreateForm ? "Cancelar" : "Crear Nueva Pregunta"}
      </button>

      {/* Formulario para Crear Pregunta */}
      {showCreateForm && (
        <motion.div
          className="mt-8 bg-gray-100 p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-gray-800">
            Crear Pregunta Frecuente
          </h3>
          <form onSubmit={handleCrearPregunta}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Pregunta</label>
              <input
                type="text"
                value={newPregunta}
                onChange={(e) => setNewPregunta(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                required
                placeholder="Ingresa la pregunta"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-1">Respuesta</label>
              <textarea
                value={newRespuesta}
                onChange={(e) => setNewRespuesta(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-400"
                rows="3"
                required
                placeholder="Ingresa la respuesta"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-200"
            >
              Crear
            </button>
          </form>
        </motion.div>
      )}
    </motion.div>
  );
};

export default PreguntasFrecuentes;