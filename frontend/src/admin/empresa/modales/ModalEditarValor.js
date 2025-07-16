import React, { useState } from "react";
import { createPortal } from "react-dom";
import CargandoModal from "../../../Animations/CargandoModal";

const ModalEditarValor = ({ visible, valorInicial, onClose, onGuardar }) => {
  const [valor, setValor] = useState(valorInicial);
  const [guardando, setGuardando] = useState(false);

  const handleGuardar = () => {
    setGuardando(true);
    setTimeout(() => {
      onGuardar(valor);
      setGuardando(false);
      onClose();
    }, 800);
  };

  if (!visible) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[95%] max-w-xl">
        <h2 className="text-xl font-semibold mb-4 text-center">Editar Valor</h2>
        <div className="mb-4">
          <label className="block font-medium mb-1">Nombre</label>
          <input
            type="text"
            value={valor.nombre}
            onChange={(e) => setValor({ ...valor, nombre: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Descripción</label>
          <textarea
            rows={3}
            value={valor.descripcion}
            onChange={(e) => setValor({ ...valor, descripcion: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">Cancelar</button>
          <button onClick={handleGuardar} className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">
            {guardando ? "Guardando..." : "Guardar"}
          </button>
        </div>

        {guardando && <CargandoModal visible={true} mensaje="Guardando cambios..." />}
      </div>
    </div>,
    document.body
  );
};

export default ModalEditarValor;
