import React, { useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { API_URL } from "../../../ApiConexion.js";
import { mostrarNotificacion } from "../../../Animations/NotificacionSwal.js";

const ModalEditarValores = ({ empresa, onClose, onActualizar }) => {
  const [valores, setValores] = useState(empresa?.valores || []);
  const [guardando, setGuardando] = useState(false);

  const handleValorChange = (index, e) => {
    const { name, value } = e.target;
    const nuevosValores = [...valores];
    nuevosValores[index][name] = value;
    setValores(nuevosValores);
  };

  const addValor = () => {
    setValores([...valores, { nombre: "", descripcion: "" }]);
  };

  const removeValor = (index) => {
    const nuevosValores = valores.filter((_, i) => i !== index);
    setValores(nuevosValores);
  };

  const handleGuardar = async () => {
    setGuardando(true);
    try {
      await axios.put(`${API_URL}/api/empresa/empresa`, {
        ...empresa,
        valores
      }, { withCredentials: true });

      mostrarNotificacion("success", "Valores actualizados correctamente");
      onActualizar();
      onClose();
    } catch (error) {
      console.error("Error al actualizar valores:", error);
      mostrarNotificacion("error", "Error al actualizar valores");
    } finally {
      setGuardando(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[95%] max-w-3xl h-[90vh] overflow-y-auto relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Editar Valores Institucionales</h2>

        {valores.map((valor, index) => (
          <div key={index} className="mb-4 border p-3 rounded-md bg-gray-50">
            <input
              name="nombre"
              value={valor.nombre}
              onChange={(e) => handleValorChange(index, e)}
              placeholder="Nombre del valor"
              className="w-full mb-2 p-2 border rounded-md"
            />
            <textarea
              name="descripcion"
              value={valor.descripcion}
              onChange={(e) => handleValorChange(index, e)}
              placeholder="Descripción del valor"
              className="w-full p-2 border rounded-md"
            />
            <button
              type="button"
              onClick={() => removeValor(index)}
              className="text-red-500 mt-2"
            >
              Eliminar valor
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addValor}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition mb-6"
        >
          Agregar valor
        </button>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            disabled={guardando}
            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
          >
            {guardando ? "Guardando..." : "Guardar"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalEditarValores;
