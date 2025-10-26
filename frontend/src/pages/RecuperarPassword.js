import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import FormularioInput from "../components/form/FormularioInput";
import useFormulario from "../hooks/useFormulario";
import { formAnimation } from "./Funciones";
import Boton from "../elements/Boton";
import { API_URL } from "../ApiConexion";
import CargandoModal from "../Animations/CargandoModal";

const RecuperarPassword = () => {
  const navigate = useNavigate();
  const [errorValidacion, setErrorValidacion] = useState("");
  const [errorCampos, setErrorCampos] = useState({ correo: false });

  const { datos, mensaje, handleChange, handleSubmit, loading } = useFormulario(
    { correo: "" },
    `${API_URL}/api/autenticacion/recuperarPassword`,
    `/login`,
    false
  );

  useEffect(() => {
    if (mensaje.tipo === "error") {
      setErrorValidacion(mensaje.texto);
    }
  }, [mensaje]);

  const validarYEnviar = async (e) => {
    e.preventDefault();

    if (!datos.correo) {
      setErrorValidacion("Por favor, ingresa tu correo electrónico.");
      setErrorCampos({ correo: true });
      return;
    }

    setErrorValidacion("");
    setErrorCampos({ correo: false });

    const exito = await handleSubmit(e);
    if (!exito) return;

    setTimeout(() => navigate("/login"), 1500);
  };

  return (
    <section className="min-h-screen flex flex-col justify-start sm:justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 mt-4 sm:mt-0"
      >
        {loading && <CargandoModal mensaje="Enviando enlace de recuperación..." visible />}

        {/* Título y descripción */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Recuperar Contraseña
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Ingresa el correo asociado a tu cuenta y te enviaremos un enlace para restablecer tu contraseña.
        </p>

        {/* Error */}
        {errorValidacion && (
          <div className="mb-4 text-red-500 text-sm font-semibold text-center">
            {errorValidacion}
          </div>
        )}

        {/* Formulario */}
        <motion.form onSubmit={validarYEnviar} {...formAnimation} className="space-y-4">
          <FormularioInput
            label="Correo Electrónico"
            type="email"
            name="correo"
            placeholder="ejemplo@dominio.com"
            value={datos.correo}
            onChange={handleChange}
            error={errorCampos.correo}
          />

          <Boton
            texto="Enviar enlace de recuperación"
            tipo="submit"
            estiloPersonalizado={`btn-principal w-full py-2.5 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          />

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="block w-full text-sm text-blue-600 hover:underline text-center mt-3"
          >
            Volver al inicio de sesión
          </button>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default RecuperarPassword;
