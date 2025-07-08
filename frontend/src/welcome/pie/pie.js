import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";

const PieBienvenida = () => {
  return (
    <footer className="bg-white text-black text-center py-6">
      <div className="max-w-5xl mx-auto px-4">
        {/* Enlaces legales */}
        <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm mb-4">
          <Link to="/acercaDe" className="hover:underline">Acerca de</Link>
          <Link to="/preguntasFrecuentes" className="hover:underline">Preguntas Frecuentes</Link>
          <Link to="/privacidad" className="hover:underline">Privacidad</Link>
          <Link to="/terminos" className="hover:underline">Términos</Link>
          <Link to="/deslindeLegal" className="hover:underline">Deslinde Legal</Link>
          <Link to="/ayuda" className="hover:underline">Ayuda</Link>
          <Link to="/mapa-del-sitio" className="hover:underline">Mapa del sitio</Link>
        </div>

        {/* Derechos reservados */}
        <p className="text-xs text-gray-400">&copy; {new Date().getFullYear()} Punto Shein - Todos los derechos reservados.</p>

        {/* Redes sociales */}
        <div className="mt-3 flex justify-center space-x-4">
          <a href="#" className="hover:text-pink-400 transition">
            <FaFacebookF size={18} />
          </a>
          <a href="#" className="hover:text-pink-400 transition">
            <FaInstagram size={18} />
          </a>
          <a href="#" className="hover:text-pink-400 transition">
            <FaTwitter size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default PieBienvenida;
