import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const AnalisisGrafica = () => {
  const { id } = useParams();
  const [datos, setDatos] = useState([]);
  const [predicciones, setPredicciones] = useState([]);
  const [producto, setProducto] = useState(null);

  const API_URL = "http://localhost:4000/api";

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const resProd = await axios.get(`${API_URL}/ventas/productosVendidos`, { withCredentials: true });
        const prod = resProd.data.find(p => p.producto.id === parseInt(id));
        setProducto(prod?.producto || null);

        const res1 = await axios.get(`${API_URL}/ventas/ventaSemanal/${id}`, { withCredentials: true });
        const ventas = res1.data;
        setDatos(ventas);

        const prediccionesTemp = [];
        for (let i = ventas.length + 1; i <= ventas.length + 5; i++) {
          const res2 = await axios.get(`${API_URL}/ventas/predecir/${id}?semana=${i}`, { withCredentials: true });
          prediccionesTemp.push({
            semana: i,
            prediccion: res2.data.prediccion,
          });
        }

        setPredicciones(prediccionesTemp);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    if (id) obtenerDatos();
  }, [id]);

  const labels = [
    ...datos.map((v) => `Semana ${v.semana}`),
    ...predicciones.map((p) => `Semana ${p.semana}`),
  ];

  const totalVentas = datos.reduce((sum, v) => sum + v.unidades_vendidas, 0);
  const promedioSemanal = (totalVentas / datos.length).toFixed(2);

  const data = {
    labels,
    datasets: [
      {
        label: "Ventas reales",
        data: datos.map((v) => v.unidades_vendidas),
        borderColor: "blue",
        backgroundColor: "blue",
        tension: 0.4,
        pointRadius: 5,
      },
      {
        label: "Predicción",
        data: [
          ...Array(datos.length).fill(null),
          ...predicciones.map((p) => p.prediccion),
        ],
        borderColor: "orange",
        backgroundColor: "orange",
        borderDash: [6, 3],
        tension: 0.4,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: "Predicción de Ventas Semanales",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: { display: true, text: "Unidades vendidas" },
      },
      x: {
        title: { display: true, text: "Semana" },
      },
    },
  };

  return (
    <div className="w-full px-6 py-10 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow border border-gray-300">
        <h2 className="text-3xl font-bold text-center mb-4">
          Análisis de Ventas: {producto?.nombre || "Producto"}
        </h2>

        {producto && (
          <div className="text-sm text-gray-700 mb-6 text-center">
            <p><strong>Precio:</strong> ${producto.precio}</p>
            <p><strong>Stock actual:</strong> {producto.stock} unidades</p>
            <p><strong>Promedio de ventas semanales:</strong> {promedioSemanal} unidades</p>
            <p><strong>Total vendido:</strong> {totalVentas} unidades</p>
          </div>
        )}

        <Line data={data} options={options} />

        <div className="mt-10">
          <h3 className="text-xl font-semibold mb-3 text-center">Historial de Ventas</h3>
          {datos.length === 0 ? (
            <p className="text-gray-600 text-center">No hay datos registrados.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm text-left text-gray-700 border border-gray-300">
                <thead className="bg-gray-200 text-gray-800 font-semibold">
                  <tr>
                    <th className="px-4 py-2 border-b">Semana</th>
                    <th className="px-4 py-2 border-b">Fecha</th>
                    <th className="px-4 py-2 border-b">Unidades Vendidas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {datos.map((venta, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-4 py-2">Semana {venta.semana}</td>
                      <td className="px-4 py-2 text-sm italic text-gray-600">
                        {new Date(venta.fecha).toLocaleDateString("es-MX", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-2">{venta.unidades_vendidas} unidades</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <button
            onClick={() => window.history.back()}
            className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition"
          >
            Regresar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnalisisGrafica;
