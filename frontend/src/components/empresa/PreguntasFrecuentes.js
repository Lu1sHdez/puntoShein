import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { dataLoadingAnimation } from "../Funciones";
import { API_URL } from "../../ApiConexion";
import CargandoBarra from "../../Animations/CargandoBarra";

const PreguntasFrecuentes = () => {
  const [preguntas, setPreguntas] = useState([]);
  const [activeQuestion, setActiveQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Obtener preguntas desde la API
  useEffect(() => {
    const fetchPreguntas = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/preguntas/obtener`, {
          withCredentials: true,
        });
        setPreguntas(response.data);
      } catch (err) {
        setError("Error al obtener las preguntas frecuentes.");
        console.error("Error al obtener las preguntas frecuentes:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPreguntas();
  }, []);

  const toggleAnswer = (index) => {
    setActiveQuestion(activeQuestion === index ? null : index);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10">
        <CargandoBarra message="Cargando preguntas frecuentes..." />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-600 py-8">{error}</div>;
  }

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

      {/* Contenido principal */}
      <motion.div
        {...dataLoadingAnimation}
        className="max-w-5xl mx-auto px-6 sm:px-10 py-10 bg-white border border-gray-200 rounded-2xl shadow-lg"
      >
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 animate-fade-in-up">
            Preguntas Frecuentes (FAQ)
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Encuentra respuestas a las dudas más comunes sobre Punto Shein.
          </p>
        </header>

        {/* Lista de preguntas */}
        {preguntas.length > 0 ? (
          <div className="space-y-4 animate-fade-in-up">
            {preguntas.map((pregunta, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all bg-blue-50/30"
              >
                <button
                  onClick={() => toggleAnswer(index)}
                  className="w-full flex justify-between items-center text-left px-5 py-4 focus:outline-none"
                >
                  <h3 className="text-lg font-semibold text-blue-700">
                    {index + 1}. {pregunta.pregunta}
                  </h3>
                  <span
                    className={`text-blue-600 transition-transform ${
                      activeQuestion === index ? "rotate-90" : ""
                    }`}
                  >
                    ▶
                  </span>
                </button>

                {activeQuestion === index && (
                  <div className="px-5 pb-5 text-gray-700 border-t border-blue-200">
                    <p className="text-justify leading-relaxed">
                      {pregunta.respuesta}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-600 py-8">
            No hay preguntas frecuentes disponibles.
          </div>
        )}
      </motion.div>

      {/* Fondo inferior difuminado */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-15rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%+4rem)] aspect-[1155/678] w-[40rem]
                     -translate-x-1/2 bg-gradient-to-tr from-blue-400 to-blue-700 opacity-20
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

export default PreguntasFrecuentes;
