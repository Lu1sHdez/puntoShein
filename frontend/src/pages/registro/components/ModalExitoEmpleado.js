import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const ModalExitoEmpleado = ({ visible, onClose }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-xl p-8 w-96 flex flex-col items-center text-center">
        <FaCheckCircle className="text-green-500 text-5xl mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Registro exitoso!</h2>
        <p className="text-gray-700 mb-6">
          Tu cuenta como empleado ha sido creada correctamente.<br />
          Ya puedes iniciar sesión y comenzar a utilizar el sistema.
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

export default ModalExitoEmpleado;
