// src/components/Fondo.js
import React from 'react';

const Fondo = ({ children, backgroundUrl, height = "80vh" }) => {
  return (
    <section
      className="relative bg-cover bg-center flex items-center justify-center text-white"
      style={{
        backgroundImage: `url(${backgroundUrl})`,
        height: height, // Define the height of the section
      }}
    >
      <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full z-10"></div>
      <div className="relative z-20 w-full h-full flex flex-col items-center justify-center p-8">
        {children}
      </div>
    </section>
  );
};

export default Fondo;
