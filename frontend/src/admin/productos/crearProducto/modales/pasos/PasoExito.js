import React from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const PasoExito = ({ onClose }) => {
  return (
    <div className="text-center space-y-6">
      <CheckCircleIcon className="h-24 w-24 text-green-500 mx-auto" />

      <h3 className="text-2xl font-bold text-gray-800">¡Producto creado exitosamente!</h3>
      <p className="text-gray-600">
        El nuevo producto se ha registrado correctamente en el sistema.
      </p>

      <button
        onClick={onClose}
        className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
      >
        Finalizar
      </button>
    </div>
  );
};

export default PasoExito;
