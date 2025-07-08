import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { formAnimation, userDetailsLoadingAnimation } from '../../components/Funciones.js';
import { motion } from 'framer-motion';
import RegresarButton from '../../components/Regresar.js';
import { API_URL } from '../../ApiConexion.js';
import CargandoBarra from '../../Animations/CargandoBarra.js';


const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/perfil`, { withCredentials: true });
        setUsuario(response.data);
      } catch (err) {
        setError('No se pudo obtener los datos del perfil');
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    obtenerPerfil();
  }, [navigate]);

  if (loading) {
    return <CargandoBarra message='Cargando perfil...'/>;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <motion.div {...formAnimation} className="flex items-center justify-center mt-0 py-8 px-4">
      <motion.div {...userDetailsLoadingAnimation} className="bg-white p-5 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Perfil de Administrador</h1>

        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Nombre de Usuario:</span>
            <span className="text-gray-800">{usuario.nombre_usuario}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Nombre:</span>
            <span className="text-gray-800">{usuario.nombre}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Apellido Materno:</span>
            <span className="text-gray-800">{usuario.apellido_paterno}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Apellido Paterno:</span>
            <span className="text-gray-800">{usuario.apellido_materno}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Correo Electrónico:</span>
            <span className="text-gray-800">{usuario.correo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Teléfono:</span>
            <span className="text-gray-800">{usuario.telefono}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Rol:</span>
            <span className="text-gray-800">{usuario.rol}</span>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={() => navigate('/admin/actualizarPerfil')}
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
          >
            Editar Perfil
          </button>
          <RegresarButton />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Perfil;
