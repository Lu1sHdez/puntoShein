import React from "react";

const ProductoCard = ({ producto }) => {
  const prediccion = producto.predicciones[0]?.demanda_predicha || 0;
  const stock = producto.stock_actual || 0;

  // Calcular semanas que cubre el stock
  let acumulado = 0;
  let semanasCubiertas = 0;
  for (const p of producto.predicciones) {
    acumulado += p.demanda_predicha;
    if (acumulado > stock) break;
    semanasCubiertas++;
  }

  const getMensajeDecision = () => {
    if (prediccion > stock) {
      return {
        mensaje: `🔴 Demanda estimada: ${Math.round(prediccion)} unidades. Solo tienes ${stock}.\n Abastece al menos ${Math.ceil(prediccion - stock)} unidades para cubrir esta semana.`,
        color: "bg-red-100 text-red-700",
      };
    } else if (prediccion >= stock * 0.8) {
      return {
        mensaje: "🟡 El stock es justo. Considera abastecer pronto.",
        color: "bg-yellow-100 text-yellow-800",
      };
    } else if (prediccion < 1) {
      return {
        mensaje: "ℹ️ Este producto no se venderá mucho. No es necesario abastecer.",
        color: "bg-gray-100 text-gray-700",
      };
    } else {
      return {
        mensaje: "✅ Stock suficiente para la próxima semana.",
        color: "bg-green-100 text-green-700",
      };
    }
  };

  const { mensaje, color } = getMensajeDecision();

  return (
    <div className="p-4 border border-gray-300 rounded-2xl shadow hover:shadow-md transition bg-white">
      <div className="flex items-center gap-4">
        <img
          src={producto.imagen}
          alt={producto.producto_nombre}
          className="w-24 h-24 object-cover rounded-xl"
        />
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-800">{producto.producto_nombre}</h2>
          <p className="text-sm text-gray-600">🟤 Stock actual: {stock} unidades</p>
          <p className="text-sm text-gray-600">
            📈 Demanda estimada (semana próxima): {prediccion.toFixed(2)} unidades
          </p>
          <p className="text-sm text-gray-500">
            🕒 Stock cubre aproximadamente <strong>{semanasCubiertas}</strong> semana(s)
          </p>
        </div>
      </div>

      <div className={`mt-4 p-3 rounded-xl font-medium whitespace-pre-line ${color}`}>
        {mensaje}
      </div>
    </div>
  );
};

export default ProductoCard;
