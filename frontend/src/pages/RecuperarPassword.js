import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormularioInput from "../components/form/FormularioInput";
import useFormulario from "../hooks/useFormulario";
import { formAnimation } from "./Funciones"; 
import { motion } from "framer-motion";


const RecuperarPassword = () => {
  const navigate = useNavigate();
  const [errorValidacion, setErrorValidacion] = useState(""); // Estado para el error
  const [errorCampos, setErrorCampos] = useState({ correo: false }); // Estados para errores en campos específicos

  const { datos, mensaje, handleChange, handleSubmit, loading } = useFormulario(
    { correo: "" },
    "http://localhost:4000/api/autenticacion/recuperarPassword",
    "/login",
    false
  );

  // 🚨 Si hay un error en el backend (como correo no registrado), se actualiza el estado de error
  useEffect(() => {
    if (mensaje.tipo === "error") {
      setErrorValidacion(mensaje.texto);
    }
  }, [mensaje]);

  const validarYEnviar = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (!datos.correo) {
      setErrorValidacion("Por favor, ingresa tu correo electrónico.");
      setErrorCampos({ correo: true });
      return;
    }

    setErrorValidacion(""); // Limpiar errores anteriores
    setErrorCampos({ correo: false }); // Resetear el error del correo

    const exito = await handleSubmit(e);
    if (!exito) return; // 🚨 Si hubo un error, no continuar con la navegación

    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <div className="flex items-center justify-center mt-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Recuperar Contraseña</h2>

        {/* Mensaje de error estático */}
        {errorValidacion && (
          <div className="mb-4 text-red-500 text-sm font-semibold text-center">
            {errorValidacion}
          </div>
        )}

        <motion.div {...formAnimation}>
        <form onSubmit={validarYEnviar} className="mt-6">
          <FormularioInput
            label="Correo Electrónico"
            type="email"
            name="correo"
            placeholder="ejemplo@dominio.com"
            value={datos.correo}
            onChange={handleChange}
            required
            error={errorCampos.correo} // Pasar el estado de error
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
          >
            Enviar enlace de recuperación
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-3 w-full text-pink-600 hover:underline"
          >
            Volver al inicio de sesión
          </button>
        </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RecuperarPassword;
