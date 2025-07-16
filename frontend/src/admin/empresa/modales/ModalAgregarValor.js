import React, { useState } from "react";
import { createPortal } from "react-dom";
import CargandoModal from "../../../Animations/CargandoModal";

const ModalAgregarValor = ({ visible, onClose, onAgregar }) => {
  const [nuevoValor, setNuevoValor] = useState({ nombre: "", descripcion: "" });
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNuevoValor({ ...nuevoValor, [name]: value });
  };

  const handleAgregar = () => {
    if (!nuevoValor.nombre.trim() || !nuevoValor.descripcion.trim()) return;

    setCargando(true);
    setTimeout(() => {
      onAgregar(nuevoValor);
      onClose();
      setCargando(false);
    }, 1000);
  };

  if (!visible) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg">
        <h3 className="text-xl font-semibold mb-4 text-center">Agregar nuevo valor</h3>

        <div className="space-y-3">
          <input
            name="nombre"
            value={nuevoValor.nombre}
            onChange={handleChange}
            placeholder="Nombre del valor"
            className="w-full border p-2 rounded-md"
          />
          <textarea
            name="descripcion"
            value={nuevoValor.descripcion}
            onChange={handleChange}
            placeholder="Descripción del valor"
            className="w-full border p-2 rounded-md"
            rows={4}
          />
        </div>

        <div className="flex justify-end mt-6 gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleAgregar}
            className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
            disabled={cargando}
          >
            {cargando ? "Agregando..." : "Agregar"}
          </button>
        </div>

        {cargando && <CargandoModal visible={cargando} mensaje="Agregando valor..." />}
      </div>
    </div>,
    document.body
  );
};

export default ModalAgregarValor;
