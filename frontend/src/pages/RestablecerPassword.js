import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import FormularioInput from "../components/form/FormularioInput";
import useFormulario from "../hooks/useFormulario";
import { formAnimation } from "./Funciones";
import Boton from "../elements/Boton";
import { API_URL } from "../ApiConexion";
import CargandoModal from "../Animations/CargandoModal";

const RestablecerPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState("");
  const [tiempoRestante, setTiempoRestante] = useState("");
  const [isError, setIsError] = useState(false);

  // Obtener token de la URL
  const consulta = new URLSearchParams(location.search);
  const token = consulta.get("token");

  const { datos, mensaje, handleChange, handleSubmit, loading } = useFormulario(
    { nuevaContrasena: "", confirmarContrasena: "", token },
    `${API_URL}/api/autenticacion/restablecerPassword`,
    `/login`,
    false
  );

  useEffect(() => {
    if (mensaje.tipo === "error") {
      if (mensaje.texto.includes("intentalo en")) {
        setIsError(true);
        setTiempoRestante(mensaje.texto);
      } else {
        setErrorValidacion(mensaje.texto);
        setIsError(false);
      }
    }
  }, [mensaje]);

  const validarYEnviar = async (e) => {
    e.preventDefault();

    if (datos.nuevaContrasena !== datos.confirmarContrasena) {
      setErrorValidacion("Las contraseñas no coinciden.");
      return;
    }

    const regexContrasena =
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!regexContrasena.test(datos.nuevaContrasena)) {
      setErrorValidacion(
        "La contraseña debe tener al menos 8 caracteres, incluyendo una mayúscula, una minúscula, un número y un carácter especial."
      );
      return;
    }

    setErrorValidacion("");
    await handleSubmit(e);
  };

  return (
    <section className="min-h-screen flex flex-col justify-start sm:justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 mt-4 sm:mt-0"
      >
        {loading && (
          <CargandoModal
            mensaje="Restableciendo contraseña..."
            visible={loading}
          />
        )}

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Restablecer Contraseña
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Ingresa una nueva contraseña segura para tu cuenta.
        </p>

        {/* Mensajes de error */}
        {isError && (
          <div className="mb-4 text-red-500 text-sm font-semibold text-center">
            {tiempoRestante}
          </div>
        )}
        {errorValidacion && !isError && (
          <div className="mb-4 text-red-500 text-sm font-semibold text-center">
            {errorValidacion}
          </div>
        )}

        <motion.form onSubmit={validarYEnviar} {...formAnimation}>
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

          <FormularioInput
            label="Confirmar Contraseña"
            type={showConfirmPassword ? "text" : "password"}
            name="confirmarContrasena"
            placeholder="Confirma tu nueva contraseña"
            value={datos.confirmarContrasena}
            onChange={handleChange}
            showPassword={showConfirmPassword}
            togglePassword={() =>
              setShowConfirmPassword(!showConfirmPassword)
            }
            required
          />

          <Boton
            texto="Restablecer Contraseña"
            tipo="submit"
            estiloPersonalizado="btn-principal w-full mt-4"
            disabled={loading}
          />

          <Boton
            texto="Volver al inicio de sesión"
            onClick={() => navigate("/login")}
            estiloPersonalizado="w-full text-blue-600 hover:underline mt-2"
          />
        </motion.form>
      </motion.div>
    </section>
  );
};

export default RestablecerPassword;
