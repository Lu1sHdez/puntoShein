import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FormularioInput from "../components/form/FormularioInput";
import useFormulario from "../hooks/useFormulario";
import { formAnimation } from "./Funciones"; 
import { motion } from "framer-motion";
import Boton from "../elements/Boton";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [errorValidacion, setErrorValidacion] = useState(""); // Estado para error
  const [errorCampos, setErrorCampos] = useState({ correo: false, password: false }); // Estados para errores en campos específicos

  //  Se indica que es un formulario de autenticación
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
      setErrorValidacion(mensaje.texto); //  Detecta el cambio y actualiza el estado
    }
  }, [mensaje.texto]);

  //Funcion sincrona
  const validarYEnviar = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if (!datos.correo || !datos.password) {
      setErrorValidacion("El correo y la contraseña son obligatorios.");
      setErrorCampos({
        correo: !datos.correo, 
        password: !datos.password, 
      });
      return;
    }

    //Sincrona
    setErrorValidacion(""); // Limpiar el mensaje de error
    setErrorCampos({ correo: false, password: false }); // Resetear los errores en los campos

    // Función asíncrona envia datos de sesion al servidor
    const success = await handleSubmit(e); 

    if(success){
      if (success.token) {  // Asegúrate de que la respuesta contiene el token
        localStorage.setItem("token", success.token);
      }
      
      window.location.reload(); // Después de que se resuelve la operación asincrónica
    }
    
  };

  return (
    <div className="flex items-center justify-center mt-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Iniciar Sesión</h2>

        {/* Mensaje de error estático en rojo arriba de los inputs */}
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
            error={errorCampos.correo} // Agregar propiedad error
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
            error={errorCampos.password} // Agregar propiedad error
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

          <Boton
              texto="Iniciar sesión"
              onClick={validarYEnviar}
              estiloPersonalizado={`w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />

          <button
            type="button"
            onClick={() => navigate("/registro")}
            className="mt-3 w-full text-pink-600 hover:underline"
          >
            ¿No tienes cuenta? Regístrate aquí
          </button>
        </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
