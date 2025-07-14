import React from 'react';
import axios from 'axios';
import { API_URL } from '../../../../../ApiConexion';
import { mostrarNotificacion } from '../../../../../Animations/NotificacionSwal';

const PasoResumen = ({ datos, imagen, onConfirm, onBack }) => {
  const handleCrearProducto = async () => {
    try {
      const nuevoProducto = {
        nombre: datos.nombre,
        descripcion: datos.descripcion,
        precio: datos.precio,
        color: datos.color,
        stock: datos.stock,
        imagen: imagen,
        subcategoria_id: datos.subcategoria_id,
      };

      await axios.post(`${API_URL}/api/admin/productos`, nuevoProducto, {
        withCredentials: true,
      });

      mostrarNotificacion("success", "Producto creado exitosamente.");
      onConfirm(); // Avanza al paso de éxito
    } catch (error) {
      console.error('Error al crear el producto:', error);
      mostrarNotificacion("error", "No se pudo crear el producto.");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 text-center">Paso 4: Confirmar Datos</h3>

      {/* Imagen previa */}
      {imagen && (
        <div className="flex justify-center">
          <img src={imagen} alt="Imagen del producto" className="h-40 rounded-md shadow" />
        </div>
      )}

      {/* Datos del producto */}
      <ul className="space-y-2 text-gray-700 text-sm">
        <li><strong>Nombre:</strong> {datos.nombre}</li>
        <li><strong>Descripción:</strong> {datos.descripcion}</li>
        <li><strong>Precio:</strong> ${datos.precio}</li>
        <li><strong>Color:</strong> {datos.color}</li>
        <li><strong>Stock:</strong> {datos.stock}</li>
        <li><strong>Categoría ID:</strong> {datos.categoria_id}</li>
        <li><strong>Subcategoría ID:</strong> {datos.subcategoria_id}</li>
      </ul>

      <div className="flex justify-between">
        <button
          onClick={onBack}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Volver
        </button>
        <button
          onClick={handleCrearProducto}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          Confirmar y Crear
        </button>
      </div>
    </div>
  );
};

export default PasoResumen;
