import React from 'react';

const ModalConfirmacionEliminar = ({ visible, onClose, onConfirm, producto }) => {
  if (!visible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-4/5 sm:w-96 max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Confirmar eliminación</h2>
        
        <p className="text-lg text-gray-700 mb-4">
          ¿Estás seguro de que deseas eliminar el producto <strong>{producto?.nombre}</strong>? Esta acción no se puede deshacer.
        </p>

        <div className="flex justify-between space-x-4">
          {/* Botón para confirmar la eliminación */}
          <button
            onClick={() => {
              onConfirm();  // Ejecutar la acción de eliminar
              onClose();  // Cerrar el modal
            }}
            className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200"
          >
            Eliminar
          </button>

          {/* Botón para cancelar la eliminación */}
          <button
            onClick={onClose}
            className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-all duration-200"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalConfirmacionEliminar;
