import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { obtenerCarrito, actualizarCantidad, eliminarDelCarrito, vaciarCarrito } from "./Servicios";
import { FaPlus, FaMinus, FaTrashAlt } from "react-icons/fa";
import axios from "axios";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorCantidad, setErrorCantidad] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const respuesta = await axios.get("http://localhost:4000/api/usuario/perfil", { withCredentials: true });
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
        setCarrito(data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al obtener el carrito.",
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
      setErrorCantidad({ ...errorCantidad, [productoId]: "No puedes agregar más" });
      return;
    }

    setErrorCantidad({ ...errorCantidad, [productoId]: null });

    try {
      await actualizarCantidad(usuario.id, productoId, nuevaCantidad);
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
      try {
        const response = await eliminarDelCarrito(usuario.id, productoId);
        Swal.fire({
          icon: "success",
          title: "Producto eliminado",
          text: response.message,
          confirmButtonText: "Aceptar",
        });

        setCarrito((prevCarrito) => prevCarrito.filter((item) => item.producto.id !== productoId));
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al eliminar el producto del carrito.",
          confirmButtonText: "Aceptar",
        });
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
      try {
        const response = await vaciarCarrito(usuario.id);
        Swal.fire({
          icon: "success",
          title: "Carrito vaciado",
          text: response.message,
          confirmButtonText: "Aceptar",
        });
        setCarrito([]);
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

  if (!usuario) return <p className="text-center text-gray-500">Cargando...</p>;

  return (
    <div className="container mx-auto py-0 text-left">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">Mi Carrito</h2>

      {loading ? (
        <p className="text-center text-gray-500">Cargando carrito...</p>
      ) : carrito.length === 0 ? (
        <p className="text-center text-gray-500">Tu carrito está vacío.</p>
      ) : (
        <div>
          <ul>
            {carrito.map((item) => (
              <li key={item.id} className="flex justify-between items-center p-4 border-b">
                <div className="flex items-center">
                  <img
                    src={item.producto.imagen}
                    alt={item.producto.nombre}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  />
                  <div>
                    <h3 className="font-semibold text-gray-900">{item.producto.nombre}</h3>
                    <p className="text-gray-600">{item.producto.descripcion}</p>
                    <p className="text-pink-600">${item.producto.precio}</p>
                    <div className="flex items-center">
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
                      <div className="text-red-500 text-sm mt-1">
                        {errorCantidad[item.producto.id]}
                      </div>
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
      )}
    </div>
  );
};

export default Carrito;
