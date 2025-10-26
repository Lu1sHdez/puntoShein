import React from "react";

const Boton = ({
  texto,
  onClick,
  estiloPersonalizado = "btn-principal",
  disabled = false,
  tipo = "button", // Permite usarlo también como type="submit"
  icono = null,    // Permite añadir íconos fácilmente
}) => {
  return (
    <button
      type={tipo}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
      className={`flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200
        ${estiloPersonalizado} 
        ${disabled ? "opacity-50 cursor-not-allowed" : "hover:scale-[1.02]"}`}
      aria-disabled={disabled}
    >
      {icono && <span className="text-lg">{icono}</span>}
      {texto}
    </button>
  );
};

export default Boton;
