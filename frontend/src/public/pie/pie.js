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
    <footer className="bg-[#f8fafc] text-gray-700 text-sm pt-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6">

        {/* Secciones principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-10">

          {/* Información Legal */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3 uppercase tracking-wide text-base">
              Información Legal
            </h3>
            <ul className="space-y-1">
              <li><Link to="/acercaDe" className="hover:text-blue-600 transition">Acerca de nosotros</Link></li>
              <li><Link to="/privacidad" className="hover:text-blue-600 transition">Política de Privacidad</Link></li>
              <li><Link to="/terminos" className="hover:text-blue-600 transition">Términos y Condiciones</Link></li>
              <li><Link to="/deslindeLegal" className="hover:text-blue-600 transition">Deslinde Legal</Link></li>
            </ul>
          </div>

          {/* Ayuda y soporte */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3 uppercase tracking-wide text-base">
              Centro de Ayuda
            </h3>
            <ul className="space-y-1">
              <li><Link to="/preguntasFrecuentes" className="hover:text-blue-600 transition">Preguntas frecuentes</Link></li>
              <li><Link to="/contacto" className="hover:text-blue-600 transition">Contáctanos</Link></li>
              <li><Link to="/mapa-del-sitio" className="hover:text-blue-600 transition">Mapa del sitio</Link></li>
            </ul>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3 uppercase tracking-wide text-base">
              Explora
            </h3>
            <ul className="space-y-1">
              <li><Link to="/cuerpo" className="hover:text-blue-600 transition">Todos los productos</Link></li>
              <li><Link to="/login" className="hover:text-blue-600 transition">Iniciar sesión</Link></li>
              <li><Link to="/registro" className="hover:text-blue-600 transition">Regístrate</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-bold text-gray-800 mb-3 uppercase tracking-wide text-base">
              Contáctanos
            </h3>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-center gap-2"><FaMapMarkerAlt className="text-blue-500" /> Huejutla de Reyes, Hidalgo</li>
              <li className="flex items-center gap-2"><FaPhoneAlt className="text-blue-500" /> +52 771 123 4567</li>
              <li className="flex items-center gap-2"><FaEnvelope className="text-blue-500" /> contacto@puntoshein.com</li>
            </ul>
          </div>
        </div>

        {/* Línea divisoria */}
        <div className="border-t border-gray-300 my-6"></div>

        {/* Copyright y redes sociales */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 gap-4 pb-6">
          <p>&copy; {new Date().getFullYear()} <span className="font-medium text-gray-700">Punto Shein</span>. Todos los derechos reservados.</p>

          <div className="flex gap-4 text-gray-500">
            <a href="#" className="hover:text-blue-600 transition" aria-label="Facebook"><FaFacebookF size={18} /></a>
            <a href="#" className="hover:text-pink-500 transition" aria-label="Instagram"><FaInstagram size={18} /></a>
            <a href="#" className="hover:text-sky-500 transition" aria-label="Twitter"><FaTwitter size={18} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default PiePublico;
