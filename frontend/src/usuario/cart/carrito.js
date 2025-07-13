// src/usuario/cart/carrito.js
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  obtenerCarrito,
  actualizarCantidad,
  eliminarDelCarrito,
  vaciarCarrito,
  obtenerCantidad,
} from "../../components/cart/Funciones";
import {
  FaPlus,
  FaMinus,
  FaTrashAlt,
  FaShoppingCart,
} from "react-icons/fa";
import { dataLoadingAnimation } from "../../components/Funciones.js";
import { motion } from "framer-motion";
import { mostrarNotificacion } from "../../Animations/NotificacionSwal.js";
import { Cargando } from "../../Animations/Cargando.js";
import useSesionUsuario from "../../context/useSesionUsuario";

mostrarNotificacion();

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorCantidad, setErrorCantidad] = useState({});
  const [totalCantidad, setTotalCantidad] = useState(0);
  const navigate = useNavigate();

  const { datos, rol, id: userId, usuarioAutenticado } = useSesionUsuario();

  useEffect(() => {
    const fetchCarrito = async () => {
      if (!usuarioAutenticado || rol !== "usuario") return;

      try {
        const data = await obtenerCarrito(userId);
        setCarrito(data?.carrito || []);

        const cantidadTotal = await obtenerCantidad(userId);
        setTotalCantidad(cantidadTotal || 0);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo obtener el carrito. Hubo un problema",
          confirmButtonText: "Aceptar",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchCarrito();
  }, [usuarioAutenticado, rol, userId]);

  const handleActualizarCantidad = async (productoId, nuevaCantidad) => {
    if (nuevaCantidad > 5) {
      setErrorCantidad({ ...errorCantidad, [productoId]: "No puedes agregar más de 5 unidades" });
      return;
    }

    setErrorCantidad({ ...errorCantidad, [productoId]: null });

    try {
      await actualizarCantidad(userId, productoId, nuevaCantidad);
      setCarrito((prev) =>
        prev.map((articulo) =>
          articulo.producto.id === productoId ? { ...articulo, cantidad: nuevaCantidad } : articulo
        )
      );
    } catch (error) {
      setErrorCantidad({ ...errorCantidad, [productoId]: "Error al actualizar la cantidad." });
    }
  };

  const handleEliminarDelCarrito = async (productoId) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Este producto será eliminado de tu carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await eliminarDelCarrito(userId, productoId);
        mostrarNotificacion("success", "Producto eliminado");
        setCarrito((prev) => prev.filter((item) => item.producto.id !== productoId));
        const cantidadTotal = await obtenerCantidad(userId);
        setTotalCantidad(cantidadTotal);
      } catch (error) {
        mostrarNotificacion("error", "Error al eliminar el producto.");
      }
    }
  };

  const handleVaciarCarrito = async () => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminarán todos los productos de tu carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Vaciar carrito",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        await vaciarCarrito(userId);
        mostrarNotificacion("success", "Carrito vaciado");
        setCarrito([]);
        setTotalCantidad(0);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al vaciar el carrito.",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  const calcularTotal = () =>
    carrito.reduce((acc, item) => acc + item.producto.precio * item.cantidad, 0);

  if (!usuarioAutenticado || rol !== "usuario") return <Cargando message="Cargando..." />;

  return (
    <motion.div {...dataLoadingAnimation} className="container mx-auto -py-3">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Mi Carrito</h2>

      {loading ? (
        <p className="text-center text-gray-500">Cargando...</p>
      ) : carrito.length === 0 ? (
        <div className="text-center py-20">
          <FaShoppingCart className="text-6xl text-gray-400 mx-auto mb-4" />
          <p className="text-xl font-semibold text-gray-700">Tu carrito está vacío</p>
          <button
            onClick={() => navigate("/productos")}
            className="mt-6 bg-pink-600 text-white px-6 py-2 rounded hover:bg-pink-700"
          >
            Ver productos
          </button>
        </div>
      ) : (
        <div className="flex gap-10">
          <div className="w-2/3">
            <ul>
              {carrito.map((item) => (
                <li key={item.id} className="flex justify-between items-center p-4 border-b">
                  <div className="flex items-center">
                    <img
                      src={item.producto.imagen}
                      alt={item.producto.nombre}
                      className="w-20 h-20 object-cover rounded mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{item.producto.nombre}</h3>
                      <p className="text-pink-600">
                        ${item.producto.precio} x {item.cantidad} = ${item.producto.precio * item.cantidad}
                      </p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleActualizarCantidad(item.producto.id, item.cantidad - 1)}
                          disabled={item.cantidad <= 1}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
                        >
                          <FaMinus />
                        </button>
                        <span className="mx-2">{item.cantidad}</span>
                        <button
                          onClick={() => handleActualizarCantidad(item.producto.id, item.cantidad + 1)}
                          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                        >
                          <FaPlus />
                        </button>
                      </div>
                      {errorCantidad[item.producto.id] && (
                        <p className="text-red-500 text-sm mt-1">{errorCantidad[item.producto.id]}</p>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEliminarDelCarrito(item.producto.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt />
                  </button>
                </li>
              ))}
            </ul>

            <button
              onClick={handleVaciarCarrito}
              className="mt-6 w-full bg-gray-600 text-white py-2 rounded hover:bg-gray-700"
            >
              Vaciar carrito
            </button>
          </div>

          <div className="w-1/3 border-l pl-6">
            <h3 className="text-xl font-semibold mb-4">Resumen</h3>
            <div className="flex justify-between mb-2">
              <span>Productos ({totalCantidad})</span>
              <span>${calcularTotal()}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>${calcularTotal()}</span>
            </div>
            <button
              onClick={() => navigate("/checkout/pago")}
              className="mt-6 w-full bg-pink-600 text-white py-3 rounded hover:bg-pink-700"
            >
              Continuar la compra
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Carrito;