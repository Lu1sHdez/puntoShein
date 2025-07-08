import React, { useState, useEffect } from "react";
import axios from "axios";
import { dataLoadingAnimation } from '../Funciones';
import { motion } from 'framer-motion';
import { API_URL } from "../../ApiConexion";
import { Cargando } from "../../Animations/Cargando";

const PreguntasFrecuentes = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener las preguntas frecuentes desde la API
  const fetchPreguntas = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/preguntas/obtener`, {
        withCredentials: true,  // Si usas autenticación basada en cookies
      });
      setPreguntas(response.data);  // Almacena las preguntas en el estado
    } catch (error) {
      setError('Error al obtener las preguntas frecuentes');
      console.error('Error al obtener las preguntas frecuentes:', error);
    } finally {
      setLoading(false);
    }
  };

  // Usamos useEffect para cargar las preguntas cuando el componente se monta
  useEffect(() => {
    fetchPreguntas();
  }, []);

  const toggleAnswer = (index) => {
    if (activeQuestion === index) {
      setActiveQuestion(null); // Si la misma pregunta se hace clic, se cierra
    } else {
      setActiveQuestion(index); // Si una nueva pregunta se hace clic, se abre
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Cargando message="Cargando preguntas frecuentes..." />
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <motion.div {...dataLoadingAnimation} className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Preguntas Frecuentes (FAQ)</h2>

      <div className="overflow-y-auto max-h-96"> {/* Contenedor con scroll */}
        {preguntas.length > 0 ? (
          preguntas.map((pregunta, index) => (
            <div key={index} className="mb-4">
              <h3
                className="text-lg font-semibold cursor-pointer mb-2"
                onClick={() => toggleAnswer(index)}
              >
                {index + 1}. {pregunta.pregunta}
              </h3>
              {activeQuestion === index && (
                <p>{pregunta.respuesta}</p>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-gray-600">No hay preguntas frecuentes disponibles.</div>
        )}
      </div>
    </motion.div>
  );
};

export default PreguntasFrecuentes;
