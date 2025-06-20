import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import FormularioInput from "../components/form/FormularioInput";
import { motion } from "framer-motion";
import Boton from "../elements/Boton";
import { formAnimation } from "./Funciones";
import { API_URL } from "../ApiConexion";

const RecuperarPasswordTelefono = () => {
  const navigate = useNavigate();

  const [telefono, setTelefono] = useState("");
  const [errorValidacion, setErrorValidacion] = useState("");
  const [errorCampos, setErrorCampos] = useState({ telefono: false });
  const [loading, setLoading] = useState(false);

  const validarYEnviar = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!telefono) {
      setErrorValidacion("Por favor, ingresa tu número de teléfono.");
      setErrorCampos({ telefono: true });
      return;
    }

    if (!/^\d{10}$/.test(telefono)) {
      setErrorValidacion("El teléfono debe tener 10 dígitos numéricos.");
      setErrorCampos({ telefono: true });
      return;
    }

    setErrorValidacion("");
    setErrorCampos({ telefono: false });

    try {
      setLoading(true);
      const respuesta = await fetch(`${API_URL}/api/autenticacion/solicitar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telefono }),
      });

      const data = await respuesta.json();
      if (!respuesta.ok) {
        setErrorValidacion(data.mensaje || "Ocurrió un error.");
        return;
      }

      // Redirige si todo sale bien
      navigate(`/verificarTelefono?telefono=${telefono}`);
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorValidacion("Error al conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-0">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700">
          Recuperar Contraseña (Teléfono)
        </h2>

        {errorValidacion && (
          <div className="mb-4 text-red-500 text-sm font-semibold text-center">
            {errorValidacion}
          </div>
        )}

        <motion.div {...formAnimation}>
          <form onSubmit={validarYEnviar} className="mt-6">
            <FormularioInput
              label="Número de Teléfono"
              type="text"
              name="telefono"
              placeholder="Ej: 7891129762"
              value={telefono}
              onChange={(e) => setTelefono(e.target.value)}
              error={errorCampos.telefono}
            />

            <Boton
              texto="Enviar Código de Recuperación"
              type="submit"
              estiloPersonalizado="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
              disabled={loading}
            />
            <Boton
              texto="Recuperar por Correo"
              onClick={() => navigate("/recuperarPassword")}
              estiloPersonalizado="mt-3 w-full text-blue-600 hover:underline"
            />

            <Boton
              texto="Volver al inicio de sesión"
              onClick={() => navigate("/login")}
              estiloPersonalizado="mt-3 w-full text-pink-600 hover:underline"
            />
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default RecuperarPasswordTelefono;
