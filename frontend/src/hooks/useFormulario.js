import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

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

    // Validar que todos los campos estén llenos
    if (Object.values(datos).some((campo) => !campo)) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios.",
      });
      setLoading(false);
      return false;
    }

    try {
      const respuesta = await axios.post(url, datos, { withCredentials: true });

      // ✅ Si es un formulario de autenticación (Login o Registro)
      if (isAuthForm) {
        await Swal.fire({
          icon: "success",
          title: "Inicio de sesión exitoso",
          text: "Operación exitosa, redirigiendo...",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        // Guardar el token en localStorage
        localStorage.setItem("token", respuesta.data.token);

        // Redirigir después de 2 segundos
        setTimeout(() => navigate(redirigir), 1500);
      } else {
        // ✅ Formulario de recuperación o restablecimiento de contraseña
        await Swal.fire({
          icon: "success",
          title: "Operación exitosa",
          text: respuesta.data.mensaje || "Proceso realizado correctamente.",
          confirmButtonColor: "#3085d6",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        // Redirigir después de 3 segundos si todo salió bien
        setTimeout(() => navigate(redirigir), 1500);
      }

      return true; // ✅ Indica que la operación fue exitosa
    } catch (error) {
      // 🚨 Si el backend no responde (Error 500)
      if (!error.response) {
        navigate("/error500");
        return false;
      }
      

      if (error.response.status === 400) {
        const mensajeError = error.response.data.mensaje || "Solicitud incorrecta.";
      
        // ✅ Si el error es por credenciales incorrectas en Login, mostrar alerta y NO redirigir
        if (mensajeError === "Correo o contraseña incorrectos.") {
          setMensaje({ tipo: "error", texto: mensajeError }); // ✅ Guardar mensaje en el estado
          return false; // 🚨 Evita que el formulario actúe como si fue exitoso
        }
      
        // ✅ Si el error es en recuperación/restablecimiento de contraseña, mostrar alerta en vez de redirigir
        if (
          mensajeError.includes("Correo no registrado") ||
          mensajeError.includes("Token inválido") ||
          mensajeError.includes("contraseña debe tener mínimo")
        ) {
          setMensaje({ tipo: "error", texto: mensajeError });
          return false;
        }
      
        // 🚨 Otros errores 400 sí redirigen a la página de error
        navigate("/error400");
        return false;
      }
      

      // 🚨 Si el recurso no existe (Error 404)
      if (error.response.status === 404) {
        navigate("/error404");
        return false;
      }

      // 🚨 Otros errores no manejados explícitamente
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
