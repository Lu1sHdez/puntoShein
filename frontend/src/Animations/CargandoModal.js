import React from "react";
import ReactDOM from "react-dom";
import { FaSpinner } from "react-icons/fa";

const CargandoModal = ({ mensaje = "Procesando...", visible }) => {
  if (!visible) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-blue-50/60 backdrop-blur-md">
      <div className="flex flex-col items-center justify-center gap-4 p-8 
                      bg-white rounded-2xl shadow-2xl w-72 border border-blue-100 
                      animate-fade-in-up">
        {/* Spinner animado */}
        <div className="relative">
          <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
          <FaSpinner className="animate-spin text-blue-600 text-4xl relative z-10" />
        </div>

        {/* Texto */}
        <p className="text-center text-gray-700 text-base font-semibold">
          {mensaje}
        </p>

        {/* Barra de carga sutil */}
        <div className="w-32 h-1.5 bg-blue-100 rounded-full overflow-hidden mt-2">
          <div className="h-full bg-blue-600 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  // 🔹 Monta el modal en el body para que siempre esté sobre todo
  return ReactDOM.createPortal(modalContent, document.body);
};

export default CargandoModal;
