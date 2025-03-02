import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

const AgregarCarrito = ({ productoId, usuarioId }) => {
  const [cantidad, setCantidad] = useState(1); // Estado para la cantidad seleccionada

  // Maneja el cambio en la cantidad
  const handleCantidadChange = (event) => {
    // Asegurarse de que la cantidad sea un número entero positivo
    const value = Math.max(1, parseInt(event.target.value, 10)); // Garantiza que la cantidad no sea menor que 1
    setCantidad(value);
  };

  const handleAgregarAlCarrito = async () => {
    try {
      // Enviar la solicitud para agregar el producto al carrito
      const response = await axios.post('http://localhost:4000/api/carrito/agregar', {
        usuario_id: usuarioId,
        producto_id: productoId,
        cantidad: cantidad,
      }, {
        withCredentials: true, // Enviar la cookie con la solicitud
      });
  
      Swal.fire({
        icon: 'success',
        title: 'Producto agregado',
        text: response.data.message,
      });
    } catch (error) {
      console.error('Error al agregar al carrito:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error al agregar al carrito',
        text: error.response ? error.response.data.message : 'Hubo un problema al agregar el producto al carrito.',
      });
    }
  };
  

  return (
    <div className="agregar-carrito">
      <div className="cantidad-container">
        <label htmlFor="cantidad" className="text-sm font-medium">Cantidad:</label>
        <input
          type="number"
          id="cantidad"
          value={cantidad}
          onChange={handleCantidadChange}
          className="border p-2 rounded-md"
          min="1"
          step="1" // Asegura que solo se pueda ingresar números enteros
        />
      </div>

      <button
        onClick={handleAgregarAlCarrito}
        className="mt-4 bg-pink-600 text-white py-2 px-6 rounded-lg hover:bg-pink-700 transition-all"
      >
        Agregar al carrito
      </button>
    </div>
  );
};

export default AgregarCarrito;