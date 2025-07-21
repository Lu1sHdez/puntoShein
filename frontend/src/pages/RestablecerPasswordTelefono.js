import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormularioInput from "../components/form/FormularioInput";
import Boton from "../elements/Boton";
import { motion } from "framer-motion";
import { formAnimation } from "./Funciones";
import { API_URL } from "../ApiConexion";

const RestablecerPasswordTelefono = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const telefono = params.get("telefono");
  const codigo = params.get("codigo");

  const [nuevaContrasena, setNuevaContrasena] = useState("");
  const [confirmarContrasena, setConfirmarContrasena] = useState("");
  const [errorValidacion, setErrorValidacion] = useState("");
  const [loading, setLoading] = useState(false);
  const [mostrarNuevaContrasena, setMostrarNuevaContrasena] = useState(false);
  const [mostrarConfirmarContrasena, setMostrarConfirmarContrasena] = useState(false);

  const actualizarPassword = async (e) => {
    e.preventDefault();

    const regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;

    if (!nuevaContrasena || !confirmarContrasena) {
      setErrorValidacion("Todos los campos son obligatorios.");
      return;
    }

    if (!regex.test(nuevaContrasena)) {
      setErrorValidacion(
        "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial."
      );
      return;
    }

    if (nuevaContrasena !== confirmarContrasena) {
      setErrorValidacion("Las contraseñas no coinciden.");
      return;
    }

    setLoading(true);
    setErrorValidacion("");

    try {
      const respuesta = await fetch(`${API_URL}/api/autenticacion/actualizarPasswordTelefono`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telefono,
          codigo,
          nuevaContrasena,
          confirmarContrasena,
        }),
      });

      const data = await respuesta.json();
      if (!respuesta.ok) {
        setErrorValidacion(data.mensaje);
      } else {
        navigate("/login");
      }
    } catch (error) {
      setErrorValidacion("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Restablecer Contraseña
        </h2>

        {errorValidacion && (
          <div className="text-red-500 text-sm font-semibold text-center mt-4">
            {errorValidacion}
          </div>
        )}

        <motion.div {...formAnimation}>
          <form onSubmit={actualizarPassword} className="mt-6 space-y-4">
            <FormularioInput
              label="Nueva Contraseña"
              type="password"
              name="nuevaContrasena"
              value={nuevaContrasena}
              onChange={(e) => setNuevaContrasena(e.target.value)}
              placeholder="***************"
              showPassword={mostrarNuevaContrasena}
              togglePassword={() => setMostrarNuevaContrasena(!mostrarNuevaContrasena)}
              error={!nuevaContrasena && errorValidacion !== ""}
            />

            <FormularioInput
              label="Confirmar Contraseña"
              type="password"
              name="confirmarContrasena"
              value={confirmarContrasena}
              onChange={(e) => setConfirmarContrasena(e.target.value)}
              placeholder="***************"
              showPassword={mostrarConfirmarContrasena}
              togglePassword={() => setMostrarConfirmarContrasena(!mostrarConfirmarContrasena)}
              error={!confirmarContrasena && errorValidacion !== ""}
            />

            <Boton
              texto="Actualizar Contraseña"
              type="submit"
              estiloPersonalizado="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            />

            <Boton
              texto="Volver al inicio de sesión"
              onClick={() => navigate("/login")}
              estiloPersonalizado="w-full text-blue-600 mt-2 hover:underline"
            />
          </form>
        </motion.div>
        
      </div>
    </div>
  );
};

export default RestablecerPasswordTelefono;
