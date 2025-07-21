import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormularioInput from "../components/form/FormularioInput";
import useFormulario from "../hooks/useFormulario";
import { formAnimation } from "./Funciones";
import { motion } from "framer-motion";
import Boton from "../elements/Boton";
import { API_URL } from "../ApiConexion";

const RestablecerPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState(""); // Estado para errores
  const [tiempoRestante, setTiempoRestante] = useState(""); // Estado para tiempo restante
  const [isError, setIsError] = useState(false); // Estado para manejar errores desde el backend

  // Obtener token de la URL
  const consulta = new URLSearchParams(location.search);
  const token = consulta.get("token");

  const { datos, mensaje, handleChange, handleSubmit, loading } = useFormulario(
    { nuevaContrasena: "", confirmarContrasena: "", token },
    `${API_URL}/api/autenticacion/restablecerPassword`,
    `/login`
  );

  useEffect(() => {
    if (mensaje.tipo === "error") {
      // Si el mensaje de error contiene un tiempo de espera, lo guardamos en el estado correspondiente
      if (mensaje.texto.includes("intentalo en")) {
        setIsError(true);
        setTiempoRestante(mensaje.texto); // Guardar el mensaje del tiempo restante
      } else {
        setErrorValidacion(mensaje.texto); // Mostrar otros mensajes de error
        setIsError(false); // Restablecer estado de error
      }
    }
  }, [mensaje]);
  

  const validarYEnviar = async (e) => {
    e.preventDefault();

    if (datos.nuevaContrasena !== datos.confirmarContrasena) {
      setErrorValidacion("Las contraseñas no coinciden.");
      return;
    }

    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(datos.nuevaContrasena)) {
      setErrorValidacion(
        "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
      );
      return;
    }

    setErrorValidacion(""); // Limpiar errores anteriores
    await handleSubmit(e);
  };

  return (
    <div className="flex items-center justify-center mt-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Restablecer Contraseña</h2>

        {/* Mensaje de error estático arriba del formulario */}
        {isError && (
          <div className="mb-4 text-red-500 text-sm font-semibold text-center">
            {tiempoRestante} {/* Mostrar el mensaje de tiempo restante */}
          </div>
        )}
        {errorValidacion && !isError && (
          <div className="mb-4 text-red-500 text-sm font-semibold text-center">
            {errorValidacion}
          </div>
        )}

        <motion.div {...formAnimation}>
          <form onSubmit={validarYEnviar} className="mt-6">
            {/* Nueva Contraseña */}
            <FormularioInput
              label="Nueva Contraseña"
              type={showPassword ? "text" : "password"}
              name="nuevaContrasena"
              placeholder="Ingresa tu nueva contraseña"
              value={datos.nuevaContrasena}
              onChange={handleChange}
              showPassword={showPassword}
              togglePassword={() => setShowPassword(!showPassword)}
              required
            />

            {/* Confirmar Contraseña */}
            <FormularioInput
              label="Confirmar Contraseña"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmarContrasena"
              placeholder="Confirma tu nueva contraseña"
              value={datos.confirmarContrasena}
              onChange={handleChange}
              showPassword={showConfirmPassword}
              togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
              required
            />

            <Boton
              texto="Restablecer Contraseña"
              type="submit"
              disabled={loading}
              className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
            />

            <Boton
              texto="Volver al inicio de sesión"
              onClick={() => navigate("/login")}
              estiloPersonalizado="mt-3 w-full text-pink-600 hover:underline"
            />
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RestablecerPassword;
