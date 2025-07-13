import React, { useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { mostrarNotificacion } from "../../../Animations/NotificacionSwal.js";
import { API_URL } from "../../../ApiConexion.js";

const ModalEditarEmpresa = ({ empresa, onClose, onActualizar }) => {
  const [formulario, setFormulario] = useState({ ...empresa });
  const [guardando, setGuardando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormulario({ ...formulario, [name]: value });
  };

  const handleValorChange = (index, e) => {
    const { name, value } = e.target;
    const updatedValores = [...formulario.valores];
    updatedValores[index][name] = value;
    setFormulario({ ...formulario, valores: updatedValores });
  };

  const addValor = () => {
    setFormulario({
      ...formulario,
      valores: [...formulario.valores, { nombre: "", descripcion: "" }],
    });
  };

  const removeValor = (index) => {
    const nuevos = formulario.valores.filter((_, i) => i !== index);
    setFormulario({ ...formulario, valores: nuevos });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setGuardando(true);
    try {
      await axios.put(`${API_URL}/api/empresa/empresa`, formulario, {
        withCredentials: true,
      });
      mostrarNotificacion("success", "Datos actualizados correctamente");
      onActualizar();
      onClose();
    } catch (error) {
      mostrarNotificacion("error", "Error al actualizar los datos");
      console.error(error);
    } finally {
      setGuardando(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[95%] max-w-3xl h-[90vh] overflow-y-auto relative">
        <h2 className="text-2xl font-bold mb-6 text-center text-pink-600">Editar Información de la Empresa</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Campo: Nombre */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
            <input type="text" name="nombre" value={formulario.nombre} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>

          {/* Campo: Misión */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Misión:</label>
            <textarea name="mision" value={formulario.mision} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>

          {/* Campo: Visión */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Visión:</label>
            <textarea name="vision" value={formulario.vision} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>

          {/* Campo: Historia */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Historia:</label>
            <textarea name="historia" value={formulario.historia} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>

          {/* Campo: Equipo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Equipo:</label>
            <textarea name="equipo" value={formulario.equipo} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>

          {/* Campo: Correo */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo electrónico:</label>
            <input type="email" name="correo" value={formulario.correo} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>

          {/* Campo: Teléfono */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono:</label>
            <input type="text" name="telefono" value={formulario.telefono} onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2" />
          </div>

          {/* Valores */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Valores:</label>
            {formulario.valores.map((valor, index) => (
              <div key={index} className="border p-3 rounded-md mb-2 bg-gray-50">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre del valor"
                  value={valor.nombre}
                  onChange={(e) => handleValorChange(index, e)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 mb-2"
                />
                <textarea
                  name="descripcion"
                  placeholder="Descripción del valor"
                  value={valor.descripcion}
                  onChange={(e) => handleValorChange(index, e)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2"
                />
                <button
                  type="button"
                  onClick={() => removeValor(index)}
                  className="text-sm text-red-600 mt-2 hover:underline"
                >
                  Eliminar
                </button>
              </div>
            ))}
            <button type="button" onClick={addValor}
              className="mt-2 px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm">
              Agregar otro valor
            </button>
          </div>

          {/* Botones */}
          <div className="flex justify-end gap-4 mt-6">
            <button type="button" onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition">
              Cancelar
            </button>
            <button type="submit" disabled={guardando}
              className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition">
              {guardando ? "Guardando..." : "Guardar Cambios"}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default ModalEditarEmpresa;
