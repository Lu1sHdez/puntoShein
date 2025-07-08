import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom'; // Para redirigir al formulario de actualización
import RegresarButton from '../../components/Regresar.js';
import { dataLoadingAnimation} from '../../components/Funciones.js';
import { motion } from 'framer-motion';
import { API_URL } from '../../ApiConexion.js';
import CargandoBarra from '../../Animations/CargandoBarra.js';

const Empresa = () => {
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los datos de la empresa
  const fetchEmpresa = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/admin/empresa`, {
        withCredentials: true,  // Si usas autenticación basada en cookies
      });
      setEmpresa(response.data);
    } catch (error) {
      setError('Error al obtener los datos de la empresa');
      console.error('Error al obtener los datos de la empresa:', error);
    } finally {
      setLoading(false);
    }
  };

  // Usamos useEffect para llamar a fetchEmpresa cuando el componente se monta
  useEffect(() => {
    setLoading(true);
    fetchEmpresa();
  }, []);  // Solo se ejecuta una vez al montar el componente

  if (loading) {
    return <CargandoBarra message='Cargando empresa...'/>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-500">{error}</div>;
  }

  return (
    <motion.div {...dataLoadingAnimation} className="p-6 max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">Datos de la Empresa</h1>

      {empresa && (
        <div>
          <div className="mb-6 p-4 border border-gray-200 rounded-md">
            <h2 className="text-xl font-bold mb-2">Información General</h2>
            <div className="mb-4">
              <strong className="text-gray-700">Nombre de la empresa:</strong>
              <p className="text-gray-600">{empresa.nombre}</p>
            </div>
            <div className="mb-4">
              <strong className="text-gray-700">Misión:</strong>
              <p className="text-gray-600">{empresa.mision}</p>
            </div>
            <div className="mb-4">
              <strong className="text-gray-700">Visión:</strong>
              <p className="text-gray-600">{empresa.vision}</p>
            </div>
            <div className="mb-4">
              <strong className="text-gray-700">Valores:</strong>
              <div className="text-gray-600">
                {empresa.valores && empresa.valores.length > 0 ? (
                  <ul>
                    {empresa.valores.map((valor, index) => (
                      <li key={index}>
                        <strong>{valor.nombre}:</strong> {valor.descripcion}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>No hay valores definidos</p>
                )}
              </div>
            </div>
            <div className="mb-4">
              <strong className="text-gray-700">Historia:</strong>
              <p className="text-gray-600">{empresa.historia}</p>
            </div>
            <div className="mb-4">
              <strong className="text-gray-700">Equipo:</strong>
              <p className="text-gray-600">{empresa.equipo}</p>
            </div>
            <div className="mb-4">
              <strong className="text-gray-700">Correo:</strong>
              <p className="text-gray-600">{empresa.correo}</p>
            </div>
            <div className="mb-4">
              <strong className="text-gray-700">Teléfono:</strong>
              <p className="text-gray-600">{empresa.telefono}</p>
            </div>
            
            <div className="mb-4">
              <strong className="text-gray-700">Logo:</strong>
              {empresa.logo ? (
                <img src={empresa.logo} alt="Logo de la empresa" className="w-32 h-auto" />
              ) : (
                <p className="text-gray-600">No disponible</p>
              )}
            </div>
          </div>

          <div className="text-center">
            <Link to="/admin/empresa/actualizar" className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition duration-300">
              Actualizar Datos
            </Link>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <RegresarButton />
      </div>
    </motion.div>
  );
};

export default Empresa;
