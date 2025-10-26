import React from "react";
import { Link } from "react-router-dom";

const Error404 = () => {
  return (
    <div className="flex flex-col items-center justify-center -mt-12 px-6 text-center ">
      {/* Contenedor con fondo semitransparente */}
      <div className=" bg-opacity-90 p-10 max-w-lg w-full">
        {/* Imagen de error */}
        <img
          src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1738395727/ee404_o83ddd.png"
          alt="Error 404"
          className="w-full max-w-xs sm:max-w-md h-auto mb-6 drop-shadow-lg"
        />

        {/* Mensaje de error */}
        <h2 className="text-3xl md:text-4xl font-bold text-black mt-4">
          ¡Oops! Página no encontrada
        </h2>
        <p className="text-black mt-2 max-w-md text-lg">
          La página que buscas no existe o fue eliminada. <br />
          Por favor, vuelve al inicio.
        </p>

        {/* Botón de regreso */}
        <Link
          to="/"
          className="mt-6 inline-block px-6 py-3 bg-blue-500 text-white rounded-lg text-lg font-semibold 
          shadow-lg hover:bg-blue-700 transition transform hover:scale-105"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default Error404;
