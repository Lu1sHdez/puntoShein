import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const useFormulario = (initialState, url, redirigir) => {
  const [datos, setDatos] = useState(initialState);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ tipo: "", texto: "" });

    // Validar que todos los campos estén llenos
    if (Object.values(datos).some((campo) => !campo)) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios.",
      });
      setLoading(false);
      return;
    }

    try {
      const respuesta = await axios.post(url, datos, { withCredentials: true });

      // Mostrar alerta de éxito
      await Swal.fire({
        icon: "success",
        title: "Inicio de sesión exitoso",
        text: "Operación exitosa, redirigiendo...",
        timer: 2000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      // Guardar el token en localStorage
      localStorage.setItem("token", respuesta.data.token);

      // Redirigir después de 2 segundos
      setTimeout(() => navigate(redirigir), 2000);
    } catch (error) {
      // Verificar si el error tiene una respuesta del servidor
      if (!error.response) {
        // ERROR 500 (Servidor no responde o backend caído)
        navigate("/error500");
      } else if (error.response.status === 400) {
        // ERROR 400 (Solicitud incorrecta)
        navigate("/error400");
      } else if (error.response.status === 404) {
        // ERROR 404 (Recurso no encontrado)
        navigate("/error404");
      } else {
        // Otro tipo de error
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.response?.data?.mensaje || "Error en la solicitud.",
        });
      }

      // Actualizar el estado del mensaje
      setMensaje({
        tipo: "error",
        texto: error.response?.data?.mensaje || "Error en la solicitud.",
      });
    } finally {
      setLoading(false);
    }
  };

  return { datos, mensaje, handleChange, handleSubmit, loading };
};

export default useFormulario;
