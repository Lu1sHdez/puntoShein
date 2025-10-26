import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LabelList,
} from "recharts";

const BarChartDemanda = ({ productos }) => {
  // Preparamos los datos con diferencia
  const data = productos
    .map((p) => {
      const prediccion = p.predicciones[0]?.demanda_predicha || 0;
      const stock = p.stock_actual || 0;
      return {
        nombre: p.producto_nombre,
        stock,
        demanda: prediccion,
        diferencia: prediccion - stock,
      };
    })
    .sort((a, b) => b.diferencia - a.diferencia); // Ordenar por urgencia

  // Asignar color según urgencia
  const getColor = (entry) => {
    if (entry.demanda > entry.stock) return "#dc2626"; // rojo fuerte
    if (entry.demanda >= entry.stock * 0.8) return "#eab308"; // amarillo
    return "#16a34a"; // verde
  };

  return (
    <div className="mt-6 p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4 text-gray-800">
        📊 Comparativa Visual: Stock vs Demanda
      </h2>
      <p className="text-sm text-gray-600 mb-4">
        Esta gráfica te permite identificar qué productos requieren abastecimiento urgente (🔴),
        cuáles están justos (🟡) y cuáles tienen suficiente stock (🟢).
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 80 }}>
          <XAxis
            dataKey="nombre"
            angle={-30}
            textAnchor="end"
            interval={0}
            height={100}
            tick={{ fontSize: 12 }}
          />
          <YAxis />
          <Tooltip />
          <Legend
            formatter={(value) => {
              if (value === "stock") return "Stock actual";
              if (value === "demanda") return "Demanda estimada";
              return value;
            }}
          />
          {/* Stock siempre morado */}
          <Bar dataKey="stock" name="stock" fill="#a78bfa">
            <LabelList dataKey="stock" position="top" fill="#6b21a8" fontSize={10} />
          </Bar>
          {/* Demanda con colores dinámicos */}
          <Bar dataKey="demanda" name="demanda">
          
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getColor(entry)} />
            ))}
            <LabelList dataKey="demanda" position="top" fill="#000" fontSize={10} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartDemanda;
