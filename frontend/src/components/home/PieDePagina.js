  // src/components/PieDePagina.js
  import React from "react";
  import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
  import { Link } from "react-router-dom";

  const PieDePagina = () => {
    return (
      // Cambiamos a un fondo negro, texto blanco
      <footer className="bg-black text-white text-center py-6">
        <div className="max-w-4xl mx-auto">
          {/* Sección de enlaces legales / info */}
          <div className="flex flex-wrap justify-center space-x-4 mb-2">
            <Link to="/acercaDe" className="hover:underline">Acerca de </Link>
            <Link to="/preguntasFrecuentes" className="hover:underline">Preguntas Frecuentes</Link>
            <Link to="/privacidad" className="hover:underline">Política de Privacidad</Link>
            <Link to="/terminos" className="hover:underline">Términos &amp; Condiciones</Link>
            <Link to="/deslindeLegal" className="hover:underline">Delinde Legal</Link>
            <Link to="/ayuda" className="hover:underline">Ayuda</Link>
            <Link to="/mapa-del-sitio" className="hover:underline">Mapa del sitio</Link>

          </div>

          <p className="text-sm">&copy; 2024 Punto Shein - Todos los derechos reservados.</p>

          {/* Redes Sociales */}
          <div className="mt-3 flex justify-center space-x-4">
            <a href="#" className="hover:text-gray-300 transition">
              <FaFacebookF size={20} />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </footer>
    );
  };

  export default PieDePagina;
