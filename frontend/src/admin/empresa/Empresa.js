import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import RegresarButton from '../../components/Regresar.js';
import CargandoBarra from '../../Animations/CargandoBarra.js';
import { API_URL } from '../../ApiConexion.js';
import { FaEdit } from "react-icons/fa";
import { dataLoadingAnimation } from '../../components/Funciones.js';
import ModalEditarLogo from './modales/Logo.js';
import ModalDatosGenerales from './modales/DatosGenerales.js';
import ModalContacto from './modales/Contacto.js';
import ModalValores from './modales/Valores.js';

const Empresa = () => {
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [mostrarModalLogo, setMostrarModalLogo] = useState(false);
  const [mostrarModalGenerales, setMostrarModalGenerales] = useState(false);
  const [mostrarModalContacto, setMostrarModalContacto] = useState(false);
  const [mostrarModalValores, setMostrarModalValores] = useState(false);

  const fetchEmpresa = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/empresa/empresa`, { withCredentials: true });
      setEmpresa(response.data);
    } catch (error) {
      setError('Error al obtener los datos de la empresa');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpresa();
  }, []);

  if (loading) return <CargandoBarra message="Cargando empresa..." />;
  if (error) return <div className="text-center py-4 text-red-500">{error}</div>;

  return (
    <motion.div {...dataLoadingAnimation} className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Datos de la Empresa</h1>

      {empresa && (
        <div className="space-y-6">
          {/* DATOS GENERALES */}
          <section className="p-4 border-2 border-gray-200 rounded-lg shadow-md bg-white">

            <h2 className="text-xl font-bold mb-2">Información General</h2>
            <p><strong>Nombre:</strong> {empresa.nombre}</p>
            <p><strong>Misión:</strong> {empresa.mision}</p>
            <p><strong>Visión:</strong> {empresa.vision}</p>
            <p><strong>Historia:</strong> {empresa.historia}</p>
            <p><strong>Equipo:</strong> {empresa.equipo}</p>
            <button
              onClick={() => setMostrarModalGenerales(true)}
              className="mt-3 px-4 py-1 bg-pink-600 text-white rounded hover:bg-pink-700 flex items-center"
            >
              <FaEdit className="mr-2" />
            </button>
          </section>

          {/* CONTACTO */}
          <section className="relative p-4 border-2 border-gray-200 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-bold mb-2">Contacto</h2>
            <p><strong>Correo:</strong> {empresa.correo}</p>
            <p><strong>Teléfono:</strong> {empresa.telefono}</p>
            <button onClick={() => setMostrarModalContacto(true)} className="mt-3 px-4 py-1 bg-pink-600 text-white rounded hover:bg-pink-700 flex items-center"
            >
              <FaEdit className="mr-2" />
            </button>
          </section>

          {/* VALORES */}
          <section className="p-4 border-2 border-gray-200 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-bold mb-2">Valores</h2>
            {empresa.valores?.length ? (
              <ul className="text-gray-700 list-disc list-inside">
                {empresa.valores.map((valor, idx) => (
                  <li key={idx}><strong>{valor.nombre}:</strong> {valor.descripcion}</li>
                ))}
              </ul>
            ) : <p className="text-gray-500">No hay valores definidos.</p>}
            <button onClick={() => setMostrarModalValores(true)} className="mt-3 px-4 py-1 bg-pink-600 text-white rounded hover:bg-pink-700 flex items-center"
            >
              <FaEdit className="mr-2" />
            </button>
          </section>

          <section className="p-4 border-2 border-gray-200 rounded-lg shadow-md bg-white">
            <h2 className="text-xl font-bold mb-2">Logo</h2>

            {empresa.logo ? (
              <div className="relative w-fit inline-block">
                <img src={empresa.logo} alt="Logo" className="w-32 h-auto mb-2 rounded-md shadow" />
                <button
                  onClick={() => setMostrarModalLogo(true)}
                  className="absolute top-1 right-1 bg-pink-600 text-white p-1 rounded-full hover:bg-pink-700 transition"
                  title="Editar logo"
                >
                  <FaEdit size={16} />
                </button>
              </div>
            ) : (
              <p className="text-gray-500 mb-2">No disponible</p>
            )}
          </section>


          {/* BOTÓN REGRESAR */}
          <div className="text-center">
            <RegresarButton />
          </div>

          {/* MODALES */}
          {mostrarModalGenerales && (
            <ModalDatosGenerales
              empresa={empresa}
              onClose={() => setMostrarModalGenerales(false)}
              onActualizar={fetchEmpresa}
            />
          )}
          {mostrarModalContacto && (
            <ModalContacto
              empresa={empresa}
              onClose={() => setMostrarModalContacto(false)}
              onActualizar={fetchEmpresa}
            />
          )}
          {mostrarModalValores && (
            <ModalValores
              empresa={empresa}
              onClose={() => setMostrarModalValores(false)}
              onActualizar={fetchEmpresa}
            />
          )}
          {mostrarModalLogo && (
            <ModalEditarLogo
              empresa={empresa}
              onClose={() => setMostrarModalLogo(false)}
              onActualizar={fetchEmpresa}
            />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Empresa;
