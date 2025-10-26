import React from "react";
import ProductoCard from "./ProductoCard";

const TablaDemanda = ({ productos }) => {

    const ordenados = [...productos].sort((a, b) => {
        const dA = a.predicciones[0]?.demanda_predicha || 0;
        const sA = a.stock_actual || 0;
        const diffA = dA - sA;
      
        const dB = b.predicciones[0]?.demanda_predicha || 0;
        const sB = b.stock_actual || 0;
        const diffB = dB - sB;
      
        return diffB - diffA; // Orden descendente por urgencia
      });

      
  if (productos.length === 0) {
    return <p className="text-gray-600">No hay productos para este nivel de ventas.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {ordenados.map((producto) => (
        <ProductoCard key={producto.producto_id} producto={producto} />
        ))}
    </div>  
  );
};

export default TablaDemanda;
