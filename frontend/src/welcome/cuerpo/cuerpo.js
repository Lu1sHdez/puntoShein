// src/components/home/cuerpo/CuerpoBienvenida.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../ApiConexion";
import { useNavigate } from "react-router-dom";
import { FaTags, FaTruck, FaShieldAlt } from "react-icons/fa";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import CargandoBarra from "../../Animations/CargandoBarra";
import FormularioOpinion from "./secciones/opiniones";
import useSesionUsuario from "../../context/useSesionUsuario";

const CuerpoBienvenida = () => {
  const navigate = useNavigate();
  const [cargando, setCargando] = useState(true);
  const { usuarioAutenticado, datos } = useSesionUsuario();
  const [opiniones, setOpiniones] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCargando(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const obtenerOpiniones = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/opinion/aprobadas`);
        setOpiniones(res.data);
      } catch (error) {
        console.error("Error al obtener opiniones", error);
      }
    };
    obtenerOpiniones();
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
              <span className="text-white uppercase">Punto Shein</span>
            </h1>
            <p className="text-lg mb-6">
              Explora nuestras últimas colecciones, descubre las mejores ofertas y mantén tu inventario bajo control desde cualquier lugar.
            </p>
            <div className="flex justify-center lg:justify-start gap-4">
              <button
                onClick={() => navigate("/cuerpo")}
                className="btn-ver"
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

      {/* Sección de Opiniones y Formulario en columnas */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row justify-between items-start gap-12">
          {/* Opiniones a la izquierda */}
          <div className="lg:w-1/2 w-full">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-left">Lo que dicen nuestros clientes</h2>
            {opiniones.length === 0 ? (
              <p className="text-gray-500 text-left">Aún no hay opiniones disponibles.</p>
            ) : (
              <div className="grid gap-6">
                {opiniones.map((op) => (
                  <div key={op.id} className="bg-blue-100 p-4 rounded shadow text-left">
                    <p className="text-gray-600">"{op.mensaje}"</p>
                    <p className="mt-2 text-sm text-end font-semibold text-gray-700">– {op.nombre}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Formulario a la derecha */}
          <div className="lg:w-1/2 w-full">
            <FormularioOpinion />
          </div>
        </div>
      </section>


      <section className="bg-white py-12">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Explora por categoría</h2>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="btn-secundario">Sudaderas</button>
              <button className="btn-secundario">Playeras</button>
              <button className="btn-secundario">Pantalones</button>
              <button className="btn-secundario">Accesorios</button>
            </div>
          </div>
        </section>
      
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
              <FaTags className="text-gray-500 text-4xl mb-3" />
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Ofertas increíbles</h3>
              <p className="text-sm text-gray-500">Precios irresistibles en todas nuestras colecciones.</p>
            </div>
            <div className="flex flex-col items-center">
              <FaTruck className="text-gray-500 text-4xl mb-3" />
              <h3 className="font-semibold text-lg text-gray-700 mb-2">Envíos rápidos</h3>
              <p className="text-sm text-gray-500">Entrega garantizada en tiempo récord.</p>
            </div>
            <div className="flex flex-col items-center">
              <FaShieldAlt className="text-gray-500 text-4xl mb-3" />
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
