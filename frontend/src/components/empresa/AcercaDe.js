import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { dataLoadingAnimation } from "../Funciones";
import { API_URL } from "../../ApiConexion";
import CargandoBarra from "../../Animations/CargandoBarra";

const AcercaDe = () => {
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmpresa = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/empresa/empresa`, {
          withCredentials: true,
        });
        setEmpresa(response.data);
      } catch (error) {
        setError(
          "No se pudo cargar la información de la empresa. Por favor, intenta más tarde."
        );
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresa();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <CargandoBarra message="Cargando la información..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 text-base font-semibold py-10">
        {error}
      </div>
    );
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

      <motion.div
        {...dataLoadingAnimation}
        className="max-w-5xl mx-auto px-6 sm:px-10 py-10 bg-white border border-gray-200 rounded-2xl shadow-lg"
      >
        {/* Encabezado */}
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight mb-3 animate-fade-in-up">
            Acerca de Nosotros
          </h1>
          <p className="text-sm sm:text-base text-gray-500">
            Conoce más sobre quiénes somos y lo que nos inspira
          </p>
        </header>

        {/* Contenido principal */}
        <div className="text-gray-700 leading-relaxed space-y-10 animate-fade-in-up">
          <div>
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">
              Misión
            </h2>
            <p className="text-justify">{empresa.mision}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">
              Visión
            </h2>
            <p className="text-justify">{empresa.vision}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">
              Valores
            </h2>
            {empresa.valores && empresa.valores.length > 0 ? (
              <ul className="list-disc list-inside space-y-2">
                {empresa.valores.map((valor, index) => (
                  <li key={index}>
                    <strong className="text-blue-600">{valor.nombre}:</strong>{" "}
                    {valor.descripcion}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No hay valores definidos.</p>
            )}
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">
              Historia
            </h2>
            <p className="text-justify">{empresa.historia}</p>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">
              Nuestro Equipo
            </h2>
            <p className="text-justify">{empresa.equipo}</p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mt-10 shadow-sm">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">
              Contacto
            </h2>
            <p>
              <strong>Correo:</strong> {empresa.correo}
            </p>
            <p>
              <strong>Teléfono:</strong> {empresa.telefono}
            </p>
          </div>
        </div>
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

export default AcercaDe;
