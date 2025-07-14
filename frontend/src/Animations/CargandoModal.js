import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const CargandoModal = ({ mensaje = "Procesando...", visible }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-sm">
      <div className="flex flex-col items-center justify-center gap-4 p-8 bg-white dark:bg-white-900 rounded-2xl shadow-2xl w-72">
        <FaSpinner className="animate-spin text-pink-500 text-4xl" />
        <p className="text-center text-gray-800 dark:text-black text-base font-medium">
          {mensaje}
        </p>
      </div>
    </div>
  );
};

export default CargandoModal;
