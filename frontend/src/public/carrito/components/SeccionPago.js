import React from "react";
import { useNavigate } from "react-router-dom";

const SeccionPago = ({ total = 0, totalProductos = 0 }) => {
  const navigate = useNavigate();

  const handleContinuarPago = () => navigate("/checkout");

  return (
    <div className="bg-white shadow-xl rounded-2xl p-6 w-full max-w-md mx-auto lg:mx-0">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Resumen de compra</h2>

      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-gray-700">
          <span className="font-medium">Productos</span>
          <span className="font-semibold">{totalProductos}</span>
        </div>

        <div className="flex justify-between text-gray-700">
          <span className="font-medium">Total</span>
          <span className="text-xl font-bold text-green-500">${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={handleContinuarPago}
          className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors shadow-md"
        >
          Continuar con el pago
        </button>

        <button
          onClick={() => navigate("/cuerpo")}
          className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-lg transition-colors shadow-md"
        >
          Seguir comprando
        </button>
      </div>
    </div>
  );
};

export default SeccionPago;