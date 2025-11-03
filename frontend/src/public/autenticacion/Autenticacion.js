import React from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ModalAutenticacion = ({ onClose }) => {
  const navigate = useNavigate();

  const modalContent = (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        aria-modal="true"
        role="dialog"
      >
        {/* Capa de cierre */}
        <div
          className="absolute inset-0 cursor-pointer"
          onClick={onClose}
          aria-label="Cerrar modal"
        ></div>

        {/* Contenedor del modal */}
        <motion.div
          className="relative bg-white rounded-2xl p-8 w-full max-w-md text-center shadow-xl z-10 overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
        >
          {/* Encabezado */}
          <h2 className="text-2xl font-bold text-gray-800 mb-3">
            Autenticación requerida
          </h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            ¡Hola! Para agregar productos al carrito o continuar con tu compra,
            necesitas iniciar sesión o registrarte.
          </p>

          {/* Botones */}
          <div className="flex flex-col gap-3">
            <motion.button
              onClick={() => navigate('/login')}
              className="btn-principal py-2.5 text-base shadow hover:shadow-lg transition-transform"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Iniciar sesión
            </motion.button>

            <motion.button
              onClick={() => navigate('/registro')}
              className="w-full border border-blue-600 text-blue-600 py-2.5 rounded-lg hover:bg-blue-50 transition-all font-semibold shadow-sm"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              Registrarse
            </motion.button>

            <button
              onClick={onClose}
              className="text-sm text-gray-500 underline hover:text-gray-700 mt-2 transition"
            >
              Cancelar
            </button>
          </div>

          {/* Círculo decorativo */}
          <motion.div
            className="absolute -bottom-12 -right-12 w-32 h-32 bg-blue-100 rounded-full opacity-60 blur-2xl"
            animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );

  // Montamos el modal en el body, no en el árbol del componente
  return ReactDOM.createPortal(modalContent, document.body);
};

export default ModalAutenticacion;
