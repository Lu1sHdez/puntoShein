import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ReCAPTCHA from "react-google-recaptcha";
import FormularioInput from "../components/form/FormularioInput";
import useFormulario from "../hooks/useFormulario";
import { formAnimation } from "./Funciones";
import Boton from "../elements/Boton";
import { API_URL } from "../ApiConexion";
import CargandoModal from "../Animations/CargandoModal";

const siteKey = process.env.REACT_APP_RECAPTCHA_SITE_KEY;

const Login = () => {
  const navigate = useNavigate();
  const [captchaToken, setCaptchaToken] = useState(null);
  const recaptchaRef = useRef(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState("");
  const [errorCampos, setErrorCampos] = useState({ correo: false, password: false });

  const { datos, mensaje, handleChange, handleSubmit, loading } = useFormulario(
    { correo: "", password: "" },
    `${API_URL}/api/autenticacion/login`,
    `/`,
    true
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (mensaje.texto) {
      setErrorValidacion(mensaje.texto);
    }
  }, [mensaje.texto]);

  const validarYEnviar = async (e) => {
    e.preventDefault();

    if (!datos.correo || !datos.password) {
      setErrorValidacion("El correo y la contraseña son obligatorios.");
      setErrorCampos({
        correo: !datos.correo,
        password: !datos.password,
      });
      return;
    }

    if (!captchaToken) {
      setErrorValidacion("Por favor verifica que no eres un robot.");
      return;
    }

    setErrorValidacion("");
    setErrorCampos({ correo: false, password: false });

    const resultado = await handleSubmit(e, { tokenRecaptcha: captchaToken });

    if (resultado && resultado.token && resultado.usuario) {
      const { token, usuario } = resultado;
      localStorage.setItem("token", token);

      if (usuario.rol === "administrador") navigate("/admin/dashboard");
      else if (usuario.rol === "usuario") navigate("/cuerpo");
      else navigate("/");
    }

    if (!resultado || !resultado.token || !resultado.usuario) {
      setCaptchaToken(null);
      recaptchaRef.current?.reset();
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-start sm:justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 mt-4 sm:mt-0"
      >
        {loading && <CargandoModal mensaje="Iniciando sesión..." visible />}

        <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">
          Iniciar Sesión
        </h2>
        <p className="text-center text-gray-500 mb-6 text-sm">
          Bienvenido de nuevo. Ingresa tus datos para continuar.
        </p>

        {errorValidacion && (
          <div className="mb-4 text-red-500 text-sm font-semibold text-center">
            {errorValidacion}
          </div>
        )}

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

          <FormularioInput
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="********"
            value={datos.password}
            onChange={handleChange}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
            error={errorCampos.password}
          />

          <div className="flex justify-center mt-4">
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={siteKey}
              onChange={(token) => setCaptchaToken(token)}
            />
          </div>

          <div className="mt-3 text-right">
            <button
              type="button"
              onClick={() => navigate("/opcionRestablecimiento")}
              className="text-sm text-blue-600 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <Boton
            texto="Iniciar sesión"
            onClick={validarYEnviar}
            estiloPersonalizado={`btn-principal w-full py-2.5 mt-2 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          />

          <button
            type="button"
            onClick={() => navigate("/registro")}
            className="block w-full text-sm text-blue-600 hover:underline text-center mt-3"
          >
            ¿No tienes cuenta? Regístrate aquí
          </button>
        </motion.form>
      </motion.div>
    </section>

  );
};

export default Login;
