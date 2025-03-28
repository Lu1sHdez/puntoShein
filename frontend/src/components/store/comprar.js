import Swal from "sweetalert2";
import axios from "axios";
import { mostrarNotificacion } from "../../Animations/NotificacionSwal";

mostrarNotificacion();

// Función para simular la compra directa de un producto
const comprarProducto = async (usuario, producto) => {


    useEffect(() => {
        const fetchUsuario = async () => {
          try {
            const respuesta = await axios.get("${API_URL}/api/usuario/perfil", { withCredentials: true });
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
  if (!usuario || !usuario.id) {
    Swal.fire({
      icon: "warning",
      title: "Inicia sesión o regístrate",
      text: "Para comprar este producto, debes iniciar sesión o registrarte.",
      confirmButtonText: "Aceptar",
    });
    return;
  }

  try {
    const response = await axios.post(
      "${API_URL}/api/compra/comprar",
      {
        producto_id: producto.id,
        cantidad: 1,
      },
      {
        withCredentials: true,
      }
    );

    mostrarNotificacion("success", "Compra realizada correctamente");

  } catch (error) {
    console.error("Error al comprar:", error);
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.mensaje || "Hubo un problema al procesar la compra",
      confirmButtonText: "Aceptar",
    });
  }
};

export default comprarProducto;
