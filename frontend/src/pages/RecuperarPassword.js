import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FormularioInput from "../components/form/FormularioInput";
import useFormulario from "../hooks/useFormulario";
import { formAnimation } from "./Funciones";
import { motion } from "framer-motion";
import Boton from "../elements/Boton";
import { API_URL } from "../ApiConexion";

const RecuperarPassword = () => {
  const navigate = useNavigate();
  const [errorValidacion, setErrorValidacion] = useState(""); // Estado para el error
  const [errorCampos, setErrorCampos] = useState({ correo: false }); // Estados para errores en campos específicos

  const { datos, mensaje, handleChange, handleSubmit, loading } = useFormulario(
    { correo: "" },
    `${API_URL}/api/autenticacion/recuperarPassword`,
    `/login`,
    false
  );

  useEffect(() => {
    if (mensaje.tipo === "error") {
      setErrorValidacion(mensaje.texto); // Mostrar el mensaje de error
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
    if (!exito) return; // Si hubo un error, no continuar con la navegación

    setTimeout(() => navigate("/login"), 1500); // Redirigir después de un pequeño retraso
  };

  return (
    <div className="flex items-center justify-center mt-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Recuperar Contraseña (Correo)</h2>

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
              error={errorCampos.correo} // Pasar el estado de error
            />

            <Boton
              texto="Enviar enlace de recuperación"
              type="submit"
              estiloPersonalizado="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
              disabled={loading}
            />
            <Boton
              texto="Recuperar por teléfono"
              onClick={() => navigate("/solicitarPasswordTelefono")}
              estiloPersonalizado="mt-3 w-full text-blue-600 hover:underline"
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

export default RecuperarPassword;
