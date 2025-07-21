import React from 'react';
import {
  FaTag,
  FaDollarSign,
  FaPalette,
  FaBox,
  FaCalendarAlt,
  FaInfoCircle,
} from 'react-icons/fa';

const ModalDetalle = ({ visible, producto, onClose }) => {
  if (!producto) return null;

  return (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 ${
        visible ? 'block' : 'hidden'
      }`}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full md:w-11/12 lg:w-4/5 max-w-6xl overflow-hidden transition-transform transform scale-95 hover:scale-100">
        {/* Scroll interno con altura limitada */}
        <div className="max-h-[90vh] overflow-y-auto p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-semibold text-black">
              Detalles del Producto
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 font-bold text-3xl"
            >
              &times;
            </button>
          </div>

          {/* Contenido principal horizontal */}
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Columna Izquierda: Imagen + Tallas */}
            <div className="lg:w-1/3 space-y-6">
              {/* Imagen */}
              <div>
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full rounded-xl shadow-md object-cover"
                />
              </div>

              {/* Tallas */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2 border-b pb-1">
                  Tallas Disponibles
                </h3>
                {producto.tallas.length > 0 ? (
                  <ul className="space-y-2 text-sm">
                    {producto.tallas.map((talla) => (
                      <li
                        key={talla.id}
                        className="flex justify-between text-gray-700 border-b pb-1"
                      >
                        <span>{talla.nombre}</span>
                        <span>{talla.stock} unidades</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-700">No hay tallas disponibles.</p>
                )}
              </div>
            </div>

            {/* Columna Derecha: Información */}
            <div className="lg:w-2/3 space-y-8">
              {/* Información General */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                  Información General
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                  <div className="flex items-center">
                    <FaTag className="text-blue-500 mr-2" />
                    <strong className="text-gray-800 mr-1">Nombre:</strong>
                    <span className="text-gray-700">{producto.nombre}</span>
                  </div>
                  <div className="flex items-center">
                    <FaDollarSign className="text-green-600 mr-2" />
                    <strong className="text-gray-800 mr-1">Precio:</strong>
                    <span className="text-gray-700">${producto.precio}</span>
                  </div>
                  <div className="flex items-center">
                    <FaPalette className="text-gray-500 mr-2" />
                    <strong className="text-gray-800 mr-1">Color:</strong>
                    <span className="text-gray-700">{producto.color}</span>
                  </div>
                  <div className="flex items-center">
                    <FaBox className="text-yellow-500 mr-2" />
                    <strong className="text-gray-800 mr-1">Stock Total:</strong>
                    <span className="text-gray-700">{producto.stock}</span>
                  </div>
                  <div className="flex items-center">
                    <FaCalendarAlt className="text-blue-500 mr-2" />
                    <strong className="text-gray-800 mr-1">Creado:</strong>
                    <span className="text-gray-700">
                      {new Date(producto.fecha_creacion).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Clasificación */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
                  Clasificación
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-base">
                  <div className="flex items-center">
                    <FaTag className="text-blue-500 mr-2" />
                    <strong className="text-gray-800 mr-1">Categoría:</strong>
                    <span className="text-gray-700">
                      {producto.subcategoria?.categoria?.nombre || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <FaTag className="text-blue-500 mr-2" />
                    <strong className="text-gray-800 mr-1">Subcategoría:</strong>
                    <span className="text-gray-700">
                      {producto.subcategoria?.nombre || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2 flex items-center">
                  <FaInfoCircle className="text-indigo-500 mr-2" />
                  Descripción
                </h3>
                <p className="text-gray-700 text-base leading-relaxed">
                  {producto.descripcion || 'No se proporcionó descripción.'}
                </p>
              </div>
            </div>
          </div>

          {/* Botón de cerrar */}
          <div className="mt-10 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none transition-all duration-200 transform hover:scale-105"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalDetalle;
