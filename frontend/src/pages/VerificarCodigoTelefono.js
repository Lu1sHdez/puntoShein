import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import FormularioInput from "../components/form/FormularioInput";
import Boton from "../elements/Boton";
import { motion } from "framer-motion";
import { formAnimation } from "./Funciones";
import { API_URL } from "../ApiConexion";

const VerificarCodigoTelefono = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const telefono = new URLSearchParams(location.search).get("telefono");

  const [codigo, setCodigo] = useState("");
  const [errorValidacion, setErrorValidacion] = useState("");
  const [errorCampo, setErrorCampo] = useState(false);
  const [loading, setLoading] = useState(false);

  const validarCodigo = async (e) => {
    e.preventDefault();

    // Validar que el código tenga 6 dígitos
    if (!/^\d{6}$/.test(codigo)) {
      setErrorValidacion("El código debe tener 6 dígitos.");
      setErrorCampo(true);
      return;
    }

    setErrorValidacion("");
    setErrorCampo(false);
    setLoading(true);

    try {
      const respuesta = await fetch(`${API_URL}/api/autenticacion/verificar`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telefono, codigo }),
      });

      const data = await respuesta.json();
      if (!respuesta.ok) {
        setErrorValidacion(data.mensaje);
      } else {
        navigate(`/restablecerPasswordTelefono?telefono=${telefono}&codigo=${codigo}`);
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
          Verificar Código SMS
        </h2>

        {errorValidacion && (
          <div className="mb-4 text-red-500 text-sm font-semibold text-center">
            {errorValidacion}
          </div>
        )}

        <motion.div {...formAnimation}>
          <form onSubmit={validarCodigo} className="mt-6">
            <FormularioInput
              label="Código de Verificación"
              type="text"
              name="codigo"
              placeholder="Ej: 123456"
              value={codigo}
              onChange={(e) => setCodigo(e.target.value)}
              error={errorCampo}
            />

            <Boton
              texto="Verificar Código"
              type="submit"
              estiloPersonalizado="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              disabled={loading}
            />

            <Boton
              texto="Volver al inicio de sesión"
              onClick={() => navigate("/login")}
              estiloPersonalizado="mt-3 w-full text-blue-600 hover:underline"
            />
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default VerificarCodigoTelefono;
