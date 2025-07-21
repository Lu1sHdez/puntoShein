import React, { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import ModalMensaje from "../../../modal/Modal";
import CargandoModal from "../../../Animations/CargandoModal";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";

const TablaOpiniones = ({ opiniones, actualizarListado }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [estadoSeleccionado, setEstadoSeleccionado] = useState(null);
  const [idSeleccionado, setIdSeleccionado] = useState(null);
  const [cargando, setCargando] = useState(false); // ← Nuevo estado

  const confirmarCambioEstado = (id, estado) => {
    setIdSeleccionado(id);
    setEstadoSeleccionado(estado);
    setModalVisible(true);
  };

  const ejecutarCambioEstado = async () => {
    setModalVisible(false);
    setCargando(true); // ← Mostrar modal de carga
    try {
      await axios.put(
        `${API_URL}/api/opinion/actualizar/${idSeleccionado}`,
        { estado: estadoSeleccionado },
        { withCredentials: true }
      );
      await actualizarListado();
    } catch (error) {
      console.error("Error al actualizar estado:", error);
    } finally {
      setCargando(false); // ← Ocultar modal de carga
    }
  };

  return (
    <>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white text-sm text-gray-800">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="px-4 py-3 border">Correo</th>
              <th className="px-4 py-3 border">Nombre</th>
              <th className="px-4 py-3 border">Mensaje</th>
              <th className="px-4 py-3 border text-center">Estado</th>
              <th className="px-4 py-3 border text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {opiniones.map((op, index) => (
              <tr key={op.id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="px-4 py-3 border break-words">{op.correo}</td>
                <td className="px-4 py-3 border break-words">{op.nombre}</td>
                <td className="px-4 py-3 border break-words">{op.mensaje}</td>
                <td className="px-4 py-3 border text-center">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-semibold rounded-full text-white ${
                      op.estado === "aprobada"
                        ? "bg-green-500"
                        : op.estado === "rechazada"
                        ? "bg-red-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {op.estado}
                  </span>
                </td>
                <td className="px-4 py-3 border text-center">
                  <div className="flex flex-col items-center space-y-2">
                    {op.estado !== "aprobada" && (
                      <button
                        onClick={() => confirmarCambioEstado(op.id, "aprobada")}
                        className="flex items-center gap-1 px-3 py-1 text-white bg-blue-500 hover:bg-blue-600 rounded-full text-xs font-medium transition"
                      >
                        <FaCheckCircle className="text-sm" />
                        Aprobar
                      </button>
                    )}
                    {op.estado !== "rechazada" && (
                      <button
                        onClick={() => confirmarCambioEstado(op.id, "rechazada")}
                        className="flex items-center gap-1 px-3 py-1 text-white bg-red-500 hover:bg-red-600 rounded-full text-xs font-medium transition"
                      >
                        <FaTimesCircle className="text-sm" />
                        Rechazar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ModalMensaje
        visible={modalVisible}
        tipo="advertencia"
        titulo="Confirmar cambio de estado"
        mensaje={`¿Estás seguro que deseas marcar la opinión como "${estadoSeleccionado}"?`}
        mostrarCancelar={true}
        onCancelar={() => setModalVisible(false)}
        onConfirmar={ejecutarCambioEstado}
        textoConfirmar="Sí, cambiar"
        textoCancelar="Cancelar"
      />

      <CargandoModal visible={cargando} mensaje="Actualizando estado..." />
    </>
  );
};

export default TablaOpiniones;
