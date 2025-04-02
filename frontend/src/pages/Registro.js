import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import validaPassword from "../hooks/useValidaPassword";
import { formAnimation } from "./Funciones"; 
import { motion } from "framer-motion";
import Boton from "../elements/Boton";
import RegresarButton from "../components/Regresar";
import { API_URL } from "../ApiConexion";
import { mostrarNotificacion } from "../Animations/NotificacionSwal";



const Registro = () => {
  const [datos, setDatos] = useState({
    nombre_usuario: "",
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    telefono: "",
    correo: "",
    password: "",
    confirmPassword: "",
  });

  const [errores, setErrores] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPasswordRules, setShowPasswordRules] = useState(false);

  const navigate = useNavigate();
  const { passwordRules, validar } = validaPassword();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "telefono" && !/^\d{0,10}$/.test(value)) return;
    if (["nombre", "apellido_paterno", "apellido_materno"].includes(name) && !/^[a-zA-Z\s]*$/.test(value)) return;

    setDatos({ ...datos, [name]: value });
    setErrores({ ...errores, [name]: "" });

    if (name === "password") validar(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let mensajeError = {};
    let camposVacios = false;

    // Validar que ningún campo esté vacío
    Object.keys(datos).forEach((campo) => {
      if (!datos[campo]) {
        mensajeError[campo] = "Este campo no puede quedar vacío.";
        camposVacios = true;
      }
    });

    // Validación de nombre de usuario
    const usernameRegex = /^[A-Za-z\d]{5,20}$/;
    if (!usernameRegex.test(datos.nombre_usuario)) {
      mensajeError.nombre_usuario = "Usa el ejemplo: usuario1234";
    }

    // Si hay campos vacíos, establecer un error general
    if (camposVacios) {
      mensajeError.general = "Todos los campos son obligatorios.";
    }

    // Validación de nombre, apellido paterno y apellido materno (mínimo 3 caracteres)
    ["nombre", "apellido_paterno", "apellido_materno"].forEach((campo) => {
      if (datos[campo] && datos[campo].length < 3) {
        mensajeError[campo] = "Debe tener al menos 3 letras.";
      }
    });

    // Validación de teléfono
    if (datos.telefono && !/^\d{10}$/.test(datos.telefono)) {
      mensajeError.telefono = "El teléfono debe tener exactamente 10 dígitos.";
    }

    // Validación del correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (datos.correo && !emailRegex.test(datos.correo)) {
      mensajeError.correo = "El correo no tiene un formato válido.";
    }

    // Validación de contraseñas
    if (datos.password !== datos.confirmPassword) {
      mensajeError.confirmPassword = "Las contraseñas no coinciden.";
    }

    // Validación de reglas de contraseña
    if (!Object.values(passwordRules).every(Boolean)) {
      mensajeError.password = "La contraseña no cumple con los requisitos.";
    }

    // Si hay errores, detener el envío y mostrar los mensajes
    if (Object.keys(mensajeError).length > 0) {
      setErrores(mensajeError);

      // Establecer el foco en el primer campo con error
      const firstErrorField = Object.keys(mensajeError)[0];
      document.querySelector(`[name=${firstErrorField}]`).focus();

      return;
    }

    try {
      await axios.post(`${API_URL}/api/autenticacion/registro`, datos);

      
      setErrores({ general: mostrarNotificacion("success", "Registro exitoso. Redirigiendo...") });
      setTimeout(() => navigate("/login"), 1000); 
    } catch (error) {
      const mensajeError = error.response?.data?.mensaje;

      if (mensajeError === "El correo ya está registrado.") {
        setErrores({ correo: mensajeError });
      } else if (mensajeError === "El nombre de usuario ya existe. Intenta con otro") {
        setErrores({ nombre_usuario: mensajeError });
      } else if (mensajeError === "El teléfono ya está registrado.") {
        setErrores({ telefono: mensajeError });
      } else {
        setErrores({ general: mensajeError || "Error en el registro." });
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-0">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Registrarse</h2>

        {errores.general && <p className="text-red-500 text-sm text-center mb-2">{errores.general}</p>}

        <motion.div {...formAnimation}>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: "Usuario", name: "nombre_usuario", type: "text", placeholder: "Usuario12345" },
            { label: "Nombre", name: "nombre", type: "text", placeholder: "Nombre" },
            { label: "Apellido Paterno", name: "apellido_paterno", type: "text", placeholder: "Apellido paterno" },
            { label: "Apellido Materno", name: "apellido_materno", type: "text", placeholder: "Apellido materno" },
            { label: "Teléfono", name: "telefono", type: "text", placeholder: "0123456789", maxLength: "10" },
            { label: "Correo", name: "correo", type: "text", placeholder: "ejemplo@dominio.com" },
          ].map(({ label, name, type, placeholder, maxLength }) => (
            <div key={name} className="flex flex-col">
              <label className="text-gray-700 text-sm">{label}</label>
              <input
                type={type}
                name={name}
                value={datos[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-pink-400 ${
                  errores[name] ? "border-red-500" : ""
                }`}
                maxLength={maxLength}
              />
              {errores[name] && <span className="text-red-500 text-xs">{errores[name]}</span>}
            </div>
          ))}

          {/* Contraseña */}
          <div className="flex flex-col relative">
            <label className="text-gray-700 text-sm">Contraseña</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Mínimo 8 caracteres"
              value={datos.password}
              onChange={handleChange}
              className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-pink-400 ${
                errores.password ? "border-red-500" : ""
              }`}
              onFocus={() => setShowPasswordRules(true)} //Mostrar la regla
              onBlur={()=> setShowPasswordRules(false)} //Ocultar Regla
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-7">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
            {errores.password && <span className="text-red-500 text-xs">{errores.password}</span>}
          </div>

          {/* Confirmar Contraseña */}
          <div className="flex flex-col relative">
            <label className="text-gray-700 text-sm">Confirmar Contraseña</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirma la contraseña"
              value={datos.confirmPassword}
              onChange={handleChange}
              className={`px-3 py-2 border rounded-md focus:ring-2 focus:ring-pink-400 ${
                errores.confirmPassword ? "border-red-500" : ""
              }`}
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-7">
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </button>
            {errores.confirmPassword && <span className="text-red-500 text-xs">{errores.confirmPassword}</span>}
          </div>

          {/* Reglas de contraseña */}
          {showPasswordRules && (
            <div className="col-span-2 text-xs text-gray-600">
              {[ 
                { text: "Mínimo 8 caracteres", valid: passwordRules.length },
                { text: "Al menos una mayúscula", valid: passwordRules.uppercase },
                { text: "Al menos una minúscula", valid: passwordRules.lowercase },
                { text: "Al menos un número", valid: passwordRules.number },
                { text: "Al menos un carácter especial (@$!%*?&)", valid: passwordRules.specialChar },
              ].map(({ text, valid }, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <p className={`flex-1 ${valid ? 'text-black' : 'text-gray-600'}`}>
                    {/* Íconos para mostrar el cumplimiento */}
                    {valid ? (
                      <span className="text-green-500">✔</span> // Ícono de verificación
                    ) : (
                      <span className="text-red-500">❌</span> // Ícono de error
                    )}
                    {text}
                  </p>
                  {/* Puedes agregar más estilos, como subrayar o tachar las reglas */}
                  <div className={valid ? 'border-b-2 border-green-500' : ''}></div>
                </div>
              ))}
            </div>
          )}

          {/* Botón de registro */}
          <div className="col-span-2 flex justify-center mt-2">
            <Boton
              texto="Registrarse"
              onClick={handleSubmit}
              estiloPersonalizado="w-full bg-pink-600 text-white px-6 py-2 rounded-md hover:bg-pink-700 transition"
            />
          </div>


          {/* Si el usuario ya tiene una cuenta */}
          <div className="col-span-2 text-center mt-4">
            <p className="text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link to="/login" className="text-pink-600 hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </form>
        <RegresarButton/>
        </motion.div>
      </div>
    </div>
  );
};

export default Registro;
