import React from "react";
import { FaTags, FaTruck, FaShieldAlt } from "react-icons/fa";

const PorqueElegirnos = () => {
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-center text-3xl md:text-4xl font-extrabold text-gray-800 mb-10">¿Por qué elegirnos?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
          <div className="flex flex-col items-center">
            <FaTags className="text-blue-500 text-4xl mb-3" />
            <h3 className="font-semibold text-lg text-gray-700 mb-2">Ofertas increíbles</h3>
            <p className="text-sm text-gray-500">Precios irresistibles en todas nuestras colecciones.</p>
          </div>
          <div className="flex flex-col items-center">
            <FaTruck className="text-blue-500 text-4xl mb-3" />
            <h3 className="font-semibold text-lg text-gray-700 mb-2">Envíos rápidos</h3>
            <p className="text-sm text-gray-500">Entrega garantizada en tiempo récord.</p>
          </div>
          <div className="flex flex-col items-center">
            <FaShieldAlt className="text-blue-500 text-4xl mb-3" />
            <h3 className="font-semibold text-lg text-gray-700 mb-2">Compra segura</h3>
            <p className="text-sm text-gray-500">Transacciones protegidas y confiables.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PorqueElegirnos;
