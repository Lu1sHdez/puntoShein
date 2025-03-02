// Animación de transición para el contenedor principal del dashboard
export const dashboardAnimation = {
  initial: { opacity: 0, x: -50 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 50 },
  transition: { duration: 0.5 },
};

// Animación del hover de las tarjetas (expandir y sombra)
export const hoverCardAnimation = {
  hover: {
    scale: 1.05,
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.2)",
  },
  transition: { duration: 0.3 },
};

// Animación para el contenedor del formulario
export const formAnimation = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.7 }
  };

export const userLoadingAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: "easeOut" },
};

export const userLoadingContainer = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 3, ease: "easeInOut" },
};
export const dataLoadingAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5, ease: "easeOut" },
  };
  
  export const userDetailsLoadingAnimation = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.9 },
    transition: { duration: 0.7, ease: "easeInOut" },
  };

  export const productsLoadingAnimation = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.6, ease: "easeOut" },
  };
  