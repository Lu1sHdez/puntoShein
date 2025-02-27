// src/pages/Funciones.js

// Transición para la animación de entrada en el formulario
export const transitionFormulario = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, type: "spring" }
};

// Transición para los botones
export const transitionBoton = {
  initial: { scale: 0 },
  animate: { scale: 1 },
  transition: { duration: 0.3 }
};

// Animación para el campo de texto al cargar
export const inputAnimation = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.5 }
};

// Animación para el contenedor del formulario
export const formAnimation = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.7 }
};
