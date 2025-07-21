import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../ApiConexion';
import ModalDetalleUsuario from './ModalDetalleUsuario';
import { mostrarNotificacion } from '../../../Animations/NotificacionSwal';

const AdministradoresTabla = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [modalDetalleVisible, setModalDetalleVisible] = useState(false);
  const [usuarioSeleccionadoId, setUsuarioSeleccionadoId] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/admin/usuarios?rol=administrador`, {
          withCredentials: true,
        });
        setUsuarios(res.data);
      } catch (error) {
        console.error("Error al obtener usuarios:", error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div className="overflow-x-auto shadow rounded-lg mb-10">
      <h2 className="text-xl font-semibold mb-2">Administradores</h2>
      <table className="min-w-full bg-white">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="px-4 py-3">Nombre</th>
            <th className="px-4 py-3">Correo</th>
            <th className="px-4 py-3">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="border-t">
              <td className="px-4 py-2">{usuario.nombre}</td>
              <td className="px-4 py-2">{usuario.correo}</td>
              <td className="px-4 py-2 space-x-3">
                <button
                  onClick={() => {
                    setUsuarioSeleccionadoId(usuario.id);
                    setModalDetalleVisible(true);
                  }}
                  className="text-green-600 hover:underline"
                >
                  Ver detalles
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ModalDetalleUsuario
        visible={modalDetalleVisible}
        userId={usuarioSeleccionadoId}
        onClose={() => setModalDetalleVisible(false)}
      />
    </div>
  );
};

export default AdministradoresTabla;
