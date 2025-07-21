import React from "react";
import { useNavigate } from "react-router-dom";
import useSesionUsuario from "../../../context/useSesionUsuario";

const Bienvenida = () => {
  const navigate = useNavigate();
  const { usuarioAutenticado, datos } = useSesionUsuario();

  return (
    <main
      className="pt-24 pb-16 min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          'url("https://res.cloudinary.com/dgbs7sg9j/image/upload/v1738378032/pshein_dsluvs.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-10">
        <div className="flex-1 text-center lg:text-left text-white">
          <h1 className="text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
            Bienvenido{usuarioAutenticado && datos?.nombre ? `, ${datos.nombre}` : ""} a{" "}
            <span className="text-white uppercase">Punto Shein</span>
          </h1>
          <p className="text-lg mb-6">
            Explora nuestras últimas colecciones, descubre las mejores ofertas y mantén tu inventario bajo control desde cualquier lugar.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <button
              onClick={() => navigate("/cuerpo")}
              className="btn-secundario"
            >
              Ver productos
            </button>

            {!usuarioAutenticado ? (
              <button
                onClick={() => navigate("/login")}
                className="btn-principal"
              >
                Iniciar sesión
              </button>
            ) : (
              <button
                onClick={() => navigate("/usuario/perfil")}
                className="btn-principal"
              >
                Ver perfil
              </button>
            )}
          </div>
        </div>

        <div className="flex-1 hidden lg:flex justify-center">
          <img
            src="https://illustrations.popsy.co/gray/shopping-bags.svg"
            alt="Bienvenido"
            className="max-w-md w-full h-auto"
          />
        </div>
      </div>
    </main>
  );
};

export default Bienvenida;
