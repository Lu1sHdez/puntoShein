import React from "react";
import { Link } from "react-router-dom";

const SeccionPago = ({ totalCantidad, totalPrecio }) => {
  return (
    <div className="bg-white p-6 shadow rounded-lg">
      <h2 className="text-lg font-bold text-gray-800 mb-4">Resumen de compra</h2>

      <div className="space-y-3 text-sm text-gray-700">
        <p><strong>Total productos:</strong> {totalCantidad}</p>
        <p><strong>Total a pagar:</strong> ${totalPrecio.toFixed(2)}</p>
        <p><strong>Envío:</strong> Gratis</p>
        <p><strong>Pago:</strong> Al finalizar compra</p>
        <p><strong>Garantía:</strong> 30 días</p>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <Link
          to="/checkout"
          className="bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
        >
          Proceder al pago
        </Link>

        <Link
          to="/cuerpo"
          className="text-center text-blue-600 text-sm hover:underline"
        >
          ← Seguir comprando
        </Link>
      </div>
    </div>
  );
};

export default SeccionPago;
