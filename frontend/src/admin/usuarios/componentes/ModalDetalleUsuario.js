import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { API_URL } from '../../../ApiConexion';
import CargandoModal from '../../../Animations/CargandoModal';

const ModalDetalleUsuario = ({ visible, userId, onClose }) => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (visible && userId) {
      setLoading(true);
      setUsuario(null);
      const fetchUsuario = async () => {
        try {
          const response = await axios.get(`${API_URL}/api/admin/usuarios/${userId}`, {
            withCredentials: true,
          });
          setUsuario(response.data);
        } catch (err) {
          setError('Error al obtener los detalles del usuario');
        } finally {
          setLoading(false);
        }
      };
      fetchUsuario();
    }
  }, [visible, userId]);

  if (!visible) return null;

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-xl w-[90%] max-w-3xl h-[80vh] overflow-y-auto relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
          Detalles del Usuario
        </h2>

        {loading ? (
          <CargandoModal visible={true} mensaje="Cargando usuario..." />
        ) : error ? (
          <div className="text-red-600 text-center">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-gray-700 text-base">
            <div>
              <strong>ID:</strong> {usuario.id}
            </div>
            <div>
              <strong>Nombre de Usuario:</strong> {usuario.nombre_usuario}
            </div>
            <div>
              <strong>Nombre:</strong> {usuario.nombre}
            </div>
            <div>
              <strong>Apellido Paterno:</strong> {usuario.apellido_paterno}
            </div>
            <div>
              <strong>Apellido Materno:</strong> {usuario.apellido_materno}
            </div>
            <div>
              <strong>Teléfono:</strong> {usuario.telefono}
            </div>
            <div>
              <strong>Correo Electrónico:</strong> {usuario.correo}
            </div>
            <div>
              <strong>Rol:</strong> {usuario.rol}
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalDetalleUsuario;
