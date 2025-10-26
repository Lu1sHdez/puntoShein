import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const ModalAutenticacion = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <motion.div
        className="bg-white rounded-2xl p-6 w-full max-w-md text-center shadow-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">Autenticación requerida</h2>
        <p className="text-gray-600 mb-5">
          Debes iniciar sesión o registrarte para agregar productos al carrito.
        </p>

        <div className="flex flex-col gap-4">
          <motion.button
            onClick={() => navigate("/login")}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            whileHover={{ scale: 1.05 }}
          >
            Iniciar sesión
          </motion.button>

          <motion.button
            onClick={() => navigate("/registro")}
            className="w-full border border-blue-600 text-blue-600 py-2 rounded-lg hover:bg-blue-50 transition"
            whileHover={{ scale: 1.05 }}
          >
            Registrarse
          </motion.button>

          <button
            onClick={onClose}
            className="text-sm text-gray-500 underline hover:text-gray-700 mt-2"
          >
            Cancelar
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default ModalAutenticacion;
