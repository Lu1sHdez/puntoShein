import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { dataLoadingAnimation } from "../Funciones";
import CargandoBarra from "../../Animations/CargandoBarra";

const MapaSitio = () => {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    // Simula carga (puedes reemplazarlo con llamada a API si tuvieras los datos)
    const timer = setTimeout(() => setCargando(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (cargando) {
    return (
      <div className="flex justify-center items-center py-10">
        <CargandoBarra message="Cargando mapa del sitio..." />
      </div>
    );
  }

  return (
    <section className="relative isolate overflow-hidden bg-white py-20 sm:py-24">
      {/* Fondo difuminado superior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%-12rem)] aspect-[1155/678] w-[40rem]
                     -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr
                     from-blue-400 to-blue-700 opacity-20
                     sm:left-[calc(50%-36rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>

      {/* Contenido principal */}
      <motion.div
        {...dataLoadingAnimation}
        className="max-w-4xl mx-auto px-6 sm:px-10 py-10 bg-white border border-gray-200 rounded-2xl shadow-lg"
      >
        <header className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-3 animate-fade-in-up">
            Mapa del Sitio
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Navega fácilmente por todas las secciones de Punto Shein.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 animate-fade-in-up">
          {/* Secciones principales */}
          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              Páginas principales
            </h2>
            <ul className="list-disc list-inside space-y-2 text-blue-600">
              <li><Link to="/" className="hover:underline">Inicio</Link></li>
              <li><Link to="/cuerpo" className="hover:underline">Productos</Link></li>
              <li><Link to="/ofertas" className="hover:underline">Ofertas</Link></li>
              <li><Link to="/contacto" className="hover:underline">Contacto</Link></li>
              <li><Link to="/ayuda" className="hover:underline">Ayuda</Link></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              Información de la empresa
            </h2>
            <ul className="list-disc list-inside space-y-2 text-blue-600">
              <li><Link to="/acercaDe" className="hover:underline">Acerca de Punto Shein</Link></li>
              <li><Link to="/privacidad" className="hover:underline">Política de Privacidad</Link></li>
              <li><Link to="/terminos" className="hover:underline">Términos y Condiciones</Link></li>
              <li><Link to="/deslindeLegal" className="hover:underline">Deslinde Legal</Link></li>
            </ul>
          </div>

          {/* Cuenta */}
          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-3">Mi cuenta</h2>
            <ul className="list-disc list-inside space-y-2 text-blue-600">
              <li><Link to="/login" className="hover:underline">Iniciar sesión</Link></li>
              <li><Link to="/registro" className="hover:underline">Registrarse</Link></li>
              <li><Link to="/recuperarPassword" className="hover:underline">Recuperar contraseña</Link></li>
              <li><Link to="/perfil" className="hover:underline">Mi perfil</Link></li>
              <li><Link to="/carrito" className="hover:underline">Mi carrito</Link></li>
            </ul>
          </div>

          {/* Recursos adicionales */}
          <div>
            <h2 className="text-xl font-semibold text-blue-700 mb-3">
              Recursos adicionales
            </h2>
            <ul className="list-disc list-inside space-y-2 text-blue-600">
              <li><Link to="/preguntasFrecuentes" className="hover:underline">Preguntas frecuentes</Link></li>
              <li><Link to="/politica-devoluciones" className="hover:underline">Política de devoluciones</Link></li>
              <li><Link to="/chat" className="hover:underline">Chat en vivo</Link></li>
            </ul>
          </div>
        </div>
      </motion.div>

      {/* Fondo inferior difuminado */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-15rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%+4rem)] aspect-[1155/678] w-[40rem]
                     -translate-x-1/2 bg-gradient-to-tr from-blue-400 to-blue-700 opacity-20
                     sm:left-[calc(50%+36rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
};

export default MapaSitio;
