import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { formAnimation } from "./Funciones";
import Boton from "../elements/Boton";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const OpcionRecuperarPassword = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center mt-0">
        
      <motion.div
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
        {...formAnimation}
      >
        {/* Título y descripción */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Recuperar Contraseña
          </h2>
          <p className="text-gray-500">
            Selecciona un método para recuperar tu contraseña.
          </p>
        </div>

        {/* Opciones de recuperación */}
        <div className="mt-8 space-y-6">
          {/* Opción por Correo */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/recuperarPassword")}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-pink-600 text-white py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <FaEnvelope className="text-xl" />
            <span className="font-semibold">Recuperar por Correo</span>
          </motion.button>

          {/* Opción por Teléfono */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/solicitarPasswordTelefono")}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <FaPhone className="text-xl" />
            <span className="font-semibold">Recuperar por Teléfono</span>
          </motion.button>
        </div>

        {/* Botón para volver al inicio de sesión */}
        <div className="mt-8 text-center">
          <Boton
            texto="Volver al inicio de sesión"
            onClick={() => navigate("/login")}
            estiloPersonalizado="text-pink-600 hover:text-pink-700 font-semibold underline"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default OpcionRecuperarPassword;