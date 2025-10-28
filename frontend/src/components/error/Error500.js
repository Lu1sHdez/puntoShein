import React from "react";
import { Link } from "react-router-dom";

const Error500 = () => {
  return (
    <main className="grid min-h-screen place-items-center bg-gray-900 px-0 py-24 sm:py-32 lg:px-8">
      <div className="text-center animate-fade-in-up">
        {/* Código de error */}
        <p className="text-7xl font-extrabold text-blue-500 drop-shadow-md">500</p>

        {/* Título */}
        <h1 className="mt-4 text-4xl sm:text-6xl font-bold tracking-tight text-white">
          ¡Error interno del servidor!
        </h1>

        {/* Imagen flotante */}
        <img
          src="/images/500.png"
          alt="Error 400"
          className="mx-auto w-64 sm:w-80 md:w-96 mt-8 mb-6 animate-float drop-shadow-lg"
        />

        {/* Descripción */}
        <p className="mt-4 text-lg sm:text-xl text-gray-400 max-w-md mx-auto">
          Ocurrió un error inesperado en el servidor. <br />
          Por favor, intenta de nuevo más tarde.
        </p>

        {/* Botones */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
          <Link
            to="/"
            className="btn-principal px-6 py-3 text-lg font-semibold shadow-md transition-transform hover:scale-105"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </main>
  );
};

export default Error500;
