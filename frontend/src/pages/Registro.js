import React, { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import validaPassword from "../hooks/useValidaPassword";

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

    if (name === "password") validar(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{10}$/.test(datos.telefono)) {
      Swal.fire({ icon: "error", title: "Error", text: "El teléfono debe tener exactamente 10 dígitos." });
      return;
    }

    if (datos.password !== datos.confirmPassword) {
      Swal.fire({ icon: "error", title: "Error", text: "Las contraseñas no coinciden." });
      return;
    }

    if (!Object.values(passwordRules).every(Boolean)) {
      Swal.fire({ icon: "error", title: "Error", text: "La contraseña no cumple con los requisitos." });
      return;
    }

    try {
      await axios.post("http://localhost:4000/api/autenticacion/registro", datos);

      Swal.fire({
        icon: "success",
        title: "Registro exitoso",
        text: "Serás redirigido...",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      Swal.fire({ icon: "error", title: "Error", text: error.response?.data?.mensaje || "Error en el registro." });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-semibold text-center text-gray-700 mb-4">Registrarse</h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            { label: "Usuario", name: "nombre_usuario", type: "text", placeholder: "Nombre de usuario" },
            { label: "Nombre", name: "nombre", type: "text", placeholder: "Nombre" },
            { label: "Apellido Paterno", name: "apellido_paterno", type: "text", placeholder: "Apellido paterno" },
            { label: "Apellido Materno", name: "apellido_materno", type: "text", placeholder: "Apellido materno" },
            { label: "Teléfono", name: "telefono", type: "text", placeholder: "0123456789", pattern: "[0-9]{10}", maxLength: "10" },
            { label: "Correo", name: "correo", type: "email", placeholder: "ejemplo@dominio.com" },
          ].map(({ label, name, type, placeholder, pattern, maxLength }) => (
            <div key={name} className="flex flex-col">
              <label className="text-gray-700 text-sm">{label}</label>
              <input
                type={type}
                name={name}
                value={datos[name]}
                onChange={handleChange}
                placeholder={placeholder}
                className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
                required
                pattern={pattern}
                maxLength={maxLength}
              />
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
              className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              onFocus={() => setShowPasswordRules(true)}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-7">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </button>
          </div>

          {/* Confirmar Contraseña */}
          <div className="flex flex-col relative">
            <label className="text-gray-700 text-sm">Confirmar Contraseña</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="Repite la contraseña"
              value={datos.confirmPassword}
              onChange={handleChange}
              className="px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-400"
              required
            />
            <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-7">
              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
            </button>
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
                <p key={index} className={valid ? "text-green-500" : "text-red-500"}>
                  🔹 {text}
                </p>
              ))}
            </div>
          )}

          {/* Botón de registro */}
          <div className="col-span-2 flex justify-center mt-2">
            <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition">
              Registrarse
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registro;
