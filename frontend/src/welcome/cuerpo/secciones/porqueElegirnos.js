import React from "react";
import { BsTag, BsTruck, BsShieldCheck  } from "react-icons/bs";

const PorqueElegirnos = () => {
  return (
    <section className="relative isolate overflow-hidden bg-white py-20 sm:py-24">
      {/* Fondo difuminado azul suave */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-32 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%-12rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 rotate-[30deg] 
                     bg-gradient-to-tr from-blue-400 to-blue-700 opacity-20 sm:left-[calc(50%-36rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-12 animate-fade-in-up">
          ¿Por qué elegirnos?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-8">
          {/* Tarjeta 1 */}
          <div className="flex flex-col items-center bg-blue-50 rounded-2xl shadow-sm p-8 transition-all hover:scale-[1.03] hover:shadow-md animate-fade-in-up">
            <BsTag className="text-blue-600 text-5xl mb-4 animate-float" />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Ofertas increíbles
            </h3>
            <p className="text-sm text-gray-600">
              Precios irresistibles en todas nuestras colecciones.
            </p>
          </div>

          {/* Tarjeta 2 */}
          <div className="flex flex-col items-center bg-blue-50 rounded-2xl shadow-sm p-8 transition-all hover:scale-[1.03] hover:shadow-md animate-fade-in-up [animation-delay:0.15s]">
            <BsTruck className="text-blue-600 text-5xl mb-4 animate-float" />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Envíos rápidos
            </h3>
            <p className="text-sm text-gray-600">
              Entrega garantizada en tiempo récord.
            </p>
          </div>

          {/* Tarjeta 3 */}
          <div className="flex flex-col items-center bg-blue-50 rounded-2xl shadow-sm p-8 transition-all hover:scale-[1.03] hover:shadow-md animate-fade-in-up [animation-delay:0.3s]">
            <BsShieldCheck  className="text-blue-600 text-5xl mb-4 animate-float" />
            <h3 className="font-semibold text-lg text-gray-800 mb-2">
              Compra segura
            </h3>
            <p className="text-sm text-gray-600">
              Transacciones protegidas y confiables.
            </p>
          </div>
        </div>
      </div>

      {/* Fondo inferior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-15rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%+4rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 
                     bg-gradient-to-tr from-blue-400 to-blue-700 opacity-20 
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

export default PorqueElegirnos;
