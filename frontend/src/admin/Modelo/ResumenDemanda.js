import React from "react";

const botones = [
  { nivel: "alto", texto: "Ventas Altas" },
  { nivel: "medio", texto: "Ventas Normales" },
  { nivel: "bajo", texto: "Ventas Bajas" },
];

const ResumenDemanda = ({ filtro, setFiltro }) => {
  return (
    <div className="flex gap-4 mb-6">
      {botones.map((btn) => (
        <button
          key={btn.nivel}
          onClick={() => setFiltro(btn.nivel)}
          className={`px-4 py-2 rounded-full font-semibold border transition 
            ${
              filtro === btn.nivel
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-white text-blue-700 border-blue-300 hover:bg-blue-50"
            }`}
        >
          {btn.texto}
        </button>
      ))}
    </div>
  );
};

export default ResumenDemanda;
