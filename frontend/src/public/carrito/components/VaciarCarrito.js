// src/public/carrito/components/VaciarCarrito.js
import React from "react";
import { vaciarCarritoUsuario } from "../components/carritoService";
import { toast } from "react-toastify";

const VaciarCarrito = ({ usuarioId, onCarritoVaciado }) => {
  const handleVaciar = async () => {
    try {
      const confirmacion = window.confirm("¿Estás seguro de que deseas vaciar el carrito?");
      if (!confirmacion) return;

      const res = await vaciarCarritoUsuario(usuarioId);
      toast.success(res.message || "Carrito vaciado correctamente");

      if (typeof onCarritoVaciado === "function") {
        onCarritoVaciado(); // ← Llama a función para recargar el carrito
      }
    } catch (error) {
      console.error("Error al vaciar carrito:", error);
      toast.error(
        error.response?.data?.message || "Error al intentar vaciar el carrito"
      );
    }
  };

  return (
    <button
      className="mt-4 px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
      onClick={handleVaciar}
    >
      Vaciar carrito
    </button>
  );
};

export default VaciarCarrito;
