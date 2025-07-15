import React, { useState } from 'react';
import CargandoModal from '../../../../Animations/CargandoModal'; // Asumo que tienes este componente

const PasoConfirmacion = ({ producto, onAnterior, onGuardar }) => {
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  // Función para manejar la confirmación de guardar
  const handleGuardarProducto = async () => {
    setIsLoading(true); // Activar el modal de carga
    
    try {
      // Aquí se llama la función onGuardar que debe hacer el guardado del producto
      await onGuardar();
    } catch (error) {
      console.error("Error al guardar el producto:", error);
    } finally {
      setIsLoading(false); // Desactivar el modal de carga
    }
  };

  return (
    <div className="step-container p-6 bg-white rounded-2xl shadow-lg">
      <h3 className="text-2xl font-semibold mb-4">Confirmar producto</h3>

      {/* Detalles del producto */}
      <div className="mb-6">
        {/* Nombre del producto */}
        <p><strong>Nombre:</strong> {producto.nombre}</p>

        {/* Descripción del producto */}
        <p><strong>Descripción:</strong> {producto.descripcion}</p>

        {/* Precio del producto */}
        <p><strong>Precio:</strong> ${producto.precio}</p>

        {/* Color del producto */}
        <p><strong>Color:</strong> {producto.color || 'No se ha agregado color'}</p>

        {/* Imagen del producto */}
        <div>
          <strong>Imagen:</strong>
          {producto.imagen ? (
            <img
              src={producto.imagen}
              alt="Producto"
              className="w-32 h-auto mt-2 border border-gray-300 rounded"
            />
          ) : (
            <p>No se ha agregado imagen.</p>
          )}
        </div>

        {/* Categoría y Subcategoría */}
        <div className="mt-4">
          <strong>Categoría:</strong> {producto.categoria_id ? producto.categoria_id : 'No seleccionada'}
        </div>
        <div className="mt-2">
          <strong>Subcategoría:</strong> {producto.subcategoria_id ? producto.subcategoria_id : 'No seleccionada'}
        </div>

        {/* Tallas y stock */}
        <div className="mt-4">
          <strong>Tallas:</strong>
          {producto.tallas.length > 0 ? (
            <ul className="list-disc pl-6 mt-2">
              {producto.tallas.map((talla, index) => (
                <li key={index}>
                  <strong>{talla.talla_id}</strong> - Stock: {talla.stock}
                </li>
              ))}
            </ul>
          ) : (
            <p>No se han agregado tallas.</p>
          )}
        </div>
      </div>

      {/* Botones de navegación */}
      <div className="flex justify-between mt-6">
        {/* Botón para regresar al paso anterior */}
        <button
          onClick={onAnterior}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Anterior
        </button>

        {/* Botón para guardar el producto */}
        <button
          onClick={handleGuardarProducto}
          className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
        >
          Guardar Producto
        </button>
      </div>

      {/* Modal de carga */}
      <CargandoModal mensaje="Guardando producto..." visible={isLoading} />
    </div>
  );
};

export default PasoConfirmacion;
