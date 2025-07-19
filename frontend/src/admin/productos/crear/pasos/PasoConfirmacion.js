import React, { useState } from 'react';
import CargandoModal from '../../../../Animations/CargandoModal';

const PasoConfirmacion = ({ producto, onAnterior, onGuardar }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleGuardarProducto = async () => {
    setIsLoading(true);
    try {
      await onGuardar();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="step-container p-6 bg-white rounded-2xl shadow-lg max-w-6xl mx-auto">
      <h3 className="text-2xl font-semibold mb-6 text-center">Confirmar detalles del producto</h3>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sección de imagen */}
        <div className="lg:w-1/3 flex justify-center">
          {producto.imagen ? (
            <div className="relative w-full aspect-[4/5] max-w-md rounded-lg overflow-hidden shadow-md">
              <img
                src={producto.imagen}
                alt="Producto"
                className="w-full h-full object-contain"
              />
              {producto.color && (
                <div
                  className="absolute bottom-2 right-2 w-8 h-8 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: producto.color }}
                  title={`Color: ${producto.color}`}
                />
              )}
            </div>
          ) : (
            <div className="w-full aspect-[4/5] max-w-md bg-gray-100 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">No hay imagen</p>
            </div>
          )}
        </div>

        {/* Sección de detalles */}
        <div className="lg:w-2/3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Columna izquierda */}
            <div>
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-1">Nombre</h4>
                <p className="text-gray-900">{producto.nombre || 'No especificado'}</p>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-1">Descripción</h4>
                <p className="text-gray-900 whitespace-pre-line">
                  {producto.descripcion || 'No hay descripción'}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-1">Precio</h4>
                <p className="text-gray-900">${producto.precio || '0.00'}</p>
              </div>
            </div>

            {/* Columna derecha */}
            <div>
              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-1">Categoría</h4>
                <p className="text-gray-900">
                  {producto.categoria?.nombre || 'No seleccionada'}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-1">Subcategoría</h4>
                <p className="text-gray-900">
                  {producto.subcategoria?.nombre || 'No seleccionada'}
                </p>
              </div>

              <div className="mb-4">
                <h4 className="text-lg font-medium text-gray-700 mb-1">Tallas y Stock</h4>
                {producto.tallas?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {producto.tallas.map((talla, index) => (
                      <div 
                        key={index}
                        className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center gap-1"
                      >
                        <span className="font-medium">{talla.nombre}</span>
                        <span className="text-gray-600">({talla.stock})</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No se han agregado tallas</p>
                )}
              </div>
            </div>
          </div>

          {/* Botones */}
          <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={onAnterior}
              className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors flex items-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Anterior
            </button>

            <button
              onClick={handleGuardarProducto}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              Guardar Producto
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <CargandoModal mensaje="Guardando producto..." visible={isLoading} />
    </div>
  );
};

export default PasoConfirmacion;  