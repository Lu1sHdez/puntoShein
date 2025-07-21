// src/components/modales/ModalMensaje.jsx

import React from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";

const iconos = {
  exito: <FaCheckCircle className="text-green-500 text-5xl mb-4" />,
  error: <FaTimesCircle className="text-red-500 text-5xl mb-4" />,
  advertencia: <FaExclamationTriangle className="text-yellow-500 text-5xl mb-4" />,
  info: <FaInfoCircle className="text-blue-500 text-5xl mb-4" />,
};

const ModalMensaje = ({
  visible,
  tipo = "info", // exito, error, advertencia, info
  titulo = "",
  mensaje = "",
  onConfirmar,
  onCancelar,
  mostrarCancelar = false,
  textoConfirmar = "Aceptar",
  textoCancelar = "Cancelar",
}) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-8 w-96 max-w-sm text-center">
        <div className="flex justify-center">
            {iconos[tipo] || iconos.info }
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">{titulo}</h2>
        <p className="text-gray-600 mb-6">{mensaje}</p>
        <div className="flex justify-center gap-4">
          {mostrarCancelar && (
            <button
              onClick={onCancelar}
              className="btn-secundario"
            >
              {textoCancelar}
            </button>
          )}
          <button
            onClick={onConfirmar}
            className="btn-principal"
          >
            {textoConfirmar}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalMensaje;
