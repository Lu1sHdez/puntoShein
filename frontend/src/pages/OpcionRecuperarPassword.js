import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { formAnimation } from "./Funciones";
import Boton from "../elements/Boton";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const OpcionRecuperarPassword = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white px-4">
      <motion.div
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Título y descripción */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Recuperar Contraseña
          </h2>
          <p className="text-gray-500 text-sm">
            Selecciona el método que prefieras para restablecer tu contraseña.
          </p>
        </div>

        {/* Opciones de recuperación */}
        <div className="mt-8 space-y-6">
          {/* Recuperar por correo */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/recuperarPassword")}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <FaEnvelope className="text-xl" />
            <span className="font-semibold">Recuperar por correo</span>
          </motion.button>

          {/* Recuperar por teléfono (opcional, comentado) */}
          {/*
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate("/solicitarPasswordTelefono")}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl shadow-md hover:shadow-lg transition-all"
          >
            <FaPhone className="text-xl" />
            <span className="font-semibold">Recuperar por teléfono</span>
          </motion.button>
          */}
        </div>

        {/* Botón de volver */}
        <div className="mt-8 text-center">
          <Boton
            texto="Volver al inicio de sesión"
            onClick={() => navigate("/login")}
            estiloPersonalizado="text-blue-600 hover:text-blue-700 font-semibold underline"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default OpcionRecuperarPassword;
