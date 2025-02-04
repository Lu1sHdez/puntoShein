// src/components/Layout.js
import React, { useEffect, useState } from "react";
import Encabezado from "./Encabezado";
import PieDePagina from "./PieDePagina";
import Breadcrumbs from "./Breadcrumbs";

const Layout = ({ children }) => {
  // 1) Arreglo con las rutas de tus imágenes de fondo
  const imagenesFondo = [
    "https://res.cloudinary.com/dgbs7sg9j/image/upload/v1733295506/moda1_qwtxdu.png",
    "https://res.cloudinary.com/dgbs7sg9j/image/upload/v1738378032/pshein_dsluvs.jpg",
    "https://res.cloudinary.com/dgbs7sg9j/image/upload/v1738384760/pshein1_dssmlw.avif",
  ];

  // 2) Estado para el índice de imagen actual
  const [currentIndex, setCurrentIndex] = useState(0);

  // 3) useEffect para cambiar de imagen cada 3 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      // Avanza al siguiente índice (o vuelve a 0)
      setCurrentIndex((prevIndex) =>
        prevIndex === imagenesFondo.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Cambia a 5000 ms = 5s

    // Limpia el intervalo al desmontar
    return () => clearInterval(intervalId);
  }, [imagenesFondo.length]);

  // 4) Combina tu gradient + la imagen actual
  const styleFondo = {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.6), rgba(255, 255, 255, 0.5)), url('${imagenesFondo[currentIndex]}')`,
  };

  return (
    <div
      className="flex flex-col min-h-screen bg-center bg-cover bg-no-repeat transition-all duration-500"
      style={styleFondo}
    >
      {/* Encabezado fijo */}
      <Encabezado />

      <div className="flex-grow pt-20">
        <Breadcrumbs />
        <div className="relative mt-4">
          <main className="relative">{children}</main>
        </div>
      </div>

      <PieDePagina />
    </div>
  );
};

export default Layout;
