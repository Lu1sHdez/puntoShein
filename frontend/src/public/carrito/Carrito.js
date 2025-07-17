import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import {
  obtenerCarrito,
  actualizarCantidad,
  eliminarDelCarrito,
  vaciarCarrito,
  obtenerCantidad
} from "../../components/cart/Funciones";
import { FaPlus, FaMinus, FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import { API_URL } from "../../ApiConexion";
import axios from "axios";
import CargandoBarra from "../../Animations/CargandoBarra";
import CargandoModal from "../../Animations/CargandoModal";
import { dataLoadingAnimation } from "../../components/Funciones";
import { mostrarNotificacion } from "../../Animations/NotificacionSwal";
mostrarNotificacion();

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalCantidad, setTotalCantidad] = useState(0);
  const [errorCantidad, setErrorCantidad] = useState({});
  const [cargando, setCargando] = useState(false);
  const [vaciando, setVaciando] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerUsuario = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/usuario/perfil`, {
          withCredentials: true,
        });
        setUsuario(res.data);
      } catch {
        Swal.fire({
          icon: "info",
          title: "Inicia sesión para ver tu carrito",
          confirmButtonText: "Iniciar sesión",
        }).then(() => navigate("/login"));
      }
    };
    obtenerUsuario();
  }, [navigate]);

  useEffect(() => {
    const cargarCarrito = async () => {
      try {
        const data = await obtenerCarrito(usuario.id);
        setCarrito(data?.carrito || []);
        const total = await obtenerCantidad(usuario.id);
        setTotalCantidad(total || 0);
      } catch {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo obtener el carrito.",
        });
      } finally {
        setLoading(false);
      }
    };
    if (usuario) cargarCarrito();
  }, [usuario]);

  const calcularTotal = () =>
    carrito.reduce((sum, item) => sum + item.producto.precio * item.cantidad, 0);

  const actualizar = async (id, nuevaCantidad) => {
    if (nuevaCantidad > 5) {
      setErrorCantidad({ [id]: "Máximo 5 unidades" });
      return;
    }
    try {
      await actualizarCantidad(usuario.id, id, nuevaCantidad);
      setCarrito((prev) =>
        prev.map((item) =>
          item.producto.id === id ? { ...item, cantidad: nuevaCantidad } : item
        )
      );
      setErrorCantidad({});
    } catch {
      setErrorCantidad({ [id]: "Error al actualizar" });
    }
  };

  const eliminar = async (id) => {
    const result = await Swal.fire({
      title: "¿Eliminar producto?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
    });
    if (!result.isConfirmed) return;

    setCargando(true);
    try {
      await eliminarDelCarrito(usuario.id, id);
      const actualizado = carrito.filter((item) => item.producto.id !== id);
      setCarrito(actualizado);
      const total = await obtenerCantidad(usuario.id);
      setTotalCantidad(total || 0);
    } catch {
      mostrarNotificacion("error", "Error al eliminar producto.");
    } finally {
      setCargando(false);
    }
  };

  const vaciar = async () => {
    const result = await Swal.fire({
      title: "¿Vaciar carrito?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Vaciar",
    });
    if (!result.isConfirmed) return;

    setVaciando(true);
    try {
      await vaciarCarrito(usuario.id);
      setCarrito([]);
      setTotalCantidad(0);
    } catch {
      Swal.fire("Error", "No se pudo vaciar el carrito", "error");
    } finally {
      setVaciando(false);
    }
  };

  if (!usuario) return <CargandoBarra message="Cargando perfil..." />;

  return (
    <motion.section
      {...dataLoadingAnimation}
      className="min-h-screen py-10 px-4 max-w-6xl mx-auto"
    >
      <h1 className="text-3xl font-bold text-pink-600 mb-8 text-center">
        Carrito de compras
      </h1>

      {loading ? (
        <loading message="Cargando productos..." />
      ) : carrito.length === 0 ? (
        <div className="flex flex-col items-center text-center bg-white p-10 rounded-lg shadow">
          <FaShoppingCart className="text-5xl text-gray-400 mb-4" />
          <p className="text-xl text-gray-600 font-medium mb-2">
            Tu carrito está vacío
          </p>
          <button
            onClick={() => navigate("/cuerpo")}
            className="btn-principal mt-4"
          >
            Ver productos
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-1">
          <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-pink-100">
            {carrito.map((item) => (
                <li
                  key={item.id}
                  className="bg-white rounded-lg shadow-md p-5 flex flex-col md:flex-row gap-4"
                >
                  {/* Imagen del producto */}
                  <img
                    src={item.producto.imagen}
                    alt={item.producto.nombre}
                    className="w-28 h-28 rounded object-cover border border-gray-200"
                  />

                  {/* Información del producto */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-800">
                        {item.producto.nombre}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        Precio unitario: <span className="font-semibold text-pink-600">${item.producto.precio}</span>
                      </p>
                      <p className="text-gray-600">
                        Subtotal:{" "}
                        <span className="font-semibold text-pink-600">
                          ${item.producto.precio * item.cantidad}
                        </span>
                      </p>
                    </div>

                    {/* Controles de cantidad */}
                    <div className="mt-4 flex items-center gap-3">
                      <button
                        onClick={() => actualizar(item.producto.id, item.cantidad - 1)}
                        disabled={item.cantidad <= 1}
                        className="btn-small bg-gray-200 hover:bg-gray-300 text-gray-700"
                      >
                        <FaMinus />
                      </button>
                      <span className="text-lg font-medium">{item.cantidad}</span>
                      <button
                        onClick={() => actualizar(item.producto.id, item.cantidad + 1)}
                        className="btn-small bg-gray-200 hover:bg-gray-300 text-gray-700"
                      >
                        <FaPlus />
                      </button>
                    </div>

                    {errorCantidad[item.producto.id] && (
                      <p className="text-sm text-red-500 mt-2">
                        {errorCantidad[item.producto.id]}
                      </p>
                    )}
                  </div>

                  {/* Botón eliminar */}
                  <div className="self-end md:self-center">
                    <button
                      onClick={() => eliminar(item.producto.id)}
                      className="p-2 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition"
                      title="Eliminar producto"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </li>
              ))}

            </div>
            <button onClick={vaciar} className="btn-vaciar mt-6 w-full">
              Vaciar carrito
            </button>
          </div>

          <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Resumen de compra
            </h2>
            <div className="flex justify-between mb-2">
              <span>Productos ({totalCantidad})</span>
              <span>${calcularTotal()}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${calcularTotal()}</span>
            </div>
            <button
              onClick={() => navigate("/checkout/pago")}
              className="boton-principal mt-6 w-full"
            >
              Continuar compra
            </button>
          </div>
        </div>
      )}

      <CargandoModal mensaje="Procesando..." visible={cargando || vaciando} />
    </motion.section>
  );
};

export default Carrito;
