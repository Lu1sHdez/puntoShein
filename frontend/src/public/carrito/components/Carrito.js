import React, { useEffect, useState } from "react";
import { obtenerCarritoUsuario } from "../components/carritoService";
import useSesionUsuario from "../../../context/useSesionUsuario";
import CargandoBarra from "../../../Animations/CargandoBarra";
import VaciarCarrito from "../components/VaciarCarrito";
import { Link } from "react-router-dom";

const Carrito = () => {
  const { id: usuarioId } = useSesionUsuario();
  const [carrito, setCarrito] = useState([]);
  const [totalCantidad, setTotalCantidad] = useState(0);
  const [totalPrecio, setTotalPrecio] = useState(0);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        setCargando(true);
        const res = await obtenerCarritoUsuario(usuarioId);
        if (res.carrito) {
          setCarrito(res.carrito);
          setTotalCantidad(res.totalCantidad);
          setTotalPrecio(res.totalPrecio);
        }
      } catch (error) {
        console.error("Error al cargar el carrito:", error);
      } finally {
        setCargando(false);
      }
    };

    if (usuarioId) {
      cargarCarrito();
    }
  }, [usuarioId]);

  const vaciarLocalmente = () => {
    setCarrito([]);
    setTotalCantidad(0);
    setTotalPrecio(0);
  };

  if (cargando) return <CargandoBarra />;

  if (!carrito.length) {
    return <div className="text-center py-20 text-gray-500">Tu carrito está vacío.</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Productos del carrito */}
      <div className="lg:col-span-2">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Tu carrito de compras</h1>

        <div className="space-y-6">
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
                <p className="text-sm text-gray-700 mt-1">
                  <strong>Precio:</strong> ${item.producto.precio}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Cantidad:</strong> {item.cantidad}
                </p>
                <p className="text-sm text-gray-700">
                  <strong>Talla:</strong> {item.talla?.nombre || "N/A"}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6">
          <VaciarCarrito
            usuarioId={usuarioId}
            onCarritoVaciado={vaciarLocalmente}
          />
        </div>
      </div>

      {/* Sección de pago */}
      <div className="lg:col-span-1">
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
                to="/usuario/pagos"
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
      </div>
    </div>
  );
};

export default Carrito;
