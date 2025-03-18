export const aparecer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };
  
  export const deslizarIzquierda = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  
  export const deslizarDerecha = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.5 } },
  };
  
  export const escalar = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.5 } },
  };
  
  export const contenedorEscalonado = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Retardo entre elementos hijos
      },
    },
  };
  
  export const itemEscalonado = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };