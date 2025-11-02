// src/components/Skeleton.js
import React from "react";

const Skeleton = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-gray-50 z-[999] animate-fade-in-up"
    >
      <div
        className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100 
                   w-full max-w-xs sm:max-w-sm md:max-w-md flex flex-col transition-all duration-300"
      >
        {/* Imagen simulada */}
        <div className="w-full aspect-[4/5] bg-gradient-to-r from-blue-100 via-blue-200 to-blue-100 animate-pulse"></div>

        {/* Contenido simulado */}
        <div className="p-4 space-y-3">
          {/* Título */}
          <div className="h-5 bg-gray-300 rounded w-3/4 animate-pulse"></div>

          {/* Texto secundario */}
          <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse"></div>

          {/* Precio o info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2">
            <div className="h-4 bg-gray-300 rounded w-1/3 animate-pulse"></div>
            <div className="h-8 bg-blue-200 rounded-lg w-20 animate-pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skeleton;
