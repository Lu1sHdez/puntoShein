import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";

const Pedidos = () => {
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    // Simulación de pedidos
    const pedidosSimulados = [
      {
        id: "ORD-001",
        fecha: "2025-07-08",
        total: 750,
        estado: "entregado",
      },
      {
        id: "ORD-002",
        fecha: "2025-07-07",
        total: 420,
        estado: "pendiente",
      },
      {
        id: "ORD-003",
        fecha: "2025-07-05",
        total: 890,
        estado: "cancelado",
      },
    ];
    setPedidos(pedidosSimulados);
  }, []);

  const renderEstado = (estado) => {
    switch (estado) {
      case "entregado":
        return (
          <span className="flex items-center text-green-600 font-semibold">
            <FaCheckCircle className="mr-1" /> Entregado
          </span>
        );
      case "pendiente":
        return (
          <span className="flex items-center text-yellow-500 font-semibold">
            <FaClock className="mr-1" /> Pendiente
          </span>
        );
      case "cancelado":
        return (
          <span className="flex items-center text-red-600 font-semibold">
            <FaTimesCircle className="mr-1" /> Cancelado
          </span>
        );
      default:
        return <span>Desconocido</span>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-black">Mis Pedidos</h2>
      {pedidos.length === 0 ? (
        <p className="text-gray-500">No tienes pedidos aún.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-gray-700">
                <th className="px-4 py-2 text-left">ID Pedido</th>
                <th className="px-4 py-2 text-left">Fecha</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.map((pedido) => (
                <tr key={pedido.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3">{pedido.id}</td>
                  <td className="px-4 py-3">{pedido.fecha}</td>
                  <td className="px-4 py-3">${pedido.total}</td>
                  <td className="px-4 py-3">{renderEstado(pedido.estado)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Pedidos;
