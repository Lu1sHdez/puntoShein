import React, { useEffect, useState } from "react";
import { obtenerCarritoUsuario } from "../carrito/components/carritoService";
import useSesionUsuario from "../../context/useSesionUsuario";
import { useNavigate } from "react-router-dom";
import CargandoBarra from "../../Animations/CargandoBarra";

const Pago = () => {
  const { id: usuarioId } = useSesionUsuario();
  const [carrito, setCarrito] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        setCargando(true);
        const res = await obtenerCarritoUsuario(usuarioId);
        if (res.carrito) {
          setCarrito(res.carrito);
          setTotal(res.totalPrecio);
        }
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
      } finally {
        setCargando(false);
      }
    };

    if (usuarioId) {
      cargarCarrito();
    }
  }, [usuarioId]);

  const handlePagar = () => {
    // Aquí podrías hacer una petición POST para registrar la orden
    alert("¡Pago procesado correctamente!");
    navigate("/usuario/confirmacion");
  };

  if (cargando) return <CargandoBarra />;

  if (!carrito.length) {
    return <div className="text-center py-20 text-gray-500 text-lg">Tu carrito está vacío.</div>;
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Confirmación de compra</h1>

      <div className="space-y-6 mb-6">
        {carrito.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-4 border rounded-lg p-4 bg-white shadow"
          >
            <img
              src={item.producto.imagen}
              alt={item.producto.nombre}
              className="w-24 h-28 object-cover rounded"
            />
            <div className="flex-1">
              <h2 className="text-lg font-semibold text-gray-800">{item.producto.nombre}</h2>
              <p className="text-sm text-gray-600">{item.producto.descripcion}</p>
              <p className="text-sm text-gray-700 mt-1"><strong>Precio:</strong> ${item.producto.precio}</p>
              <p className="text-sm text-gray-700"><strong>Cantidad:</strong> {item.cantidad}</p>
              <p className="text-sm text-gray-700"><strong>Talla:</strong> {item.talla?.nombre || "N/A"}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white p-6 shadow rounded-lg">
        <p className="text-lg font-bold text-gray-800 mb-2">Total a pagar: ${total.toFixed(2)}</p>

        {/* Simulación de método de pago */}
        <p className="text-sm text-gray-700 mb-4">Método de pago: Pago al recibir</p>

        <button
          onClick={handlePagar}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          Confirmar pedido
        </button>
      </div>
    </div>
  );
};

export default Pago;
