import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
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

ChartJS.register(
  CategoryScale,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const GraficaModal = ({ idProducto, onClose }) => {
  const [datos, setDatos] = useState([]);
  const [predicciones, setPredicciones] = useState([]);
  const [producto, setProducto] = useState(null);

  const API_URL = "http://localhost:4000/api";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resProd = await axios.get(`${API_URL}/ventas/productosVendidos`, { withCredentials: true });
        const prod = resProd.data.find(p => p.producto.id === parseInt(idProducto));
        setProducto(prod?.producto || null);

        const res1 = await axios.get(`${API_URL}/ventas/ventaSemanal/${idProducto}`, { withCredentials: true });
        const ventas = res1.data;
        setDatos(ventas);

        const predTemp = [];
        for (let i = ventas.length + 1; i <= ventas.length + 5; i++) {
          const res2 = await axios.get(`${API_URL}/ventas/predecir/${idProducto}?semana=${i}`, { withCredentials: true });
          predTemp.push({ semana: i, prediccion: res2.data.prediccion });
        }
        setPredicciones(predTemp);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    if (idProducto) fetchData();
  }, [idProducto]);

  const totalVentas = datos.reduce((sum, v) => sum + v.unidades_vendidas, 0);
  const promedioSemanal = (datos.length ? (totalVentas / datos.length).toFixed(2) : 0);

  const labels = [
    ...datos.map((v) => `Semana ${v.semana}`),
    ...predicciones.map((p) => `Semana ${p.semana}`),
  ];

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
        borderColor: "red",
        backgroundColor: "red",
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
        text: `Predicción de ventas semanales para "${producto?.nombre || "Producto"}"`,
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
      <div className="bg-white w-[95%] md:w-[90%] lg:w-[80%] h-[90%] p-6 rounded-lg shadow-xl overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded"
        >
          Cerrar
        </button>

        <h2 className="text-2xl font-bold text-center mb-4">
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
      </div>
    </div>
  );
};

export default GraficaModal;
