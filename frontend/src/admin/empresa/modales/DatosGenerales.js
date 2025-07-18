import React, { useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { API_URL } from "../../../ApiConexion.js";
import { mostrarNotificacion } from "../../../Animations/NotificacionSwal.js";
import CargandoModal from "../../../Animations/CargandoModal.js";

const ModalEditarDatosBasicos = ({ empresa, onClose, onActualizar }) => {
  const [datos, setDatos] = useState({
    nombre: empresa?.nombre || "",
    mision: empresa?.mision || "",
    vision: empresa?.vision || "",
    historia: empresa?.historia || "",
    equipo: empresa?.equipo || ""
  });

  const [guardando, setGuardando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos({ ...datos, [name]: value });
  };

  const handleGuardar = async () => {
    setGuardando(true);
    try {
      await axios.put(`${API_URL}/api/empresa/empresa`, { ...empresa, ...datos }, {
        withCredentials: true
      });
      onActualizar();
      onClose();
    } catch (error) {
      console.error("Error al actualizar los datos:", error);
      mostrarNotificacion("error", "Error al actualizar los datos");
    } finally {
      setGuardando(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg w-[95%] max-w-4xl max-h-[85vh] overflow-y-auto p-6 relative">
        <h2 className="text-2xl font-bold mb-6 text-center">Editar Datos Básicos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-semibold">Nombre:</label>
            <input
              name="nombre"
              value={datos.nombre}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold">Misión:</label>
            <textarea
              name="mision"
              value={datos.mision}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              rows={3}
            />
          </div>

          <div>
            <label className="block font-semibold">Visión:</label>
            <textarea
              name="vision"
              value={datos.vision}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              rows={3}
            />
          </div>

          <div>
            <label className="block font-semibold">Historia:</label>
            <textarea
              name="historia"
              value={datos.historia}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              rows={4}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold">Equipo:</label>
            <textarea
              name="equipo"
              value={datos.equipo}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
              rows={3}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            disabled={guardando}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {guardando ? "Guardando..." : "Guardar"}
          </button>
        </div>

        {/* Modal de carga */}
        {guardando && (
          <CargandoModal
            visible={guardando}
            mensaje="Guardando cambios..."
          />
        )}
      </div>
    </div>,
    document.body
  );
};

export default ModalEditarDatosBasicos;
