import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const CarruselPromociones = () => {
  return (
    <section className="bg-blue-100 py-10">
      <div className="max-w-6xl mx-auto px-4">
        <Carousel
          autoPlay
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          interval={4000}
          transitionTime={800}
          className="rounded-lg overflow-hidden shadow-lg"
        >
          <div>
            <img
              src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1738384760/pshein1_dssmlw.avif"
              alt="Nueva colección"
              className="h-64 object-cover w-full"
            />
            <p className="legend bg-black bg-opacity-60 text-white text-sm">Descubre nuestra nueva colección</p>
          </div>

          <div>
            <img
              src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733295506/moda1_qwtxdu.png"
              alt="Descuentos"
              className="h-64 object-cover w-full"
            />
            <p className="legend bg-black bg-opacity-60 text-white text-sm">¡Aprovecha nuestras promociones!</p>
          </div>

          <div>
            <img
              src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733295790/moda3_ui7y2h.jpg"
              alt="Envíos rápidos"
              className="h-64 object-cover w-full"
            />
            <p className="legend bg-black bg-opacity-60 text-white text-sm">Envíos rápidos a todo Huejutla</p>
          </div>
        </Carousel>
      </div>
    </section>
  );
};

export default CarruselPromociones;
