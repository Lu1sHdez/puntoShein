import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { mostrarNotificacion } from '../../Animations/NotificacionSwal';
import { API_URL } from '../../ApiConexion';

const ActualizarPerfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [datos, setDatos] = useState({});
  const [errores, setErrores] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/empleado/perfil`, { withCredentials: true });
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
          navigate('/login'); // Si no está autenticado, redirigir al login
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

    // Verificar que todos los campos sean completados
    if (!datos.nombre_usuario || !datos.nombre || !datos.apellido_paterno || !datos.telefono || !datos.correo) {
      setErrores({ general: 'Todos los campos son obligatorios.' });
      return;
    }

    try {
      // Enviar los datos actualizados al backend
      await axios.put(`${API_URL}/api/empleado/perfil`, datos, { withCredentials: true });
      
      mostrarNotificacion("success", "¡Perfil actualizado!");

      navigate('/empleado/perfil'); // Redirigir al perfil actualizado
    } catch (error) {
      setErrores({ general: error.response?.data?.mensaje || 'Error al actualizar el perfil.' });
    }
  };

  const cancelarEdicion =() =>{
    navigate('/empleado/perfil')
  }

  if (!usuario) return <div>Cargando...</div>; // Mientras se obtiene el perfil

  return (
    <div className="flex items-center justify-center mt-0 py-8 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Editar Perfil</h1>

        {/* Mostrar mensaje de error si existe */}
        {errores.general && <p className="text-red-500 text-sm text-center mb-2">{errores.general}</p>}

        <form onSubmit={handleSubmit}>
          {[ // Mapeo dinámico para mostrar los campos ]
            { label: "Nombre de Usuario", name: "nombre_usuario", type: "text" },
            { label: "Nombre", name: "nombre", type: "text" },
            { label: "Apellido Paterno", name: "apellido_paterno", type: "text" },
            { label: "Apellido Materno", name: "apellido_materno", type: "text" },
            { label: "Teléfono", name: "telefono", type: "text" },
            { label: "Correo Electrónico", name: "correo", type: "email" },
          ].map(({ label, name, type }) => (
            <div key={name} className="mb-4">
              <label className="block text-sm font-medium text-gray-600">{label}</label>
              <input
                type={type}
                name={name}
                value={datos[name]}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400"
              />
            </div>
          ))}

          <div className="flex space-x-4">
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
            >
              Guardar cambios
            </button>
            <button
              type="button"
              onClick={cancelarEdicion}
              className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActualizarPerfil;
