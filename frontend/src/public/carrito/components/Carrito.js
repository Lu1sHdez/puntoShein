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

  // === CARRITO VACÍO ===
  if (!carrito.length) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] bg-gray-50 px-6 py-12">
        <div className="bg-blue-100 rounded-full p-6 shadow-inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-14 h-14 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 2.25l1.5 1.5m0 0L4.5 4.5m0 0h15a.75.75 0 01.75.75v12.75a.75.75 0 01-.75.75H4.5a.75.75 0 01-.75-.75V4.5zM4.5 4.5l1.5 1.5m13.5 12l1.5 1.5M7.5 6.75h9m-9 3h6"
            />
          </svg>
        </div>
        <h2 className="mt-6 text-2xl font-semibold text-gray-800">
          Tu carrito está vacío
        </h2>
        <p className="text-gray-500 mt-2 text-sm max-w-sm text-center">
          Aún no tienes productos en tu carrito. ¡Explora nuestras categorías y
          descubre lo que tenemos para ti!
        </p>
        <Link
          to="/cuerpo"
          className="mt-6 inline-flex items-center justify-center rounded-md bg-blue-600 text-white px-6 py-2 text-sm font-medium shadow hover:bg-blue-700 transition-all"
        >
          Seguir comprando
        </Link>
      </div>
    );
  }

  // === CARRITO CON PRODUCTOS (DISEÑO COMPLETO) ===
  return (
    <div className="relative bg-gray-50 min-h-screen py-10 px-4 sm:px-8">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-lg overflow-hidden">
        {/* Encabezado */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-800">
            Tu carrito de compras
          </h2>
          <button
            onClick={vaciarLocalmente}
            className="text-sm text-blue-600 hover:text-blue-800 transition"
          >
            Vaciar carrito
          </button>
        </div>

        {/* Lista de productos */}
        <div className="max-h-[70vh] overflow-y-auto divide-y divide-gray-200 px-6 py-4">
          {carrito.map((item) => (
            <div key={item.id} className="flex py-6">
              <div className="w-24 h-24 shrink-0 overflow-hidden rounded-md border border-gray-200">
                <img
                  src={item.producto.imagen}
                  alt={item.producto.nombre}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="ml-4 flex flex-1 flex-col justify-between">
                <div>
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <h3>{item.producto.nombre}</h3>
                    <p>${item.producto.precio}</p>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    {item.talla?.nombre || "Sin talla"}
                  </p>
                </div>

                <div className="flex items-end justify-between text-sm mt-2">
                  <p className="text-gray-500">Cantidad: {item.cantidad}</p>
                  <button
                    className="font-medium text-blue-600 hover:text-blue-800"
                    onClick={() =>
                      setCarrito((prev) =>
                        prev.filter((p) => p.id !== item.id)
                      )
                    }
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resumen de compra */}
        <div className="border-t border-gray-200 px-6 py-6">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>${totalPrecio.toFixed(2)}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Envío y descuentos calculados al finalizar la compra.
          </p>

          <div className="mt-6">
            <Link
              to="/usuario/pagos"
              className="flex items-center justify-center rounded-md bg-blue-600 px-6 py-3 text-base font-medium text-white shadow hover:bg-blue-700 transition"
            >
              Proceder al pago
            </Link>
          </div>

          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              o{" "}
              <Link
                to="/cuerpo"
                className="font-medium text-blue-600 hover:text-blue-800"
              >
                Seguir comprando &rarr;
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carrito;
