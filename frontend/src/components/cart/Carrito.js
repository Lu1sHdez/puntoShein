import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { obtenerCarrito, actualizarCantidad, eliminarDelCarrito, vaciarCarrito, obtenerCantidad } from "./Funciones";
import { FaPlus, FaMinus, FaTrashAlt, FaShoppingCart } from "react-icons/fa";
import axios from "axios";
import { dataLoadingAnimation} from '../../components/Funciones.js';
import { motion } from 'framer-motion';
import { mostrarNotificacion } from "../../Animations/NotificacionSwal.js";
import { API_URL } from "../../ApiConexion.js";
import { Cargando } from "../../Animations/Cargando.js";
import CargandoModal from "../../Animations/CargandoModal.js";

mostrarNotificacion();

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorCantidad, setErrorCantidad] = useState({});
  const [totalCantidad, setTotalCantidad] = useState(0); // Nuevo estado para almacenar la cantidad total de productos
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(false);
  const [vaciando, setVaciando] = useState(false);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const respuesta = await axios.get(`${API_URL}/api/usuario/perfil`, { withCredentials: true });
        setUsuario(respuesta.data);
      } catch (error) {
        Swal.fire({
          icon: "warning",
          title: "No has iniciado sesión",
          text: "Por favor, inicia sesión para ver tu carrito.",
          confirmButtonText: "Aceptar",
        });
        navigate("/login");
      }
    };

    if (!usuario) {
      fetchUsuario();
    }
  }, [usuario, navigate]);

  useEffect(() => {
    const fetchCarrito = async () => {
      if (!usuario) return;

      try {
        const data = await obtenerCarrito(usuario.id);
        setCarrito(data?.carrito || []); // Actualiza el carrito con la respuesta del backend

        // Llamamos a obtenerCantidad para obtener la cantidad total de productos en el carrito
        const cantidadTotal = await obtenerCantidad(usuario.id);
        setTotalCantidad(cantidadTotal ||0); // Actualiza el estado con la cantidad total
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

    if (usuario) {
      fetchCarrito();
    }
  }, [usuario]);

  const handleActualizarCantidad = async (productoId, nuevaCantidad) => {
    if (nuevaCantidad > 5) {
      setErrorCantidad({ ...errorCantidad, [productoId]: "No puedes agregar más de 5 unidades" });
      return;
    }

    setErrorCantidad({ ...errorCantidad, [productoId]: null });

    try {
      await actualizarCantidad(usuario.id, productoId, nuevaCantidad);

      // Actualizar el carrito localmente para reflejar el cambio
      setCarrito((prevCarrito) =>
        prevCarrito.map((articulo) =>
          articulo.producto.id === productoId ? { ...articulo, cantidad: nuevaCantidad } : articulo
        )
      );
    } catch (error) {
      setErrorCantidad({ ...errorCantidad, [productoId]: "Hubo un problema al actualizar la cantidad." });
    }
  };

  const handleEliminarDelCarrito = async (productoId) => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este producto será eliminado de tu carrito.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      setCargando(true); 
      try {
        await eliminarDelCarrito(usuario.id, productoId);
        // Actualizar el carrito localmente para reflejar la eliminación
        setCarrito((prevCarrito) => prevCarrito.filter((item) => item.producto.id !== productoId));

        // También actualizamos la cantidad total
        const cantidadTotal = await obtenerCantidad(usuario.id);
        setTotalCantidad(cantidadTotal);

        setCargando(false);
      } catch (error) {
        setCargando(false); 
        mostrarNotificacion("error", "Hubo un problema al eliminar el producto del carrito.")
      }
    }
  };

  const handleVaciarCarrito = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: 'Se eliminarán todos los productos de tu carrito.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Vaciar carrito',
      cancelButtonText: 'Cancelar',
      reverseButtons: true,
    });

    if (result.isConfirmed) {
      setVaciando(true);
      try {
        await vaciarCarrito(usuario.id);
        setCarrito([]); 
        setTotalCantidad(0);
        setVaciando(false);
      } catch (error) {
        setVaciando(false);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al vaciar el carrito.",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };

  const calcularTotalProducto = (precio, cantidad) => precio * cantidad;
  const calcularTotalGeneral = () => 
    carrito.reduce((total, item) => total + calcularTotalProducto(item.producto.precio, item.cantidad), 0);

  if (!usuario) return <Cargando message="Cargando "/>;

  return (
    <motion.div {...dataLoadingAnimation} className="container mx-auto py-6 text-left">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Mi Carrito</h2>

      {loading ? (
        <p className="text-center text-gray-500"></p>
      ) : carrito.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-center py-12 px-4 bg-white rounded-lg shadow-md">
          <FaShoppingCart className="text-6xl text-gray-400 mb-4" />
          <p className="text-xl text-gray-700 font-semibold mb-2">Tu carrito está vacío</p>
          <p className="text-gray-500 mb-6">Los productos que agregues aparecerán aquí.</p>
          <button
            onClick={() => navigate("/productos")}
            className="bg-pink-600 hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-lg shadow-md transition duration-300"
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
                      className="w-20 h-20 object-cover rounded-md mr-4"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.producto.nombre}</h3>
                      <p className="text-pink-600">${item.producto.precio} x {item.cantidad} = ${calcularTotalProducto(item.producto.precio, item.cantidad)}</p>
                      <div className="flex items-center mt-2">
                        <button
                          onClick={() => handleActualizarCantidad(item.producto.id, item.cantidad - 1)}
                          disabled={item.cantidad <= 1}
                          className="bg-gray-200 text-gray-700 py-1 px-3 rounded-lg shadow-md text-sm font-semibold transition transform hover:scale-105 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <FaMinus />
                        </button>
                        <p className="text-gray-600 mx-2">Cantidad: {item.cantidad}</p>
                        <button
                          onClick={() => handleActualizarCantidad(item.producto.id, item.cantidad + 1)}
                          className="bg-gray-200 text-gray-700 py-1 px-3 rounded-lg shadow-md text-sm font-semibold transition transform hover:scale-105 hover:bg-gray-300"
                        >
                          <FaPlus />
                        </button>
                      </div>

                      {errorCantidad[item.producto.id] && (
                        <div className="text-red-500 text-sm mt-1">{errorCantidad[item.producto.id]}</div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => handleEliminarDelCarrito(item.producto.id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md text-sm font-semibold transition transform hover:scale-105 hover:bg-red-700"
                  >
                    <FaTrashAlt />
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleVaciarCarrito}
                className="w-full bg-gray-600 text-white py-3 rounded-lg shadow-md text-lg font-semibold transition transform hover:scale-105 hover:bg-gray-700"
              >
                Vaciar Carrito
              </button>
            </div>
          </div>

          <div className="w-1/3 border-l pl-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Resumen de compra</h3>
            <div className="flex justify-between mb-4">
              <span>Productos ({totalCantidad})</span> {/* Aquí mostramos la cantidad total de productos */}
              <span>${calcularTotalGeneral()}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-xl font-semibold">
              <span>Total</span>
              <span>${calcularTotalGeneral()}</span>
            </div>
            <div className="mt-6">
            <button
                onClick={() => navigate("/checkout/pago")}
                className="w-full bg-pink-600 text-white py-3 rounded-lg shadow-md text-lg font-semibold transition transform hover:scale-105 hover:bg-pink-700"
              >
                Continuar la compra
              </button>

            </div>
          </div>
        </div>
      )}
       {/* Mostrar el modal de carga */}
       <CargandoModal mensaje="Eliminando producto..." visible={cargando} />
       {/* Mostrar el modal de carga */}
      <CargandoModal mensaje="Vaciando carrito..." visible={vaciando} />
    </motion.div>
  );
};

export default Carrito;
