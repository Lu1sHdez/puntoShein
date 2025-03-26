import React from 'react';
import { FaLightbulb, FaChartLine, FaInfoCircle, FaCalculator } from 'react-icons/fa';

const ResultadosVentas = ({ productoInfo, modo, datosReales, datosPrediccion, k }) => {
  const totalVentas = datosReales.reduce((acc, curr) => acc + curr.unidades_vendidas, 0);
  const crecimientoTotal = (
    ((datosReales[datosReales.length - 1]?.unidades_vendidas - datosReales[0]?.unidades_vendidas) /
      datosReales[0]?.unidades_vendidas) * 100 || 0
  ).toFixed(2);

  const proximaPrediccion = datosPrediccion[0]?.unidades_estimadas || 0;
  const ventasPromedio = totalVentas / (datosReales.length || 1);
  const stockActual = productoInfo?.stockActual || 0;
  const diasStock = Math.floor(stockActual / ventasPromedio);

  return (
    <section className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mt-10 w-full">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">📊 Resultados y Análisis Avanzado</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recomendaciones */}
        <div className="bg-green-50 p-6 rounded-lg border border-green-100 shadow-md">
          <div className="flex items-center mb-4">
            <FaLightbulb className="text-yellow-500 text-2xl mr-2" />
            <h3 className="text-xl font-bold text-green-800">✅ Recomendaciones</h3>
          </div>
          <ul className="text-gray-700 list-disc list-inside space-y-2">
            <li>Actualmente se han vendido <strong>{totalVentas}</strong> unidades del producto.</li>
            <li>La proyección indica que se podrían vender <strong>{proximaPrediccion}</strong> unidades en el siguiente periodo ({modo}).</li>
            <li>
              La tasa de crecimiento es de <strong>{crecimientoTotal}%</strong>. {
                crecimientoTotal < 0
                  ? 'Se recomienda reducir el stock o promociones.'
                  : 'Se recomienda mantener o aumentar stock disponible.'
              }
            </li>
            <li>
              El stock actual ({productoInfo?.stockActual} unidades) es {
                productoInfo?.stockActual > proximaPrediccion
                  ? 'suficiente para el próximo periodo.'
                  : 'posiblemente insuficiente, considera reabastecer.'
              }
            </li>
          </ul>

          <div className={`mt-6 p-4 rounded-lg ${
            diasStock < 7 ? 'bg-red-50 border-red-200 border' : 
            diasStock < 14 ? 'bg-yellow-50 border-yellow-200 border' : 
            'bg-green-50 border-green-200 border'
          }`}>
            <h4 className="font-semibold text-lg flex items-center">
              <FaInfoCircle className="mr-2" />
              Nivel de Stock Actual
            </h4>
            <p className="mt-2">
              Tienes stock para aproximadamente <span className="font-bold">{diasStock} {modo === 'dia' ? 'días' : modo === 'semana' ? 'semanas' : 'meses'}</span>.
              {diasStock < 7 ? (
                <span className="text-red-600 font-medium"> Considera reponer inventario pronto.</span>
              ) : diasStock < 14 ? (
                <span className="text-yellow-700 font-medium"> Tu stock es moderado, monitorea las ventas.</span>
              ) : (
                <span className="text-green-700 font-medium"> Tu stock es saludable.</span>
              )}
            </p>
          </div>

          <div className="mt-6 p-4 rounded-lg bg-purple-50 border border-purple-200">
            <h4 className="font-semibold text-lg flex items-center">
              <FaCalculator className="mr-2" />
              Acciones Recomendadas
            </h4>
            <ul className="mt-2 list-disc pl-5 space-y-1">
              {diasStock < 7 ? (
                <li>Realiza un pedido de emergencia para reponer stock</li>
              ) : null}
              <li>Ajusta los niveles de inventario según la proyección</li>
              <li>Considera promociones si la tendencia es bajista</li>
              <li>Monitorea las ventas diarias/semanales según el caso</li>
            </ul>
          </div>
        </div>

        {/* Modelo de Proyección */}
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 shadow-md">
          <div className="flex items-center mb-4">
            <FaChartLine className="text-blue-500 text-2xl mr-2" />
            <h3 className="text-xl font-bold text-blue-800">📐 Modelo de Proyección</h3>
          </div>
          <p className="text-gray-700 mb-2">
            Se utilizó un modelo de crecimiento exponencial basado en la ecuación:
          </p>
          <p className="text-blue-600 font-mono text-sm text-center mb-4">
            P(t) = P<sub>0</sub> * e<sup>kt</sup>
          </p>
          <ul className="text-gray-700 list-disc list-inside space-y-2">
            <li>Valor inicial (P₀): <strong>{datosReales[0]?.unidades_vendidas}</strong></li>
            <li>Valor final (P<sub>t</sub>): <strong>{datosReales[datosReales.length - 1]?.unidades_vendidas}</strong></li>
            <li>Tiempo transcurrido (t): <strong>{datosReales.length - 1}</strong> {modo === 'dia' ? 'días' : modo === 'semana' ? 'semanas' : 'meses'}</li>
            <li>Constante de crecimiento (k): <strong>{
                k !== null && k !== undefined 
                    ? k.toFixed(4) 
                    : 'No calculable (verifique los datos iniciales)'
                }</strong></li>
          </ul>

          <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200">
            <h4 className="font-semibold text-lg text-green-800 mb-2">Precisión del Modelo</h4>
            <p className="text-sm text-gray-600 mb-2">Un modelo con buena precisión ayuda a tomar mejores decisiones.</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-green-600 h-2.5 rounded-full" 
                style={{ width: `${Math.min(100, (k || 0.5) * 25)}%` }}
              ></div>
            </div>
            <p className="mt-2 text-sm text-gray-600 italic">Esta barra simula la precisión basada en k (ajustable con datos reales)</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResultadosVentas;
