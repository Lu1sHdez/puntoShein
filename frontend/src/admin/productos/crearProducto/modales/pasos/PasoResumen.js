import React from 'react';
import axios from 'axios';
import { API_URL } from '../../../../../ApiConexion';
import { mostrarNotificacion } from '../../../../../Animations/NotificacionSwal';

const PasoResumen = ({ datos, imagen, onConfirm }) => {
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

      await axios.post(`${API_URL}/api/admin/productos`, nuevoProducto, { withCredentials: true });

      mostrarNotificacion("success", "Producto creado exitosamente.");
      onConfirm(); // Ahora simplemente cierra el modal
    } catch (error) {
      console.error('Error al crear el producto:', error);
      mostrarNotificacion("error", "No se pudo crear el producto.");
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-800 text-center">Paso final: Crear Producto</h3>

      {imagen && (
        <div className="flex justify-center">
          <img src={imagen} alt="Imagen del producto" className="h-40 rounded-md shadow" />
        </div>
      )}

      <ul className="space-y-2 text-gray-700 text-sm">
        <li><strong>Nombre:</strong> {datos.nombre}</li>
        <li><strong>Descripción:</strong> {datos.descripcion}</li>
        <li><strong>Precio:</strong> ${datos.precio}</li>
        <li><strong>Color:</strong> {datos.color}</li>
        <li><strong>Stock:</strong> {datos.stock}</li>
      </ul>

      <div className="flex justify-center">
        <button
          onClick={handleCrearProducto}
          className="px-6 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
        >
          Crear Producto
        </button>
      </div>
    </div>
  );
};

export default PasoResumen;
