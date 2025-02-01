import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; 
import FormularioInput from "../components/form/FormularioInput";
import useFormulario from "../hooks/useFormulario";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);


  const { datos, mensaje, handleChange, handleSubmit, loading } = useFormulario(
    { correo: "", password: "" },
    "http://localhost:4000/api/autenticacion/login",
    "/"
  );

  // Desestructurar mensaje
  const { texto, tipo } = mensaje;

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, [navigate]);

  useEffect(() => {
    if (texto) {
      Swal.fire({
        icon: tipo === "success" ? "success" : "error",
        title: tipo === "success" ? "¡Éxito!" : "Error",
        text: texto,
        showConfirmButton: false,
        timer: 2000, 
      });

      if (tipo === "success") {
        setTimeout(() => navigate("/"), 2000);
      }
    }
  }, [texto, tipo, navigate]);

  const inputType = showPassword ? "text" : "password"; // Helper para tipo de input

  return (
    <div className="flex items-center justify-center mt-10">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Iniciar Sesión</h2>

        <form onSubmit={handleSubmit} className="mt-6">
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
            type={inputType}
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
            {loading ? "Cargando..." : "Iniciar Sesión"}
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
