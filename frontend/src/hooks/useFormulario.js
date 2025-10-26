import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { mostrarNotificacion } from "../Animations/NotificacionSwal";

/**
 * Hook reutilizable para manejar formularios con Axios
 * @param {object} initialState - Estado inicial del formulario
 * @param {string} url - URL del endpoint a enviar
 * @param {string|null} redirigir - Ruta de redirección después de éxito
 * @param {boolean} isAuthForm - Si el formulario maneja autenticación (login/register)
 * @param {string} metodo - Método HTTP (POST por defecto)
 */
const useFormulario = (
  initialState,
  url,
  redirigir = null,
  isAuthForm = false,
  metodo = "POST"
) => {
  const [datos, setDatos] = useState(initialState);
  const [mensaje, setMensaje] = useState({ tipo: "", texto: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // === Actualizar campos ===
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatos((prev) => ({ ...prev, [name]: value }));
  };

  // === Enviar formulario ===
  const handleSubmit = async (e, datosExtra = {}) => {
    e.preventDefault();
    setLoading(true);
    setMensaje({ tipo: "", texto: "" });

    try {
      const config = { withCredentials: true };
      const payload = { ...datos, ...datosExtra };
      const metodoHttp = metodo.toUpperCase();

      let respuesta;
      switch (metodoHttp) {
        case "POST":
          respuesta = await axios.post(url, payload, config);
          break;
        case "PUT":
          respuesta = await axios.put(url, payload, config);
          break;
        case "PATCH":
          respuesta = await axios.patch(url, payload, config);
          break;
        case "DELETE":
          respuesta = await axios.delete(url, { data: payload, ...config });
          break;
        default:
          throw new Error(`Método HTTP no soportado: ${metodo}`);
      }

      // === Si es autenticación ===
      if (isAuthForm) {
        localStorage.setItem("token", respuesta.data.token);
        return respuesta.data;
      }

      // === Notificación genérica y redirección ===
      mostrarNotificacion("success", "Proceso realizado exitosamente");
      if (redirigir) {
        setTimeout(() => navigate(redirigir), 1200);
      }

      return respuesta.data;
    } catch (error) {
      console.error("Error en la solicitud:", error);

      if (!error.response) {
        navigate("/error500");
        return false;
      }

      const { status, data } = error.response;

      if (status === 400) {
        setMensaje({
          tipo: "error",
          texto: data?.mensaje || "Los datos enviados no son válidos.",
        });
        return false;
      }

      if (status === 401) {
        setMensaje({
          tipo: "error",
          texto: "No autorizado. Verifica tus credenciales.",
        });
        return false;
      }

      if (status === 404) {
        navigate("/error404");
        return false;
      }

      setMensaje({
        tipo: "error",
        texto: data?.mensaje || "Error inesperado al procesar la solicitud.",
      });

      return false;
    } finally {
      setLoading(false);
    }
  };

  return { datos, mensaje, handleChange, handleSubmit, loading };
};

export default useFormulario;
