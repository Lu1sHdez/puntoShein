import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import RegresarButton from '../../components/Regresar.js';  // Importamos el botón

const UsuarioDetalles = () => {
  const { id } = useParams();  // Obtén el ID del usuario desde la URL
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        // Realiza la solicitud para obtener los detalles del usuario
        const response = await axios.get(`http://localhost:4000/api/admin/usuarios/${id}`, {
          withCredentials: true,
        });
        setUsuario(response.data);  // Guarda los detalles del usuario
      } catch (error) {
        setError('Error al obtener los detalles del usuario');
        console.error('Error al obtener los detalles:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();  // Llama a la función para obtener los detalles
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Cargando...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-700 mb-6">Detalles del Usuario</h1>

        {/* Detalles del usuario */}
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
            <span className="text-gray-600 font-medium">Apellido Paterno:</span>
            <span className="text-gray-800">{usuario.apellido_paterno}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Apellido Materno:</span>
            <span className="text-gray-800">{usuario.apellido_materno}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Teléfono:</span>
            <span className="text-gray-800">{usuario.telefono}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Correo Electrónico:</span>
            <span className="text-gray-800">{usuario.correo}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 font-medium">Rol:</span>
            <span className="text-gray-800">{usuario.rol}</span>
          </div>
        </div>

        {/* Botón de regresar */}
        <div className="mt-6 text-center">
          <RegresarButton />
        </div>
      </div>
    </div>
  );
};

export default UsuarioDetalles;
