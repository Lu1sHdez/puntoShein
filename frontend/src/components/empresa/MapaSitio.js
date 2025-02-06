import React from "react";
import { Link } from "react-router-dom";

const MapaSitio = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="container max-w-3xl shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">Mapa del Sitio</h1>
        <p className="text-gray-600 mb-6 text-center">
          Aquí encontrarás una lista de todas las secciones de nuestro sitio web Punto Shein.
        </p>

        {/* Secciones Principales */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Páginas Principales</h2>
          <ul className="list-disc pl-5 space-y-2 text-blue-600">
            <li><Link to="/" className="hover:underline">Inicio</Link></li>
            <li><Link to="/productos" className="hover:underline">Productos</Link></li>
            <li><Link to="/ofertas" className="hover:underline">Ofertas</Link></li>
            <li><Link to="/contacto" className="hover:underline">Contacto</Link></li>
            <li><Link to="/ayuda" className="hover:underline">Ayuda</Link></li>
          </ul>
        </section>

        {/* Información de la Empresa */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Información de la Empresa</h2>
          <ul className="list-disc pl-5 space-y-2 text-blue-600">
            <li><Link to="/acercaDe" className="hover:underline">Acerca de Punto Shein</Link></li>
            <li><Link to="/privacidad" className="hover:underline">Política de Privacidad</Link></li>
            <li><Link to="/terminos" className="hover:underline">Términos y Condiciones</Link></li>
            <li><Link to="/deslindeLegal" className="hover:underline">Deslinde Legal</Link></li>
          </ul>
        </section>

        {/* Usuario y Cuenta */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Mi Cuenta</h2>
          <ul className="list-disc pl-5 space-y-2 text-blue-600">
            <li><Link to="/login" className="hover:underline">Iniciar Sesión</Link></li>
            <li><Link to="/registro" className="hover:underline">Registrarse</Link></li>
            <li><Link to="/recuperarPassword" className="hover:underline">Recuperar Contraseña</Link></li>
            <li><Link to="/perfil" className="hover:underline">Mi Perfil</Link></li>
            <li><Link to="/carrito" className="hover:underline">Mi Carrito</Link></li>
          </ul>
        </section>

        {/* Secciones Adicionales */}
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Recursos Adicionales</h2>
          <ul className="list-disc pl-5 space-y-2 text-blue-600">
            <li><Link to="/preguntasFrecuentes" className="hover:underline">Preguntas Frecuentes</Link></li>
            <li><Link to="/politica-devoluciones" className="hover:underline">Política de Devoluciones</Link></li>
            <li><Link to="/chat" className="hover:underline">Chat en Vivo</Link></li>
          </ul>
        </section>

        {/* Botón para volver */}
        <div className="mt-6 text-center">
          <Link to="/" className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition">
            Volver a Inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MapaSitio;
