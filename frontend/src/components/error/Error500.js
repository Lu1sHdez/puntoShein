import React from "react";
import { Link } from "react-router-dom";

const Error500 = () => {
  return (
    <div className="flex flex-col items-center justify-center -mt-8 px-6 text-center ">
      {/* Contenedor con fondo semitransparente */}
      <div className=" bg-opacity-90 p-2  max-w-lg w-full">
        {/* Imagen de error */}
        <img
          src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1738396258/e500_igczuw.webp" 
          alt="Error 500"
          className="w-full max-w-xs sm:max-w-rem h-auto mb-6 drop-shadow-lg mx-auto" // Agregado mx-auto
        />

        {/* Mensaje de error */}
        <h2 className="text-3xl md:text-4xl font-bold text-black">
          ¡Error Interno del Servidor!
        </h2>
        <p className="text-black mt-2 max-w-md text-lg">
          Ocurrió un error inesperado en el servidor. <br />
          Por favor, intenta de nuevo más tarde.
        </p>

        {/* Botón de regreso */}
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-pink-500 text-white rounded-lg text-lg font-semibold 
          shadow-lg hover:bg-pink-700 transition transform hover:scale-105"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Error500;