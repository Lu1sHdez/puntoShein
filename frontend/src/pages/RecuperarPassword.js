import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FormularioInput from "../components/form/FormularioInput";
import useFormulario from "../hooks/useFormulario";

const RecuperarPassword = () => {
  const navigate = useNavigate();

  const { datos, handleChange, handleSubmit, loading } = useFormulario(
    { correo: "" },
    "http://localhost:4000/api/autenticacion/recuperarPassword",
    "/login",
    false
  );

  const validarYEnviar = async (e) => {
    e.preventDefault();

    if (!datos.correo) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, ingresa tu correo electrónico.",
      });
      return;
    }

    const exito = await handleSubmit(e);
    if (!exito) return; // 🚨 Si hubo un error, no continuar

    setTimeout(() => navigate("/login"), 3000);
  };

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Recuperar Contraseña</h2>

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

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
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
      </div>
    </div>
  );
};

export default RecuperarPassword;
