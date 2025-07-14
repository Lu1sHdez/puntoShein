import React from 'react';
import { createPortal } from 'react-dom';

const coloresRapidos = [
  '#FF0000', '#00FF00', '#0000FF',
  '#FFFF00', '#FF00FF', '#00FFFF',
  '#000000', '#FFFFFF', '#808080',
];

const ModalColor = ({ visible, onClose, onSeleccionarColor }) => {
  if (!visible) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-md w-96">
        <h2 className="text-xl font-bold text-center mb-4">Selecciona un color</h2>

        <div className="grid grid-cols-5 gap-3 mb-4">
          {coloresRapidos.map((color) => (
            <button
              key={color}
              style={{ backgroundColor: color }}
              className="w-10 h-10 rounded-full border-2 border-gray-300 hover:scale-110 transition"
              onClick={() => {
                onSeleccionarColor(color);
                onClose();
              }}
            />
          ))}
        </div>

        <div className="mt-4">
          <label className="block mb-1 text-sm text-gray-600">¿Color personalizado?</label>
          <input
            type="color"
            className="w-full h-10"
            onChange={(e) => {
              onSeleccionarColor(e.target.value);
              onClose();
            }}
          />
        </div>

        <button
          className="mt-4 w-full py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ModalColor;
