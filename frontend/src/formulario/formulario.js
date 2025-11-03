import React, { useState } from "react";

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
    ? "grid grid-cols-1 gap-5"
    : "grid grid-cols-1 sm:grid-cols-2 gap-6";

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 max-h-[80vh] overflow-y-auto pr-2 animate-fade-in-up"
    >
      <div className={gridClasses}>
        {campos.map((campo) => (
          <div key={campo.name} className="flex flex-col w-full">
            {/* Etiqueta */}
            <label
              htmlFor={campo.name}
              className="font-semibold text-sm mb-1 text-gray-800 tracking-wide"
            >
              {campo.label}
            </label>

            {/* Campo de texto, contraseña o textarea */}
            {campo.type === "textarea" ? (
              <textarea
                id={campo.name}
                name={campo.name}
                placeholder={campo.placeholder}
                value={valores[campo.name] || ""}
                onChange={handleChange}
                rows="4"
                className={`rounded-lg border px-4 py-2.5 text-sm transition-all duration-200 
                  focus:border-blue-500 focus:outline-none focus:shadow-[0_0_0_3px_rgba(37,99,235,0.3)] bg-gray-50
                  ${
                    errores[campo.name]
                      ? "border-red-400 bg-red-50"
                      : valores[campo.name]?.trim()
                      ? "border-green-400 bg-green-50/10"
                      : "border-gray-300"
                  }`}
              />
            ) : campo.type === "radio" ? (
              <div className="flex gap-4 mt-1">
                {campo.opciones.map((opcion) => (
                  <label
                    key={opcion.value}
                    className="inline-flex items-center text-gray-700"
                  >
                    <input
                      type="radio"
                      name={campo.name}
                      value={opcion.value}
                      checked={valores[campo.name] === opcion.value}
                      onChange={handleChange}
                      className="mr-2 accent-blue-600"
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
                      ? showPassword
                        ? "text"
                        : "password"
                      : showConfirmPassword
                      ? "text"
                      : "password"
                  }
                  name={campo.name}
                  placeholder={campo.placeholder}
                  value={valores[campo.name] || ""}
                  onChange={handleChange}
                  onFocus={(e) =>
                    campo.name === "password" && onFocusPassword?.(e)
                  }
                  onBlur={(e) =>
                    ["password", "confirmPassword"].includes(campo.name) &&
                    onBlurPassword?.(e)
                  }
                  className={`rounded-lg border px-4 py-2.5 w-full text-sm transition-all duration-200 bg-gray-50 pr-16
                    focus:border-blue-500 focus:outline-none focus:shadow-[0_0_0_3px_rgba(37,99,235,0.3)]
                    ${
                      errores[campo.name]
                        ? "border-red-400 bg-red-50"
                        : valores[campo.name]?.trim()
                        ? "border-green-400 bg-green-50/10"
                        : "border-gray-300"
                    }`}
                />
                <button
                  type="button"
                  className="absolute right-4 top-2.5 text-blue-600 text-xs font-semibold hover:text-blue-700 transition"
                  onClick={() => {
                    if (campo.name === "password") {
                      setShowPassword((prev) => !prev);
                    } else {
                      setShowConfirmPassword((prev) => !prev);
                    }
                  }}
                >
                  {campo.name === "password"
                    ? showPassword
                      ? "Ocultar"
                      : "Mostrar"
                    : showConfirmPassword
                    ? "Ocultar"
                    : "Mostrar"}
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
                onFocus={(e) =>
                  campo.name === "password" && onFocusPassword?.(e)
                }
                className={`rounded-lg border px-4 py-2.5 w-full text-sm transition-all duration-200 bg-gray-50
                  focus:border-blue-500 focus:outline-none focus:shadow-[0_0_0_3px_rgba(37,99,235,0.3)]
                  ${
                    errores[campo.name]
                      ? "border-red-400 bg-red-50"
                      : valores[campo.name]?.trim()
                      ? "border-green-400 bg-green-50/10"
                      : "border-gray-300"
                  }`}
                onInput={(e) => onInput?.(e, campo.name)}
              />
            )}

            {/* Mensaje de error */}
            {errores[campo.name] && (
              <span className="text-xs text-red-500 mt-1 font-medium">
                {errores[campo.name]}
              </span>
            )}
          </div>
        ))}
      </div>

      {/* Botón principal */}
      {!ocultarBoton && (
        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className={`btn-principal px-6 py-2.5 rounded-lg shadow-md transition-all duration-300 ${
              cargando ? "opacity-70 cursor-not-allowed" : ""
            }`}
            disabled={cargando}
          >
            {cargando ? "Enviando..." : titulo}
          </button>
        </div>
      )}

      {/* Botones personalizados opcionales */}
      {botonesPersonalizados && (
        <div className="mt-4">{botonesPersonalizados}</div>
      )}
    </form>
  );
};

export default Formulario;
