// src/admin/empresa/modales/LogoDetalle.js
import React from "react";

const LogoDetalle = ({ vistaPrevia, archivo, resolucion, onEliminar }) => {
  if (!vistaPrevia) return null;

  const nombreArchivo = archivo?.name || "Logo actual";
  const tamanoKB = archivo ? (archivo.size / 1024).toFixed(2) : null;

  return (
    <div className="text-center mb-4">
      <img
        src={vistaPrevia}
        alt="Vista previa"
        className="h-24 mx-auto border rounded-md shadow"
        style={{
          backgroundImage:
            "linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%)",
          backgroundSize: "20px 20px",
        }}
      />
      <p className="text-sm mt-2 text-gray-600">
        <strong>Archivo:</strong> {nombreArchivo}
        {tamanoKB && <> | <strong>Tamaño:</strong> {tamanoKB} KB</>}
      </p>
      {resolucion && (
        <p className="text-xs text-gray-500">Resolución: {resolucion}</p>
      )}

      <button
        onClick={() => {
          if (typeof window !== "undefined") URL.revokeObjectURL(vistaPrevia);
          if (typeof onEliminar === "function") onEliminar();
        }}
        className="mt-2 text-sm text-red-600 hover:underline"
      >
        Quitar imagen seleccionada
      </button>
    </div>
  );
};

export default LogoDetalle;
