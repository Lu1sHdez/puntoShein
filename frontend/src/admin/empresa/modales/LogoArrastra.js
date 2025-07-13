import React, { useRef, useState } from "react";

const LogoArrastra = ({ onArchivoSeleccionado }) => {
  const dropRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);  // Resetear color al salir
    const file = e.dataTransfer.files[0];
    if (file) onArchivoSeleccionado(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
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
      onDragEnter={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition mb-4 ${
        isDragging ? "border-blue-600 bg-blue-100" : "border-blue-400 hover:bg-blue-50"
      }`}
    >
      <p className="text-gray-600 text-sm">
        Arrastra y suelta una imagen aquí o haz clic para seleccionar
      </p>
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
