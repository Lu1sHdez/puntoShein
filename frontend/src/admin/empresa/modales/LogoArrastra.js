// src/admin/empresa/modales/LogoArrastra.js
import React, { useRef } from "react";

const LogoArrastra = ({ onArchivoSeleccionado }) => {
  const dropRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) onArchivoSeleccionado(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    if (file) onArchivoSeleccionado(file);
  };

  return (
    <div
      ref={dropRef}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      className="border-2 border-dashed border-pink-400 rounded-lg p-4 text-center cursor-pointer hover:bg-pink-50 transition mb-4"
    >
      <p className="text-gray-600 text-sm">Arrastra y suelta una imagen aquí o haz clic para seleccionar</p>
      <input
        type="file"
        accept="image/*"
        onChange={handleArchivoChange}
        className="mt-2 mx-auto block"
      />
    </div>
  );
};

export default LogoArrastra;
