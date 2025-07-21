// ControlCantidad.js

import React from "react";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";
import useSesionUsuario from "../../../context/useSesionUsuario";

const ControlCantidad = ({ productoId, cantidad, actualizarCarrito }) => {
  const { id: usuarioId } = useSesionUsuario();

  const actualizarCantidad = async (nuevaCantidad) => {
    try {
      const res = await axios.put(
        `${API_URL}/api/carrito/actualizarCantidad`,
        {
          usuario_id: usuarioId,
          producto_id: productoId,
          cantidad: nuevaCantidad,
        },
        { withCredentials: true }
      );

      if (res.data.miCarrito) {
        actualizarCarrito();
      }
    } catch (error) {
      console.error("Error al actualizar cantidad:", error);
    }
  };

  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        className="px-3 py-1 bg-gray-200 rounded text-lg"
        disabled={cantidad <= 1}
        onClick={() => actualizarCantidad(cantidad - 1)}
      >
        -
      </button>

      <span className="px-3 text-lg font-medium">{cantidad}</span>

      <button
        className="px-3 py-1 bg-gray-200 rounded text-lg"
        disabled={cantidad >= 5}
        onClick={() => actualizarCantidad(cantidad + 1)}
      >
        +
      </button>
    </div>
  );
};

export default ControlCantidad;