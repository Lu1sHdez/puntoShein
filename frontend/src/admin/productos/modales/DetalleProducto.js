import React from 'react';
import { FaTag, FaDollarSign, FaPalette, FaBox, FaCalendarAlt } from 'react-icons/fa'; // Importar iconos

const ModalDetalle = ({ visible, producto, onClose }) => {
  if (!producto) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${visible ? 'block' : 'hidden'} transition-opacity duration-300`}
    >
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full md:w-3/4 lg:w-2/3 max-w-6xl transition-transform transform scale-95 hover:scale-100">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-semibold text-pink-600">Detalles del Producto</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold text-2xl"
          >
            &times;
          </button>
        </div>

        {/* Contenedor principal de imagen y detalles */}
        <div className="flex flex-col lg:flex-row space-x-8">
          {/* Imagen del Producto */}
          <div className="lg:w-1/3 flex justify-center mb-6 lg:mb-0">
            <img
              src={producto.imagen}
              alt={producto.nombre}
              className="w-full max-w-md rounded-xl shadow-xl"
            />
          </div>

          {/* Detalles del Producto */}
          <div className="lg:w-2/3 space-y-6">
            <div className="grid grid-cols-2 gap-8 text-lg">
              <div className="flex items-center">
                <FaTag className="text-pink-500 mr-2" />
                <strong className="text-gray-800">Nombre:</strong>
                <p className="text-gray-700 ml-2">{producto.nombre}</p>
              </div>

              <div className="flex items-center">
                <FaDollarSign className="text-green-600 mr-2" />
                <strong className="text-gray-800">Precio:</strong>
                <p className="text-gray-700 ml-2">${producto.precio}</p>
              </div>

              <div className="flex items-center">
                <FaPalette className="text-gray-500 mr-2" />
                <strong className="text-gray-800">Color:</strong>
                <p className="text-gray-700 ml-2">{producto.color}</p>
              </div>

              <div className="flex items-center">
                <FaBox className="text-yellow-500 mr-2" />
                <strong className="text-gray-800">Stock Total:</strong>
                <p className="text-gray-700 ml-2">{producto.stock}</p>
              </div>

              <div className="flex items-center">
                <FaCalendarAlt className="text-blue-500 mr-2" />
                <strong className="text-gray-800">Fecha de Creación:</strong>
                <p className="text-gray-700 ml-2">{new Date(producto.fecha_creacion).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Categoria y Subcategoría */}
            <div className="grid grid-cols-2 gap-8 text-lg">
              <div className="flex items-center">
                <FaTag className="text-pink-500 mr-2" />
                <strong className="text-gray-800">Categoría:</strong>
                <p className="text-gray-700 ml-2">{producto.subcategoria?.categoria?.nombre || "N/A"}</p>
              </div>

              <div className="flex items-center">
                <FaTag className="text-pink-500 mr-2" />
                <strong className="text-gray-800">Subcategoría:</strong>
                <p className="text-gray-700 ml-2">{producto.subcategoria?.nombre || "N/A"}</p>
              </div>
            </div>

            {/* Tallas Disponibles */}
            <div className="text-lg">
              <strong className="text-gray-800">Tallas Disponibles:</strong>
              {producto.tallas.length > 0 ? (
                <ul className="mt-2 space-y-2">
                  {producto.tallas.map((talla) => (
                    <li key={talla.id} className="flex justify-between text-gray-700">
                      <span>{talla.nombre}</span>
                      <span>{talla.stock} unidades</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-700">No hay tallas disponibles para este producto.</p>
              )}
            </div>
          </div>
        </div>

        {/* Botón Cerrar */}
        <div className="mt-8 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 focus:outline-none transition-all duration-200 transform hover:scale-105"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalle;
