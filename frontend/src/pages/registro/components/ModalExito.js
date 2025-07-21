import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const ModalExito = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-8 w-80 flex flex-col items-center text-center">
        <FaCheckCircle className="text-green-500 text-5xl mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">¡Registro exitoso!</h2>
        <p className="text-gray-600 mb-6">
          Tu cuenta ha sido creada correctamente. Ya puedes iniciar sesión.
        </p>
        <button
          onClick={onClose}
          className="btn-principal w-full"
        >
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default ModalExito;
