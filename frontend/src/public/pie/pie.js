import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const PiePublico = () => {
  return (
    <footer className="relative isolate overflow-hidden bg-black text-white text-sm pt-16 pb-8 border-t border-gray-800">
      {/* Fondo difuminado azul (coherente con el resto del sitio) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-32 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%-12rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 rotate-[30deg]
                     bg-gradient-to-tr from-blue-500 to-blue-800 opacity-20 sm:left-[calc(50%-36rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 animate-fade-in-up">
        {/* Secciones principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 mb-12">
          {/* Información Legal */}
          <div>
            <h3 className="font-bold text-white mb-3 uppercase tracking-wide text-base">
              Información Legal
            </h3>
            <ul className="space-y-1 text-gray-400">
              <li>
                <Link to="/acercaDe" className="hover:text-blue-500 transition">
                  Acerca de nosotros
                </Link>
              </li>
              <li>
                <Link to="/privacidad" className="hover:text-blue-500 transition">
                  Política de Privacidad
                </Link>
              </li>
              <li>
                <Link to="/terminos" className="hover:text-blue-500 transition">
                  Términos y Condiciones
                </Link>
              </li>
              <li>
                <Link to="/deslindeLegal" className="hover:text-blue-500 transition">
                  Deslinde Legal
                </Link>
              </li>
            </ul>
          </div>

          {/* Ayuda y soporte */}
          <div>
            <h3 className="font-bold text-white mb-3 uppercase tracking-wide text-base">
              Centro de Ayuda
            </h3>
            <ul className="space-y-1 text-gray-400">
              <li>
                <Link
                  to="/preguntasFrecuentes"
                  className="hover:text-blue-500 transition"
                >
                  Preguntas frecuentes
                </Link>
              </li>
              <li>
                <Link to="/contacto" className="hover:text-blue-500 transition">
                  Contáctanos
                </Link>
              </li>
              <li>
                <Link
                  to="/mapa-del-sitio"
                  className="hover:text-blue-500 transition"
                >
                  Mapa del sitio
                </Link>
              </li>
            </ul>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="font-bold text-white mb-3 uppercase tracking-wide text-base">
              Explora
            </h3>
            <ul className="space-y-1 text-gray-400">
              <li>
                <Link to="/cuerpo" className="hover:text-blue-500 transition">
                  Todos los productos
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-blue-500 transition">
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link to="/registro" className="hover:text-blue-500 transition">
                  Regístrate
                </Link>
              </li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-bold text-white mb-3 uppercase tracking-wide text-base">
              Contáctanos
            </h3>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-blue-500" /> Huejutla de Reyes, Hidalgo
              </li>
              <li className="flex items-center gap-2">
                <FaPhoneAlt className="text-blue-500" /> +52 789 112 97 62
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="text-blue-500" /> puntosheinhuejutla@gmail.com

              </li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Copyright y redes sociales */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 pb-4">
          <p className="text-center">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-medium text-white">Punto Shein</span>. Todos los
            derechos reservados.
          </p>

          <div className="flex gap-5 text-gray-400">
            <a
              href="https://www.facebook.com/puntosheinhuejutla"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition"
              aria-label="Facebook"
            >
              <FaFacebookF size={18} />
            </a>
            <a
              href="https://www.instagram.com/puntoshein"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-500 transition"
              aria-label="Instagram"
            >
              <FaInstagram size={18} />
            </a>
            <a
              href="https://twitter.com/puntoshein"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition"
              aria-label="Twitter"
            >
              <FaTwitter size={18} />
            </a>
          </div>
        </div>

      </div>

      {/* Fondo difuminado inferior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-14rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%+4rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 
                     bg-gradient-to-tr from-blue-500 to-blue-800 opacity-20 
                     sm:left-[calc(50%+36rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>
    </footer>
  );
};

export default PiePublico;
