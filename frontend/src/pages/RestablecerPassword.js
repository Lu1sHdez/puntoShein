import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormularioInput from "../components/form/FormularioInput";
import useFormulario from "../hooks/useFormulario";

const RestablecerPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState(""); // ⚠️ Estado para errores

  // Obtener token de la URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const { datos, mensaje, handleChange, handleSubmit, loading } = useFormulario(
    { nuevaContrasena: "", confirmarContrasena: "", token },
    "http://localhost:4000/api/autenticacion/restablecerPassword",
    "/login"
  );

  // ⚠️ Actualizar el mensaje de error si viene del backend
  useEffect(() => {
    if (mensaje.tipo === "error") {
      setErrorValidacion(mensaje.texto);
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

        {/* ⚠️ Mensaje de error estático arriba del formulario */}
        {errorValidacion && (
          <div className="mb-4 text-red-500 text-sm font-semibold text-center">
            {errorValidacion}
          </div>
        )}

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

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Restablecer Contraseña
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-3 w-full text-pink-600 hover:underline"
          >
            Volver al inicio de sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestablecerPassword;
