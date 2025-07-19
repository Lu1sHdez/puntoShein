// src/formulario/Formulario.js
import React from 'react';

const Formulario = ({ campos, valores, errores, handleChange, handleSubmit, titulo = "Enviar", cargando = false }) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {campos.map((campo) => (
        <div key={campo.name} className="flex flex-col">
          <label htmlFor={campo.name} className="font-semibold text-sm mb-1">{campo.label}</label>
          
          {campo.type === "textarea" ? (
            <textarea
              id={campo.name}
              name={campo.name}
              placeholder={campo.placeholder}
              value={valores[campo.name] || ""}
              onChange={handleChange}
              className={`border p-2 rounded ${errores[campo.name] ? 'border-red-500' : 'border-gray-300'}`}
              rows="4"
            />
          ) : (
            <input
              id={campo.name}
              type={campo.type}
              name={campo.name}
              placeholder={campo.placeholder}
              value={valores[campo.name] || ""}
              onChange={handleChange}
              className={`border p-2 rounded ${errores[campo.name] ? 'border-red-500' : 'border-gray-300'}`}
            />
          )}
          
          {errores[campo.name] && (
            <span className="text-sm text-red-500 mt-1">{errores[campo.name]}</span>
          )}
        </div>
      ))}

    <div className="flex justify-center">
        <button
            type="submit"
            className="boton-principal"
            disabled={cargando}
        >
            {cargando ? "Enviando..." : titulo}
        </button>
    </div>

    </form>
  );
};

export default Formulario;
