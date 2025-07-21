import React, { useState } from 'react';

const Formulario = ({
  campos,
  valores,
  errores,
  onInput,
  handleChange,
  handleSubmit,
  titulo = "Enviar",
  cargando = false,
  ocultarBoton = false,
  botonesPersonalizados = null,
  onFocusPassword = null,
  onBlurPassword = null,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const esVertical = campos.length <= 3;
  const gridClasses = esVertical
    ? "grid grid-cols-1 gap-4"
    : "grid grid-cols-1 sm:grid-cols-2 gap-6";

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-h-[80vh] overflow-y-auto pr-2">
      <div className={gridClasses}>
        {campos.map((campo) => (
          <div key={campo.name} className="flex flex-col w-full">
            <label htmlFor={campo.name} className="font-semibold text-sm mb-1 text-gray-700">
              {campo.label}
            </label>

            {campo.type === "textarea" ? (
              <textarea
                id={campo.name}
                name={campo.name}
                placeholder={campo.placeholder}
                value={valores[campo.name] || ""}
                onChange={handleChange}
                className={`border rounded text-base px-4 py-2 w-full ${
                  errores[campo.name]
                    ? 'border-red-500'
                    : valores[campo.name]?.trim()
                    ? 'border-green-500'
                    : 'border-gray-300'
                }`}
                rows="4"
              />
            ) : campo.type === "radio" ? (
              <div className="flex gap-4 mt-1">
                {campo.opciones.map((opcion) => (
                  <label key={opcion.value} className="inline-flex items-center">
                    <input
                      type="radio"
                      name={campo.name}
                      value={opcion.value}
                      checked={valores[campo.name] === opcion.value}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {opcion.label}
                  </label>
                ))}
              </div>
            ) : campo.name === "password" || campo.name === "confirmPassword" ? (
              <div className="relative w-full">
                <input
                  id={campo.name}
                  type={
                    campo.name === "password"
                      ? (showPassword ? "text" : "password")
                      : (showConfirmPassword ? "text" : "password")
                  }
                  name={campo.name}
                  placeholder={campo.placeholder}
                  value={valores[campo.name] || ""}
                  onChange={handleChange}
                  onFocus={(e) => campo.name === "password" && onFocusPassword?.(e)} 
                  onBlur={(e) => ["password", "confirmPassword"].includes(campo.name) && onBlurPassword?.(e)}
                  className={`border rounded text-base px-4 py-2 w-full pr-10 ${
                    errores[campo.name]
                      ? 'border-red-500'
                      : valores[campo.name]?.trim()
                      ? 'border-green-500'
                      : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  className="absolute right-3 top-2 text-gray-500 text-sm"
                  onClick={() => {
                    if (campo.name === "password") {
                      setShowPassword((prev) => !prev);
                    } else {
                      setShowConfirmPassword((prev) => !prev);
                    }
                  }}
                >
                  {campo.name === "password"
                    ? (showPassword ? "Ocultar" : "Mostrar")
                    : (showConfirmPassword ? "Ocultar" : "Mostrar")}
                </button>
              </div>
            ) : (
              <input
                id={campo.name}
                type={campo.type}
                name={campo.name}
                placeholder={campo.placeholder}
                value={valores[campo.name] || ""}
                onChange={handleChange}
                onFocus={(e) => campo.name === "password" && onFocusPassword?.(e)}
                className={`border rounded text-base px-4 py-2 w-full ${
                  errores[campo.name]
                    ? 'border-red-500'
                    : valores[campo.name]?.trim()
                    ? 'border-green-500'
                    : 'border-gray-300'
                }`}
                onInput={(e) => onInput?.(e, campo.name)} 
                
              />
            )}

            {errores[campo.name] && (
              <span className="text-sm text-red-500 mt-1">{errores[campo.name]}</span>
            )}
          </div>
        ))}
      </div>

      {!ocultarBoton && (
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="btn-principal"
            disabled={cargando}
          >
            {cargando ? "Enviando..." : titulo}
          </button>
        </div>
      )}

      {botonesPersonalizados && (
        <div className="mt-4">{botonesPersonalizados}</div>
      )}
    </form>
  );
};

export default Formulario;
