import React from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';

const DetallesProducto = ({ visible, onClose, producto }) => {
  if (!visible || !producto) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        className="bg-white rounded-xl shadow-xl max-w-3xl w-full p-8 relative"
      >
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Detalles del Producto</h2>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/2 flex justify-center items-center">
            <img
              src={producto.imagen}
              alt="Producto"
              className="w-full max-h-72 object-contain rounded shadow"
            />
          </div>

          <div className="md:w-1/2 space-y-2 text-gray-700">
            <p><strong>Nombre:</strong> {producto.nombre}</p>
            <p><strong>Descripción:</strong> {producto.descripcion}</p>
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p><strong>Color:</strong> {producto.color}</p>
            <p><strong>Stock:</strong> {producto.stock}</p>
            <p><strong>Categoría:</strong> {producto.subcategoria?.categoria?.nombre || 'N/A'}</p>
            <p><strong>Subcategoría:</strong> {producto.subcategoria?.nombre || 'N/A'}</p>
          </div>
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

export default DetallesProducto;
