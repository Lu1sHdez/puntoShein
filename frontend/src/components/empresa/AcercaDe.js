// src/components/publico/AcercaDe.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { dataLoadingAnimation } from "../Funciones";
import { API_URL } from "../../ApiConexion";
import CargandoBarra from "../../Animations/CargandoBarra";
import { Link } from "react-router-dom";

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
        setError("No se pudo cargar la información de la empresa. Por favor, intenta más tarde.");
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmpresa();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
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
    <motion.section
      {...dataLoadingAnimation}
      className="max-w-5xl mx-auto px-6 sm:px-10 py-10 bg-white border border-gray-200 rounded-lg shadow-lg mt-6"
    >
      {/* Botón de regreso */}
      <div className="mb-6">
        <Link to="/" className="btn-atras">
          ← Volver al inicio
        </Link>
      </div>

      {/* Encabezado */}
      <header className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">Acerca de Nosotros</h1>
        <p className="text-sm text-gray-500 mt-1">Conoce más sobre nuestra empresa</p>
      </header>

      {/* Contenido */}
      <section className="text-gray-700 text-justify leading-relaxed space-y-8">

        <div>
          <h2 className="text-2xl font-semibold mb-2">Misión</h2>
          <p>{empresa.mision}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Visión</h2>
          <p>{empresa.vision}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Valores</h2>
          {empresa.valores && empresa.valores.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {empresa.valores.map((valor, index) => (
                <li key={index}>
                  <strong>{valor.nombre}:</strong> {valor.descripcion}
                </li>
              ))}
            </ul>
          ) : (
            <p>No hay valores definidos.</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Historia</h2>
          <p>{empresa.historia}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Nuestro Equipo</h2>
          <p>{empresa.equipo}</p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-2">Contacto</h2>
          <p><strong>Correo:</strong> {empresa.correo}</p>
          <p><strong>Teléfono:</strong> {empresa.telefono}</p>
        </div>

      </section>
    </motion.section>
  );
};

export default AcercaDe;
