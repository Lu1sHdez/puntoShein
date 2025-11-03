import React from "react";
import { useNavigate } from "react-router-dom";
import useSesionUsuario from "../../../context/useSesionUsuario";

const Bienvenida = () => {
  const navigate = useNavigate();
  const { usuarioAutenticado, datos } = useSesionUsuario();

  return (
    <main
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center text-white overflow-hidden"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dgbs7sg9j/image/upload/v1738378032/pshein_dsluvs.jpg")',
      }}
    >
      {/* Capa oscura de fondo */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]" />

      {/* Contenido principal */}
      <div className="relative z-10 max-w-7xl w-full px-6 py-20 sm:py-28 md:py-36 flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Texto */}
        <div className="flex-1 text-center lg:text-left space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight drop-shadow-lg">
            Bienvenido
            {usuarioAutenticado && datos?.nombre ? `, ${datos.nombre}` : ""} a{" "}
            <span className="text-blue-400 uppercase drop-shadow-md">
              Punto Shein
            </span>
          </h1>

          <p className="font-titulo text-base sm:text-lg md:text-xl text-gray-100 max-w-2xl mx-auto lg:mx-0">
            Explora nuestras últimas colecciones, descubre las mejores ofertas y
            mantén tu inventario bajo control desde cualquier lugar.
          </p>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6">
            <button
              onClick={() => navigate("/cuerpo")}
              className="px-6 py-3 bg-white/90 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-white hover:scale-105 transition"
            >
              Ver productos
            </button>

            {!usuarioAutenticado ? (
              <button
                onClick={() => navigate("/login")}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:scale-105 transition"
              >
                Iniciar sesión
              </button>
            ) : (
              <button
                onClick={() => navigate("/usuario/perfil")}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-500 hover:scale-105 transition"
              >
                Ver perfil
              </button>
            )}
          </div>
        </div>

        {/* Imagen lateral (solo visible en pantallas grandes) */}
        <div className="flex-1 hidden lg:flex justify-center">
          <img
            src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1738384760/pshein1_dssmlw.avif"
            alt="Bienvenido"
            className="max-w-md w-full h-auto animate-float"
          />
        </div>
      </div>
    </main>
  );
};

export default Bienvenida;
