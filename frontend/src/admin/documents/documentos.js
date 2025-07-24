import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaFileAlt } from 'react-icons/fa';
import CargandoBarra from '../../Animations/CargandoBarra.js';
import { API_URL } from '../../ApiConexion.js';
import { dataLoadingAnimation } from '../../components/Funciones.js';
import RegresarButton from '../../components/Regresar.js';
import ModalCrearDocumento from './modales/ModalCrearDocumento.js';

const Documentos = () => {
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [mostrarModalCrear, setMostrarModalCrear] = useState(false); // Modal de creación de documento

  const fetchDocumentos = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/documento/documentos`, { withCredentials: true });
      if (response.data.mensaje === "No se encontraron documentos.") {
      } else {
        setDocumentos(response.data);
      }
    } catch (error) {
      setError('Error al obtener los documentos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocumentos();
  }, []);

  if (loading) return <CargandoBarra message="Cargando documentos..." />;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <motion.div {...dataLoadingAnimation} className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">Documentos Legales</h1>

      {documentos && (
        <div className="space-y-6">
          {/* Sección de Documentos */}
          <section className="p-6 border-2 border-gray-200 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Lista de Documentos Legales</h2>

            {/* Si no hay documentos, muestra mensaje y botón para crear */}
            {documentos.length === 0 ? (
              <div className="text-center">
                <FaFileAlt className="text-6xl text-gray-400 mb-4" />
                <p className="text-center text-gray-500">No se han creado documentos legales aún.</p>
                <button
                  onClick={() => setMostrarModalCrear(true)}  // Mostrar el modal al hacer clic
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Crear Documento
                </button>
              </div>
            ) : (
              // Si hay documentos, muestra la lista
              <ul className="space-y-4">
                {documentos.map((documento) => (
                  <li key={documento.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{documento.titulo}</h3>
                      <p className="text-gray-500">{documento.descripcion}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* BOTÓN REGRESAR */}
          <div className="text-center">
            <RegresarButton />
          </div>

          {/* Modal de Creación */}
          {mostrarModalCrear && (
            <ModalCrearDocumento
              onClose={() => setMostrarModalCrear(false)}  // Cerrar el modal al cancelar
              onCrearDocumento={fetchDocumentos}  // Recargar los documentos después de crear el nuevo
            />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Documentos;
