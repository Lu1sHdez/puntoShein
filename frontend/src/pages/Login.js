import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormularioInput from "../components/form/FormularioInput";
import useFormulario from "../hooks/useFormulario";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState(""); // Estado para error

  // ✅ Se indica que es un formulario de autenticación
  const { datos, mensaje, handleChange, handleSubmit, loading } = useFormulario(
    { correo: "", password: "" },
    "http://localhost:4000/api/autenticacion/login",
    "/",
    true
  );

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (mensaje.texto) {
      setErrorValidacion(mensaje.texto); // ✅ Detecta el cambio y actualiza el estado
    }
  }, [mensaje.texto]);

  const validarYEnviar = async (e) => {
    e.preventDefault();
    if (!datos.correo || !datos.password) {
      setErrorValidacion("El correo y la contraseña son obligatorios.");
      return;
    }
  
    setErrorValidacion(""); // Limpiar errores anteriores
    await handleSubmit(e);
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Iniciar Sesión</h2>

        {/* 🛑 Mensaje de error estático en rojo arriba de los inputs */}
        {errorValidacion && (
          <div className="mb-4 text-red-500 text-sm font-semibold text-center">
            {errorValidacion}
          </div>
        )}

        <form onSubmit={validarYEnviar} className="mt-6">
          <FormularioInput
            label="Correo Electrónico"
            type="email"
            name="correo"
            placeholder="ejemplo@dominio.com"
            value={datos.correo}
            onChange={handleChange}
            required
          />

          <FormularioInput
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="**************"
            value={datos.password}
            onChange={handleChange}
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
            required
          />

          <div className="mt-3 text-right">
            <button
              type="button"
              onClick={() => navigate("/recuperarPassword")}
              className="text-sm text-pink-600 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Iniciar sesión
          </button>

          <button
            type="button"
            onClick={() => navigate("/registro")}
            className="mt-3 w-full text-pink-600 hover:underline"
          >
            ¿No tienes cuenta? Regístrate aquí
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
