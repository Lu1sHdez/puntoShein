import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mostrarNotificacion } from "../Animations/NotificacionSwal";

const useFormulario = (initialState, url, redirigir, isAuthForm = false) => {
  const [datos, setDatos] = useState(initialState);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e, datosExtra = {}) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ tipo: "", texto: "" });
  
    try {
      const respuesta = await axios.post(
        url,
        { ...datos, ...datosExtra }, // ⬅️ Se unen los datos del formulario + extra
        { withCredentials: true }
      );
  
      if (isAuthForm) {
        mostrarNotificacion("success", "Inicio de sesión exitoso. Redirigiendo...");
        localStorage.setItem("token", respuesta.data.token);
        return respuesta.data;
      } else {
        mostrarNotificacion("success", "Proceso realizado exitosamente");
        setTimeout(() => navigate(redirigir), 1500);
      }
  
      return respuesta.data;
  
    } catch (error) {
      if (!error.response) {
        navigate("/error500");
        return false;
      }
  
      if (error.response.status === 400) {
        const mensajeError = error.response.data.mensaje || "Solicitud incorrecta.";
        setMensaje({ tipo: "error", texto: mensajeError }); 
        return false;
      }
  
      if (error.response.status === 404) {
        navigate("/error404");
        return false;
      }
  
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
