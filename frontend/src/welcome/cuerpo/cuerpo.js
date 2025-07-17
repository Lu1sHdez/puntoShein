// src/components/home/cuerpo/CuerpoBienvenida.js
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTags, FaTruck, FaShieldAlt } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CargandoBarra from "../../Animations/CargandoBarra";
import useSesionUsuario from "../../context/useSesionUsuario";

const CuerpoBienvenida = () => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(true);
  const { usuarioAutenticado, datos } = useSesionUsuario();

  useEffect(() => {
    const timer = setTimeout(() => {
      setCargando(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (cargando) return <CargandoBarra />;

  return (
    <>
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
              <span className="text-pink-400">Punto Shein</span>
            </h1>
            <p className="text-lg mb-6">
              Explora nuestras últimas colecciones, descubre las mejores ofertas y mantén tu inventario bajo control desde cualquier lugar.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate("/cuerpo")}
                className="btn-detalles"
              >
                Ver productos
              </button>

              {!usuarioAutenticado ? (
                <button
                  onClick={() => navigate("/login")}
                  className="btn-login"
                >
                  Iniciar sesión
                </button>
              ) : (
                <button
                  onClick={() => navigate("/usuario/perfil")}
                  className="px-6 py-2 border border-white text-white rounded-lg hover:bg-white hover:text-pink-600 transition"
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

      <Carousel
        autoPlay
        infiniteLoop
        showThumbs={false}
        showStatus={false}
        interval={4000}
        transitionTime={800}
        className="rounded-lg overflow-hidden shadow-lg max-w-4xl mx-auto mt-6"
        >
        <div>
            <img
            src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1738384760/pshein1_dssmlw.avif"
            alt="Nueva colección"
            className="h-64 object-cover w-full"
            />
            <p className="legend bg-black bg-opacity-60 text-white text-sm">Descubre nuestra nueva colección</p>
        </div>
        <div>
            <img
            src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733295506/moda1_qwtxdu.png"
            alt="Descuentos"
            className="h-64 object-cover w-full"
            />
        </div>
        <div>
            <img
            src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733295790/moda3_ui7y2h.jpg"
            alt="Envíos rápidos"
            className="h-64 object-cover w-full"
            />
            <p className="legend bg-black bg-opacity-60 text-white text-sm">Envíos a todo Huejutla</p>
        </div>
        </Carousel>

      {/* Sección adicional destacada */}
      <section className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">¿Por qué elegirnos?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
            <div className="flex flex-col items-center">
              <FaTags className="text-pink-500 text-4xl mb-3" />
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Ofertas increíbles</h3>
              <p className="text-sm text-gray-500">Precios irresistibles en todas nuestras colecciones.</p>
            </div>
            <div className="flex flex-col items-center">
              <FaTruck className="text-pink-500 text-4xl mb-3" />
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Envíos rápidos</h3>
              <p className="text-sm text-gray-500">Entrega garantizada en tiempo récord.</p>
            </div>
            <div className="flex flex-col items-center">
              <FaShieldAlt className="text-pink-500 text-4xl mb-3" />
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Compra segura</h3>
              <p className="text-sm text-gray-500">Transacciones protegidas y confiables.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CuerpoBienvenida;
