// src/components/Skeleton.js
import React from "react";

const Skeleton = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[9999] animate-fade-in-up">
      {/* === Contenedor principal === */}
        
        {/* === Lado izquierdo: imagen o banner simulado === */}
        <div className="flex-1 bg-gray-100 animate-pulse h-[300px] lg:h-auto" />

        {/* === Lado derecho: contenido simulado === */}
        <div className="flex-1 p-8 space-y-6">
          {/* Título principal */}
          <div className="h-8 bg-gray-300 rounded w-3/4 animate-pulse"></div>

          {/* Subtítulo */}
          <div className="h-5 bg-gray-200 rounded w-1/2 animate-pulse"></div>

          {/* Bloques de texto */}
          <div className="space-y-3 pt-4">
            <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
          </div>

          {/* Botones simulados */}
          <div className="flex gap-4 pt-6">
            <div className="h-10 w-32 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-10 w-24 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
      </div>
    </div>
  );
};

export default Skeleton;
