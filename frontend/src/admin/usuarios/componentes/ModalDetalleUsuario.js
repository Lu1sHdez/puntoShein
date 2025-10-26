import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";
import CargandoModal from "../../../Animations/CargandoModal";
import { motion } from "framer-motion";
import { X } from "lucide-react";

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
          setError("Error al obtener los detalles del usuario");
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
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-[90%] max-w-3xl h-[80vh] overflow-y-auto relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
          aria-label="Cerrar modal"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Detalles del Usuario
        </h2>

        {loading ? (
          <CargandoModal visible={true} mensaje="Cargando usuario..." />
        ) : error ? (
          <div className="text-red-600 text-center font-medium">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-gray-700 text-base">
            <div>
              <span className="font-semibold text-gray-800">ID:</span> {usuario.id}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Usuario:</span>{" "}
              {usuario.nombre_usuario}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Nombre:</span>{" "}
              {usuario.nombre}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Apellido Paterno:</span>{" "}
              {usuario.apellido_paterno}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Apellido Materno:</span>{" "}
              {usuario.apellido_materno}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Teléfono:</span>{" "}
              {usuario.telefono}
            </div>
            <div>
              <span className="font-semibold text-gray-800">
                Correo Electrónico:
              </span>{" "}
              {usuario.correo}
            </div>
            <div>
              <span className="font-semibold text-gray-800">Rol:</span>{" "}
              <span
                className={`px-2 py-1 rounded-md text-sm font-semibold ${
                  usuario.rol === "administrador"
                    ? "bg-blue-100 text-blue-700"
                    : usuario.rol === "empleado"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {usuario.rol}
              </span>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <button onClick={onClose} className="btn-secundario px-6 py-2">
            Cerrar
          </button>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default ModalDetalleUsuario;
