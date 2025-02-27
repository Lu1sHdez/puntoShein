// src/components/home/encabezado/Funciones.js
import { motion } from "framer-motion";

// Función para animar el menú de usuario
export const menuAnimado = {
  initial: { opacity: 0, y: -10 }, // Comienza invisible y hacia arriba
  animate: { opacity: 1, y: 0 }, // Se hace visible y se coloca en su lugar
  exit: { opacity: 0, y: -10 }, // Se hace invisible y se mueve hacia arriba
  transition: { duration: 0.3 }, // Duración de la animación
};

// Función para animar el ícono de búsqueda (para reutilizar en el futuro si es necesario)
export const iconoAnimado = {
  initial: { opacity: 0, x: 20 }, // Comienza invisible y desplazado
  animate: { opacity: 1, x: 0 }, // Se hace visible y regresa a su posición
  transition: { duration: 0.5, delay: 0.2 }, // Animación con pequeño retraso
};

// Función que crea un contenedor animado (por ejemplo para los botones o inputs)
export const animarContenedor = (children) => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);
