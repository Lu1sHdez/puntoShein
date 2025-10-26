import React, { useState } from "react";
import CargandoModal from "../../../../Animations/CargandoModal";

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
    <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-6xl mx-auto animate-fade-in-up">
      {/* Encabezado */}
      <div className="text-center mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
          Confirmar detalles del producto
        </h3>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Revisa la información antes de guardar el producto en el sistema.
        </p>
      </div>

      {/* Contenido */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Imagen del producto */}
        <div className="lg:w-1/3 flex justify-center">
          {producto.imagen ? (
            <div className="relative w-full max-w-sm rounded-xl overflow-hidden shadow-md border border-gray-100 bg-gray-50">
              <img
                src={producto.imagen}
                alt="Producto"
                className="w-full h-80 object-contain bg-white"
              />
              {producto.color && (
                <div
                  className="absolute bottom-3 right-3 w-8 h-8 rounded-full border-2 border-white shadow-md"
                  style={{ backgroundColor: producto.color }}
                  title={`Color: ${producto.color}`}
                />
              )}
            </div>
          ) : (
            <div className="w-full max-w-sm h-80 bg-gray-100 rounded-lg flex items-center justify-center border border-gray-200">
              <p className="text-gray-500">Sin imagen</p>
            </div>
          )}
        </div>

        {/* Detalles del producto */}
        <div className="lg:w-2/3 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Izquierda */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase">
                  Nombre
                </h4>
                <p className="text-gray-900 text-base font-medium">
                  {producto.nombre || "No especificado"}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase">
                  Descripción
                </h4>
                <p className="text-gray-800 text-base whitespace-pre-line">
                  {producto.descripcion || "No hay descripción"}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase">
                  Precio
                </h4>
                <p className="text-green-600 text-lg font-semibold">
                  ${producto.precio || "0.00"}
                </p>
              </div>
            </div>

            {/* Derecha */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase">
                  Categoría
                </h4>
                <p className="text-gray-900 text-base">
                  {producto.categoria?.nombre || "No seleccionada"}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase">
                  Subcategoría
                </h4>
                <p className="text-gray-900 text-base">
                  {producto.subcategoria?.nombre || "No seleccionada"}
                </p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-gray-500 uppercase">
                  Tallas y Stock
                </h4>
                {producto.tallas?.length > 0 ? (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {producto.tallas.map((talla, index) => (
                      <div
                        key={index}
                        className="px-3 py-1 bg-blue-50 border border-blue-200 text-blue-700 rounded-full text-sm font-medium"
                      >
                        {talla.nombre}{" "}
                        <span className="text-gray-600 ml-1">
                          ({talla.stock})
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 mt-1">No se han agregado tallas</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex justify-between mt-10 pt-5 border-t border-gray-200">
        <button
          onClick={onAnterior}
          className="px-6 py-2.5 bg-gray-400 text-white rounded-lg hover:bg-gray-500 active:bg-gray-600 transition font-semibold flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            />
          </svg>
          Anterior
        </button>

        <button
          onClick={handleGuardarProducto}
          disabled={isLoading}
          className={`px-6 py-2.5 rounded-lg font-semibold flex items-center gap-2 shadow-sm transition-all ${
            isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800"
          }`}
        >
          Guardar Producto
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {/* Modal de carga */}
      <CargandoModal mensaje="Guardando producto..." visible={isLoading} />
    </div>
  );
};

export default PasoConfirmacion;
