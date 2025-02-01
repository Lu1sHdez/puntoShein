import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import FormularioInput from "../components/form/FormularioInput";
import useFormulario from "../hooks/useFormulario";

const RecuperarPassword = () => {
  const navigate = useNavigate();

  const { datos, mensaje, handleChange, handleSubmit, loading } = useFormulario(
    { correo: "" },
    "http://localhost:4000/api/autenticacion/recuperarPassword",
    "/login"
  );

  const { texto} = mensaje;

  const validarYEnviar = async (e) => {
    e.preventDefault();

    if (!datos.correo) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Por favor, ingresa tu correo electrónico.",
        confirmButtonColor: "#d33",
      });
      return;
    }

    try {
      await handleSubmit(e);

      Swal.fire({
        icon: "success",
        title: "Correo Enviado",
        text: "Hemos enviado un enlace de recuperación a tu correo electrónico.",
        confirmButtonColor: "#3085d6",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: texto || "No se pudo enviar el correo. Intenta nuevamente.",
        confirmButtonColor: "#d33",
      });
    }
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
            {loading ? "Enviando..." : "Enviar enlace de recuperación"}
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
