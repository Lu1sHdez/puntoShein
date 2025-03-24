// src/components/RegresarButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const RegresarButton = () => {
  const navigate = useNavigate();  // Usamos useNavigate para poder redirigir

  const handleRegresar = () => {
    navigate(-1);  // Redirige a la página anterior
  };

  return (
    <button
      onClick={handleRegresar}
      className="absolute top-6 left-20 text-blue-500 font-semibold hover:text-blue-700 transition duration-200"
    >
      ← Regresar
    </button>
  );
};

export default RegresarButton;
