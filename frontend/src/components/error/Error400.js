import React from "react";
import { Link } from "react-router-dom";

const Error400 = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center bg-black">
      {/* Contenedor con fondo semitransparente */}
      <div className="bg-gray-900 bg-opacity-90 p-10 rounded-lg shadow-2xl max-w-lg w-full">
        {/* Imagen de error */}
        <img
          src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1738395407/e400_gljvx1.png"
          alt="Error 400"
          className="w-full max-w-xs sm:max-w-md h-auto mb-6 drop-shadow-lg"
        />

        {/* Mensaje de error */}
        <h2 className="text-3xl md:text-4xl font-bold text-white mt-4">
          ¡Solicitud Incorrecta!
        </h2>
        <p className="text-gray-300 mt-2 max-w-md text-lg">
          Parece que hubo un problema con tu solicitud. <br />
          Verifica los datos ingresados e intenta nuevamente.
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

export default Error400;
