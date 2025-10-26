import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";
import ModalDetalleUsuario from "./ModalDetalleUsuario";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";
import { mostrarNotificacion } from "../../../Animations/NotificacionSwal";

const AdministradoresTabla = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [modalDetalleVisible, setModalDetalleVisible] = useState(false);
  const [usuarioSeleccionadoId, setUsuarioSeleccionadoId] = useState(null);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/admin/usuarios?rol=administrador`,
          { withCredentials: true }
        );
        setUsuarios(res.data);
      } catch (error) {
        console.error("Error al obtener administradores:", error);
        mostrarNotificacion("error", "No se pudieron cargar los administradores.");
      }
    };
    fetchUsuarios();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="overflow-x-auto bg-white shadow-md rounded-2xl border border-gray-100 p-4 sm:p-6 mb-10 animate-fade-in-up"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
          Administradores
        </h2>
        <span className="text-sm text-gray-500 font-medium">
          Total: {usuarios.length}
        </span>
      </div>

      <table className="min-w-full text-left text-sm border-separate border-spacing-y-2">
        <thead className="bg-blue-50 text-blue-700 uppercase text-xs tracking-wider">
          <tr>
            <th className="px-4 py-3 rounded-l-lg">Nombre</th>
            <th className="px-4 py-3">Correo</th>
            <th className="px-4 py-3 text-center rounded-r-lg">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario) => (
              <tr
                key={usuario.id}
                className="bg-white hover:bg-blue-50 transition-all duration-200 shadow-sm rounded-lg"
              >
                <td className="px-4 py-3 font-medium text-gray-700">
                  {usuario.nombre}
                </td>
                <td className="px-4 py-3 text-gray-600">{usuario.correo}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => {
                      setUsuarioSeleccionadoId(usuario.id);
                      setModalDetalleVisible(true);
                    }}
                    className="btn-principal flex items-center gap-2 px-3 py-1 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan="3"
                className="text-center text-gray-500 py-6 italic bg-gray-50 rounded-lg"
              >
                No hay administradores registrados.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal detalle */}
      {modalDetalleVisible && (
        <ModalDetalleUsuario
          visible={modalDetalleVisible}
          userId={usuarioSeleccionadoId}
          onClose={() => setModalDetalleVisible(false)}
        />
      )}
    </motion.div>
  );
};

export default AdministradoresTabla;
