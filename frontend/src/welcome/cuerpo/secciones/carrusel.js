import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const CarruselPromociones = () => {
  return (
    <section className="relative isolate overflow-hidden bg-white py-20 sm:py-24">
      {/* Fondo difuminado superior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%-12rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 rotate-[30deg] 
                     bg-gradient-to-tr from-blue-400 to-blue-700 opacity-25 sm:left-[calc(50%-36rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 animate-fade-in-up">
        <h2 className="text-center text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-12">
          Promociones destacadas
        </h2>

        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Carousel
            autoPlay
            infiniteLoop
            showThumbs={false}
            showStatus={false}
            interval={4000}
            transitionTime={800}
            className="rounded-2xl overflow-hidden"
          >
            <div className="relative">
              <img
                src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1738384760/pshein1_dssmlw.avif"
                alt="Nueva colección"
                className="h-64 sm:h-96 object-cover w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-6">
                <p className="text-white text-lg sm:text-xl font-medium">
                  Descubre nuestra nueva colección
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733295506/moda1_qwtxdu.png"
                alt="Descuentos"
                className="h-64 sm:h-96 object-cover w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-6">
                <p className="text-white text-lg sm:text-xl font-medium">
                  ¡Aprovecha nuestras promociones!
                </p>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733295790/moda3_ui7y2h.jpg"
                alt="Envíos rápidos"
                className="h-64 sm:h-96 object-cover w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end justify-center p-6">
                <p className="text-white text-lg sm:text-xl font-medium">
                  Envíos rápidos a todo Huejutla
                </p>
              </div>
            </div>
          </Carousel>
        </div>
      </div>

      {/* Fondo difuminado inferior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-15rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%+4rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 
                     bg-gradient-to-tr from-blue-400 to-blue-700 opacity-25 
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

export default CarruselPromociones;
