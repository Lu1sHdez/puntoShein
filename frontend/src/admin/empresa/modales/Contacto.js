import React, { useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { API_URL } from "../../../ApiConexion.js";
import { mostrarNotificacion } from "../../../Animations/NotificacionSwal.js";

const ModalEditarContacto = ({ empresa, onClose, onActualizar }) => {
  const [contacto, setContacto] = useState({
    correo: empresa?.correo || "",
    telefono: empresa?.telefono || ""
  });

  const [guardando, setGuardando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setContacto({ ...contacto, [name]: value });
  };

  const handleGuardar = async () => {
    setGuardando(true);
    try {
      await axios.put(`${API_URL}/api/empresa/empresa`, { ...empresa, ...contacto }, {
        withCredentials: true
      });
      mostrarNotificacion("success", "Contacto actualizado correctamente");
      onActualizar();
      onClose();
    } catch (error) {
      console.error("Error al actualizar el contacto:", error);
      mostrarNotificacion("error", "Error al actualizar el contacto");
    } finally {
      setGuardando(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[95%] max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Editar Contacto</h2>

        <div className="space-y-4">
          <div>
            <label className="block font-semibold">Correo electrónico:</label>
            <input
              name="correo"
              type="email"
              value={contacto.correo}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          <div>
            <label className="block font-semibold">Teléfono:</label>
            <input
              name="telefono"
              type="text"
              value={contacto.telefono}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
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
      </div>
    </div>,
    document.body
  );
};

export default ModalEditarContacto;
