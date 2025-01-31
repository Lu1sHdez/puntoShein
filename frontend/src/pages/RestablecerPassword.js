import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import FormularioInput from "../components/form/FormularioInput";
import useFormulario from "../hooks/useFormulario";

const RestablecerPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Obtener token de la URL
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  const { datos, mensaje, handleChange, handleSubmit, loading } = useFormulario(
    { nuevaContrasena: "", confirmarContrasena: "", token },
    "http://localhost:4000/api/autenticacion/restablecerPassword",
    "/login"
  );

  const { texto, tipo } = mensaje;

  const validarYEnviar = async (e) => {
    e.preventDefault();

    if (datos.nuevaContrasena !== datos.confirmarContrasena) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Las contraseñas no coinciden.",
      });
      return;
    }

    await handleSubmit(e); // Ejecuta el envío solo si las contraseñas coinciden
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Restablecer Contraseña</h2>

        {texto && (
          <div
            className={`mt-4 p-2 text-sm text-white text-center rounded ${
              tipo === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {texto}
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
            className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Restableciendo..." : "Restablecer Contraseña"}
          </button>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="mt-3 w-full text-blue-600 hover:underline"
          >
            Volver al inicio de sesión
          </button>
        </form>
      </div>
    </div>
  );
};

export default RestablecerPassword;
