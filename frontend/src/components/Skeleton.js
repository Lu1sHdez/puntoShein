// src/components/Skeleton.js

const Skeleton = () => {
    return (
      <div className="space-y-4">
        {/* Fila de texto */}
        <div className="w-full h-6 bg-gray-300 animate-pulse rounded"></div>
  
        {/* Imagen o cuadro de contenido */}
        <div className="w-full h-48 bg-gray-300 animate-pulse rounded"></div>
  
        {/* Más contenido */}
        <div className="w-3/4 h-6 bg-gray-300 animate-pulse rounded"></div>
        <div className="w-1/2 h-6 bg-gray-300 animate-pulse rounded"></div>
      </div>
    );
  };
  
  export default Skeleton;
  