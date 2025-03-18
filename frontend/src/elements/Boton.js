import React from "react";

const Boton = ({ texto, onClick, estiloPersonalizado, disabled }) => {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-lg transition-colors ${estiloPersonalizado} 
      ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
      {texto}
    </button>
  );
};

export default Boton;
