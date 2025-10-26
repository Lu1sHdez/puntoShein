import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { formAnimation } from '../../components/Funciones.js';
import { motion } from 'framer-motion';
import { mostrarNotificacion } from '../../Animations/NotificacionSwal.js';
import { API_URL } from '../../ApiConexion.js';
import CargandoBarra from '../../Animations/CargandoBarra.js';

const ActualizarPerfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [datos, setDatos] = useState({});
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/perfil`, {
          withCredentials: true,
        });
        setUsuario(response.data);
        setDatos({
          nombre_usuario: response.data.nombre_usuario,
          nombre: response.data.nombre,
          apellido_paterno: response.data.apellido_paterno,
          apellido_materno: response.data.apellido_materno,
          telefono: response.data.telefono,
          correo: response.data.correo,
        });
      } catch (error) {
        if (error.response?.status === 401) {
          navigate('/login');
        } else {
          setErrores({ general: 'Error al obtener los datos del perfil.' });
        }
      }
    };
    obtenerPerfil();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación simple
    if (
      !datos.nombre_usuario ||
      !datos.nombre ||
      !datos.apellido_paterno ||
      !datos.telefono ||
      !datos.correo
    ) {
      setErrores({ general: 'Todos los campos son obligatorios.' });
      return;
    }

    try {
      await axios.put(`${API_URL}/api/admin/perfil`, datos, {
        withCredentials: true,
      });

      mostrarNotificacion('success', '¡Perfil actualizado con éxito!');
      navigate('/admin/perfil');
    } catch (error) {
      setErrores({
        general:
          error.response?.data?.mensaje || 'Error al actualizar el perfil.',
      });
    }
  };

  const handleCancel = () => navigate('/admin/perfil');

  if (!usuario) return <CargandoBarra message="Cargando perfil..." />;

  return (
    <motion.div
      {...formAnimation}
      className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8"
    >
      <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-2xl">
        <h1 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-6">
          Editar mi perfil
        </h1>

        {errores.general && (
          <p className="text-red-500 text-sm text-center mb-3">
            {errores.general}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {[
            { label: 'Nombre de Usuario', name: 'nombre_usuario', type: 'text' },
            { label: 'Nombre', name: 'nombre', type: 'text' },
            { label: 'Apellido Paterno', name: 'apellido_paterno', type: 'text' },
            { label: 'Apellido Materno', name: 'apellido_materno', type: 'text' },
            { label: 'Teléfono', name: 'telefono', type: 'text' },
            { label: 'Correo Electrónico', name: 'correo', type: 'email' },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">
                {label}
              </label>
              <input
                type={type}
                name={name}
                value={datos[name] || ''}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
              />
            </div>
          ))}

          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition font-semibold"
            >
              Guardar cambios
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition font-medium"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ActualizarPerfil;
