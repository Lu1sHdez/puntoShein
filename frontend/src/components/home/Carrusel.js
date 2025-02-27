// CarruselImg.js
import React from "react";
import Slider from "react-slick"; // Importamos react-slick para el carrusel

// Configuración del carrusel
const settings = {
  dots: true, // Muestra los puntos de navegación
  infinite: true, // El carrusel se desplaza infinitamente
  speed: 500, // La velocidad de la transición
  slidesToShow: 1, // Número de imágenes visibles al mismo tiempo
  slidesToScroll: 1, // Número de imágenes a desplazar al hacer clic
  autoplay: true, // Activa la reproducción automática
  autoplaySpeed: 3000, // Tiempo entre cada imagen (3 segundos)
  centerMode: true, // Hace que la imagen actual esté centrada
  centerPadding: "10%", // Añade relleno para que las imágenes previas/siguientes se vean ligeramente
  focusOnSelect: true, // Hace que la imagen se seleccione al hacer clic
};

const CarruselImg = () => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-6">
      <Slider {...settings}>
        <div className="relative">
          <img
            src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1738378032/pshein_dsluvs.jpg"
            alt="Imagen 1"
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="relative">
          <img
            src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733295506/moda1_qwtxdu.png"
            alt="Imagen 2"
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className="relative">
          <img
            src="https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733295506/moda1_qwtxdu.png"
            alt="Imagen 3"
            className="w-full h-auto rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-105"
          />
        </div>
        {/* Agrega más imágenes aquí si lo deseas */}
      </Slider>
    </div>
  );
};

export default CarruselImg;
