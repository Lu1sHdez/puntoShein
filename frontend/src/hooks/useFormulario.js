import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { mostrarNotificacion } from "../Animations/NotificacionSwal";

const useFormulario = (initialState, url, redirigir, isAuthForm = false) => {
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


  try {
    const respuesta = await axios.post(url, datos, { 
      withCredentials: true // Asegura que las cookies se envíen con la solicitud
    });

    // Si es un formulario de autenticación (Login o Registro)
    if (isAuthForm) {
      mostrarNotificacion("success", "Inicio de sesion exitoso. Redirigiendo...")

      // Guardar el token en localStorage
      localStorage.setItem("token", respuesta.data.token);

      // Redirigir después de 2 segundos
      setTimeout(() => navigate(redirigir), 1500);
    } else {
      //  Formulario de recuperación o restablecimiento de contraseña
      mostrarNotificacion("success", "Proceso realizado exitosamente")

      // Redirigir después de 3 segundos si todo salió bien
      setTimeout(() => navigate(redirigir), 1500);
    }

    return true; //  Indica que la operación fue exitosa
  } catch (error) {
    //  Si el backend no responde (Error 500)
    if (!error.response) {
      navigate("/error500");
      return false;
    }

    if (error.response.status === 400) {
      const mensajeError = error.response.data.mensaje || "Solicitud incorrecta.";

      // Si el error es por credenciales incorrectas en Login, mostrar alerta y NO redirigir
      if (mensajeError === "Credenciales inválidas") {
        setMensaje({ tipo: "error", texto: mensajeError }); // Guardar mensaje en el estado
        return false; // Evita que el formulario actúe como si fue exitoso
      }

      setMensaje({ tipo: "error", texto: mensajeError }); // Manejar otros errores 400
      return false;
    }

    // Si el recurso no existe (Error 404)
    if (error.response.status === 404) {
      navigate("/error404");
      return false;
    }

    // Otros errores no manejados explícitamente
    Swal.fire({
      icon: "error",
      title: "Error",
      text: error.response?.data?.mensaje || "Error en la solicitud.",
    });

    setMensaje({
      tipo: "error",
      texto: error.response?.data?.mensaje || "Error en la solicitud.",
    });

    return false;
  } finally {
    setLoading(false);
  }
};

  return { datos, mensaje, handleChange, handleSubmit, loading };
};

export default useFormulario;
