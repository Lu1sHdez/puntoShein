import React, { useState, useEffect } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import { useNavigate } from 'react-router-dom';
import RegresarButton from "../../../components/Regresar";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement
} from "chart.js";

// Registrar componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale,LineElement, PointElement, BarElement, Title, Tooltip, Legend);

const AnalisisVentas = () => {
  const [productos, setProductos] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState("");
  const [semana, setSemana] = useState("");
  const [meta, setMeta] = useState("");
  const [ventasSemanales, setVentasSemanales] = useState([]);
  const [prediccionVentas, setPrediccionVentas] = useState(null);
  const [predicciones, setPredicciones] = useState([]);
  const [prediccionMeta, setPrediccionMeta] = useState(null);
  const [productoDetalle, setProductoDetalle] = useState(null);
  const navigate = useNavigate();

  
  const [error, setError] = useState("");

  const API_URL = "http://localhost:4000/api/ventas";

  // Obtener la lista de productos vendidos
  useEffect(() => {
    const obtenerProductosVendidos = async () => {
      try {
        const response = await axios.get(`${API_URL}/productosVendidos`, { withCredentials: true });
        setProductos(response.data);
      } catch (err) {
        console.error("Error al obtener productos vendidos:", err);
      }
    };

    obtenerProductosVendidos();
  }, []);
  

  const obtenerVentasSemanales = async () => {
    if (!productoSeleccionado) {
      setError("Selecciona un producto.");
      return;
    }
  
    try {
      const response = await axios.get(`${API_URL}/ventaSemanal/${productoSeleccionado}`, {
        withCredentials: true,
      });
      const ventas = response.data;
      setVentasSemanales(ventas);
  
      // Obtener predicciones para 5 semanas futuras
      const prediccionesTemp = [];
      for (let i = ventas.length + 1; i <= ventas.length + 5; i++) {
        const res2 = await axios.get(`${API_URL}/predecir/${productoSeleccionado}?semana=${i}`, {
          withCredentials: true,
        });
        prediccionesTemp.push({
          semana: i,
          prediccion: res2.data.prediccion,
        });
      }
      setPredicciones(prediccionesTemp);
  
      setError("");
    } catch (err) {
      setError("Error al obtener las ventas semanales o predicciones.");
      setVentasSemanales([]);
      setPredicciones([]);
    }
  };
  

  // Predecir ventas futuras
  const predecirVentasFuturas = async () => {
    if (!productoSeleccionado || !semana) {
      setError("Selecciona un producto e ingresa el número de semana.");
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL}/predecir/${productoSeleccionado}?semana=${semana}`,
        { withCredentials: true }
      );
      setPrediccionVentas(response.data);
      setError("");
    } catch (err) {
      setError("Error al predecir las ventas futuras.");
      setPrediccionVentas(null);
    }
  };

  // Predecir semanas para alcanzar una meta
  const predecirSemanasPorMeta = async () => {
    if (!productoSeleccionado || !meta) {
      setError("Selecciona un producto e ingresa la meta de ventas.");
      return;
    }

    try {
      const response = await axios.get(
        `${API_URL}/predecirMeta/${productoSeleccionado}?meta=${meta}`,
        { withCredentials: true }
      );
      setPrediccionMeta(response.data);
      setError("");
    } catch (err) {
      setError("Error al predecir la meta.");
      setPrediccionMeta(null);
    }
  };

  // Datos para la gráfica de ventas semanales
  const datosGrafica = {
    labels: ventasSemanales.map((venta) => `Semana ${venta.semana}`),
    datasets: [
      {
        label: "Unidades Vendidas",
        data: ventasSemanales.map((venta) => venta.unidades_vendidas),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const opcionesGrafica = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Ventas Semanales",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Semanas",
        },
      },
      y: {
        title: {
          display: true,
          text: "Unidades Vendidas",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      
      <div className="w-full px-12 bg-gray-100  py-10">
        
        <h2 className="text-2xl text-center font-bold mb-6">Análisis de venta</h2>
        <div className="grid grid-cols-2 gap-6">
          {/* Columna izquierda - arriba */}
          <div className="bg-white p-6 rounded-lg shadow border border-black">
              {/* Selección de producto */}
            <div className="mb-8 p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-bold mb-4">Seleccionar Producto</h2>
              <select
                value={productoSeleccionado}
                onChange={(e) => {
                  const id = e.target.value;
                  setProductoSeleccionado(id);
                  const seleccionado = productos.find(p => p.producto.id === parseInt(id));
                  setProductoDetalle(seleccionado?.producto || null);
                }}
                  className="p-2 border rounded w-full"
              >
                <option value="">Selecciona un producto</option>
                {productos.map((producto) => (
                  <option key={producto.producto.id} value={producto.producto.id}>
                    {producto.producto.nombre}
                  </option>
                ))}
              </select>
              <div>
              {productoSeleccionado && (
                  <div className="mt-4 text-sm text-gray-700">
                  {productoDetalle?.imagen && (
                      <img
                        src={productoDetalle.imagen}
                        alt="Imagen del producto"
                        className="w-full max-w-xs h-auto object-cover rounded-lg shadow-md border border-gray-300 mb-4"
                    />  
                  )}  
                    <p><strong>Precio:</strong> $ {productoDetalle?.precio}</p>
                    <p><strong>Stock:</strong> {productoDetalle?.stock} unidades</p>
                    <p><strong>Descripción:</strong> {productoDetalle?.descripcion}</p>
                  </div>
                )}              
              </div>
            </div>
          </div>

          {/* Columna derecha - arriba */}
          <div className="bg-white p-6 rounded-lg shadow border border-black">
            {/* Sección para obtener ventas semanales */}
            <div className="mb-8 p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-bold mb-4">Ventas Semanales</h2>
              <button
                onClick={obtenerVentasSemanales}
                className="p-2 bg-pink-600 text-white rounded"
              >
                Obtener Ventas
              </button>
              {error && <p className="text-red-500">{error}</p>}
              {ventasSemanales.length > 0 && (
                <div className="mt-4">
                  <Line
                    data={{
                      labels: [
                        ...ventasSemanales.map((v) => `Semana ${v.semana}`),
                        ...predicciones.map((p) => `Semana ${p.semana}`),
                      ],
                      datasets: [
                        {
                          label: "Ventas reales",
                          data: ventasSemanales.map((v) => v.unidades_vendidas),
                          borderColor: "blue",
                          backgroundColor: "blue",
                          tension: 0.3,
                          pointRadius: 5,
                        },
                        {
                          label: "Predicción",
                          data: [
                            ...Array(ventasSemanales.length).fill(null),
                            ...predicciones.map((p) => p.prediccion),
                          ],
                          borderColor: "red",
                          backgroundColor: "red",
                          borderDash: [5, 5],
                          tension: 0.3,
                          pointRadius: 5,
                        },
                      ],
                    }}
                    options={{
                      responsive: true,
                      plugins: {
                        legend: {
                          position: "top",
                        },
                        title: {
                          display: true,
                          text: "Ventas Reales + Predicción",
                        },
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: "Unidades vendidas",
                          },
                        },
                        x: {
                          title: {
                            display: true,
                            text: "Semana",
                          },
                        },
                      },
                    }}
                  />
                </div>
                
                
              )}              
            </div>
            <button className="p-2 bg-pink-600 text-white rounded"
             onClick={() => navigate(`/admin/gestionProductos/grafica/${productoSeleccionado}`)}>

              ver grafica completa

            </button>

          </div>
          {/* Columna derecha - abajo */}
          <div className="bg-white p-6 rounded-lg shadow border border-black">
            {/* Sección para predecir semanas para alcanzar una meta */}
            <div className="p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-bold mb-4">Predecir Semanas para Alcanzar Meta</h2>
              <div className="flex items-center mb-4">
                <input
                  type="number"
                  value={meta}
                  onChange={(e) => setMeta(e.target.value)}
                  placeholder="Meta de Ventas"
                  className="p-2 border rounded"
                />
                <button
                  onClick={predecirSemanasPorMeta}
                  className="ml-2 p-2 bg-pink-600 text-white rounded"
                >
                  Predecir
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {prediccionMeta && (
                <div>
                  <p>
                    Se estima que tomará {prediccionMeta.semanas} semanas vender {prediccionMeta.meta}{" "}
                    unidades.
                  </p>
                </div>
              )}
            </div>
            
          </div>

          {/* Columna izquierda - abajo */}
          <div className="bg-white p-6 rounded-lg shadow border border-black">
            {/* Sección para predecir ventas futuras */}
            <div className="mb-8 p-4 bg-white shadow-md rounded-lg">
              <h2 className="text-xl font-bold mb-4">Predecir Ventas Futuras</h2>
              <div className="flex items-center mb-4">
                <input
                  type="number"
                  value={semana}
                  onChange={(e) => setSemana(e.target.value)}
                  placeholder="Número de Semana"
                  className="p-2 border rounded"
                />
                <button
                  onClick={predecirVentasFuturas}
                  className="ml-2 p-2 bg-pink-600 text-white rounded"
                >
                  Predecir
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              {prediccionVentas && (
                <div>
                  <p>
                    Se estima que en la semana {prediccionVentas.semana} se venderán aproximadamente{" "}
                    {prediccionVentas.prediccion} unidades.
                  </p>
                </div>
              )}
            </div>
          </div>

          
          {/* Columna derecha - abajo */}
          <div className="bg-white p-6 rounded-lg shadow border border-black">
                {/* Sección para predecir semanas para alcanzar una meta */}
                <div className="p-4 bg-white shadow-md rounded-lg">
                  <h2 className="text-xl font-bold mb-4">Hostorial ventas semanal</h2>
                  {ventasSemanales.length === 0 ? (
                      <p className="text-gray-500">No hay datos disponibles.</p>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-sm text-left text-gray-700">
                          <thead className="bg-gray-200 text-gray-800 font-semibold">
                            <tr>
                              <th className="px-4 py-2 border-b">Semana</th>
                              <th className="px-4 py-2 border-b">Fecha</th>
                              <th className="px-4 py-2 border-b">Unidades Vendidas</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200">
                            {ventasSemanales.map((venta, index) => (
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
      </div>
    </div> 
  );
};

export default AnalisisVentas;