export const transicionPagina = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };
  
  export const hoverBoton = {
    scale: 1.1,
    transition: { type: "spring", stiffness: 300 },
  };
  
  export const clicBoton = {
    scale: 0.9,
  };
  
  export const transicionAparecer = {
    type: "tween",
    ease: "easeInOut",
    duration: 0.5,
  };
  
  export const transicionPop = {
    type: "spring",
    stiffness: 100,
    damping: 10,
  };