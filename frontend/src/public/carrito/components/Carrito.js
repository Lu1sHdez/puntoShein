import React, { useEffect, useState, useCallback } from "react";
import { obtenerCarritoUsuario } from "./carritoService";
import useSesionUsuario from "../../../context/useSesionUsuario";
import VaciarCarrito from "./VaciarCarrito";
import SeccionPago from "./SeccionPago";
import ControlCantidad from "./ControlCantidad";
import { FaShoppingCart } from "react-icons/fa";


const Carrito = () => {
  const { id: usuarioId } = useSesionUsuario();
  const [carrito, setCarrito] = useState([]);
  const [totalCantidad, setTotalCantidad] = useState(0);
  const [totalPrecio, setTotalPrecio] = useState(0);
  const [cargando, setCargando] = useState(true);

  const cargarCarrito = useCallback(async () => {
    try {
      setCargando(true);
      const res = await obtenerCarritoUsuario(usuarioId);
      if (res.carrito) {
        setCarrito(res.carrito);
        setTotalCantidad(res.totalCantidad);
        setTotalPrecio(
          res.carrito.reduce(
            (total, item) => total + item.producto.precio * item.cantidad,
            0
          )
        );
      } else {
        setCarrito([]);
        setTotalCantidad(0);
        setTotalPrecio(0);
      }
    } catch (error) {
      console.error("Error al cargar el carrito:", error);
    } finally {
      setCargando(false);
    }
  }, [usuarioId]);

  useEffect(() => {
    if (usuarioId) {
      cargarCarrito();
    }
  }, [usuarioId, cargarCarrito]);


  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
      <h1 className="text-3xl font-bold mb-8 text-center">Tu Carrito</h1>

      {carrito.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
        <FaShoppingCart className="text-6xl mb-4 text-gray-400" />
        <p className="text-lg font-medium">Tu carrito está vacío.</p>
      </div>
        
      ) : (
        <>
          <div className="space-y-6">
            {carrito.map((item) => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center gap-4 border-b pb-4"
              >
                <img
                  src={item.producto?.imagen}
                  alt={item.producto?.nombre}
                  className="w-32 h-32 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="text-lg font-semibold">
                    {item.producto?.nombre}
                  </h2>
                  <p className="text-sm text-gray-600">
                    {item.producto?.descripcion}
                  </p>
                  <p className="text-sm mt-1">
                    Precio:{" "}
                    <span className="font-medium text-green-600">
                      ${item.producto?.precio}
                    </span>
                  </p>
                  <p className="text-sm mt-1">Cantidad: {item.cantidad}</p>
                  <p className="text-sm mt-1">
                    Talla:{" "}
                    <span className="font-medium">
                      {item.talla?.nombre || "Sin talla"}
                    </span>
                  </p>
                  <ControlCantidad
                    productoId={item.producto.id}
                    cantidad={item.cantidad}
                    actualizarCarrito={() => cargarCarrito()}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mostrar botón solo si hay productos */}
          <VaciarCarrito actualizarCarrito={cargarCarrito} />
        </>
      )}
      </div>
      <SeccionPago total={totalPrecio} totalProductos={totalCantidad} />
    </div>
  );
};

export default Carrito;
