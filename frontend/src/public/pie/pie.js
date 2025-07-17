import React from "react";
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const PiePublico = () => {
  return (
    <footer className="bg-white text-black text-center py-8 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4">

        {/* Secciones principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-sm text-left mb-8">

          {/* Enlaces legales */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Información Legal</h3>
            <ul className="space-y-1">
              <li><Link to="/acercaDe" className="hover:underline">Acerca de</Link></li>
              <li><Link to="/privacidad" className="hover:underline">Política de Privacidad</Link></li>
              <li><Link to="/terminos" className="hover:underline">Términos y Condiciones</Link></li>
              <li><Link to="/deslindeLegal" className="hover:underline">Deslinde Legal</Link></li>
            </ul>
          </div>

          {/* Ayuda y soporte */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Soporte</h3>
            <ul className="space-y-1">
              <li><Link to="/ayuda" className="hover:underline">Centro de ayuda</Link></li>
              <li><Link to="/preguntasFrecuentes" className="hover:underline">Preguntas frecuentes</Link></li>
              <li><Link to="/contacto" className="hover:underline">Contáctanos</Link></li>
              <li><Link to="/mapa-del-sitio" className="hover:underline">Mapa del sitio</Link></li>
            </ul>
          </div>

          {/* Navegación adicional */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Explora</h3>
            <ul className="space-y-1">
              <li><Link to="/catalogo" className="hover:underline">Catálogo</Link></li>
              <li><Link to="/productos" className="hover:underline">Todos los productos</Link></li>
              <li><Link to="/login" className="hover:underline">Iniciar sesión</Link></li>
              <li><Link to="/registro" className="hover:underline">Regístrate</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">Contáctanos</h3>
            <ul className="space-y-1 text-gray-600">
              <li className="flex items-center gap-2"><FaMapMarkerAlt /> Huejutla de Reyes, Hidalgo</li>
              <li className="flex items-center gap-2"><FaPhoneAlt /> +52 771 123 4567</li>
              <li className="flex items-center gap-2"><FaEnvelope /> contacto@puntoshein.com</li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* Derechos reservados y redes */}
        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 gap-3">
          <p>&copy; {new Date().getFullYear()} Punto Shein - Todos los derechos reservados.</p>

          <div className="flex gap-4 text-gray-500">
            <a href="#" className="hover:text-pink-500 transition"><FaFacebookF size={18} /></a>
            <a href="#" className="hover:text-pink-500 transition"><FaInstagram size={18} /></a>
            <a href="#" className="hover:text-pink-500 transition"><FaTwitter size={18} /></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default PiePublico;
