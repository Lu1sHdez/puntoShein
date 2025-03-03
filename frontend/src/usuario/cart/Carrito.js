import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const Carrito = () => {
  const [carrito, setCarrito] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/usuario/perfil", {
          withCredentials: true,
        });
        setUsuario(response.data);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
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
        const response = await axios.get(`http://localhost:4000/api/carrito/${usuario.id}`, {
          withCredentials: true,
        });
        console.log("Carrito response:", response.data);
        setCarrito(response.data);
      } catch (error) {
        console.error("Error al obtener el carrito:", error);
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

  const handleEliminarDelCarrito = async (productoId) => {
    // Mostrar ventana de confirmación
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
        // Enviar la solicitud DELETE al backend con los datos correctos
        const response = await axios.delete("http://localhost:4000/api/carrito/eliminar", {
          data: { 
            usuario_id: usuario.id,  // Asegúrate de enviar el usuario_id
            producto_id: productoId 
          },
          withCredentials: true, // Para enviar las cookies si es necesario
        });
    
        // Mostrar un mensaje de éxito con SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Producto eliminado",
          text: response.data.message,
          confirmButtonText: "Aceptar",
        });
    
        // Actualizar el carrito en el frontend (filtrando el producto eliminado)
        setCarrito((prevCarrito) => prevCarrito.filter((item) => item.producto.id !== productoId));
      } catch (error) {
        console.error("Error al eliminar del carrito:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al eliminar el producto del carrito",
          confirmButtonText: "Aceptar",
        });
      }
    }
  };
  
  
  const handleVaciarCarrito = async () => {
    // Mostrar ventana de confirmación
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
        const response = await axios.delete("http://localhost:4000/api/carrito/vaciar", {
          data: { usuario_id: usuario.id }, // Pasando el usuario_id al backend
          withCredentials: true,
        });
    
        // Mostrar mensaje de éxito con SweetAlert2
        Swal.fire({
          icon: "success",
          title: "Carrito vaciado",
          text: response.data.message,
          confirmButtonText: "Aceptar",
        });
    
        // Limpiar el carrito en el frontend
        setCarrito([]); // Vaciar el carrito en el frontend
      } catch (error) {
        console.error("Error al vaciar el carrito:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Hubo un problema al vaciar el carrito",
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
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
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
                      <p className="text-gray-600">Cantidad: {item.cantidad}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleEliminarDelCarrito(item.producto.id)}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg shadow-md text-sm font-semibold transition transform hover:scale-105 hover:bg-red-700"
                  >
                    Eliminar
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Vaciar carrito */}
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