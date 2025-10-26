import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { formAnimation } from "./Funciones";
import Boton from "../elements/Boton";
import { FaEnvelope, FaPhone } from "react-icons/fa";

const OpcionRecuperarPassword = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col justify-start sm:justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 mt-4 sm:mt-0"
      >
        {/* Título y descripción */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Recuperar Contraseña
          </h2>
          <p className="text-gray-500 text-sm">
            Selecciona el método que prefieras para restablecer tu contraseña.
          </p>
        </div>

        {/* Opciones de recuperación */}
        <motion.div {...formAnimation} className="mt-4 space-y-6">
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

          {/* Recuperar por teléfono (opcional, descomentable) */}
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
        </motion.div>

        {/* Botón volver al login */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:text-blue-700 font-semibold underline"
          >
            Volver al inicio de sesión
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default OpcionRecuperarPassword;
