import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import ResultadosVentas from './ResultadosVentas'; 
import axios from 'axios';
import { API_URL } from '../../../ApiConexion';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
} from 'chart.js';
import 'chartjs-adapter-date-fns';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  TimeScale
);

const GraficaPrediccion = ({ productoId, tallaId, modo }) => {
  const [datosReales, setDatosReales] = useState([]);
  const [datosPrediccion, setDatosPrediccion] = useState([]);
  const [productoInfo, setProductoInfo] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);



  // Calcular la constante de crecimiento k
  const calcularConstanteCrecimiento = () => {
    if (datosReales.length < 2) return null;
    
    const P0 = datosReales[0]?.unidades_vendidas;
    const Pt = datosReales[datosReales.length - 1]?.unidades_vendidas;
    const t = datosReales.length - 1;
    
    if (!P0 || P0 === 0 || t === 0) return null;
    
    // Fórmula: Pt = P0 * e^(k*t) => k = ln(Pt/P0)/t
    return Math.log(Pt / P0) / t;
};

const k = calcularConstanteCrecimiento();

  useEffect(() => {
    if (!productoId || !modo) return;
  
    const cargarDatos = async () => {
      try {
        setCargando(true);
        setError(null);
  
        // 1. Obtener información del producto
        const resProducto = await axios.get(`${API_URL}/api/productos/${productoId}`, {
          withCredentials: true
        });
  
        // 2. Obtener ventas reales
        const urlReal = `${API_URL}/api/ventas/${
          modo === 'dia' ? 'ventasPorDia' 
          : modo === 'semana' ? 'ventaSemanal' 
          : 'ventasPorMes'
        }/${productoId}`;

  
        const resVentas = await axios.get(urlReal, {
          withCredentials: true,
          params: tallaId ? { talla_id: tallaId } : {}
        });
  
        const totalVentas = resVentas.data.reduce((acc, curr) => acc + curr.unidades_vendidas, 0);
  
        // 3. Obtener stock actual
        let stockActual = 0;
        let nombreTalla = '';
  
        if (tallaId) {
          const resDetalle = await axios.get(`${API_URL}/api/productos/detallePorTalla`, {
            withCredentials: true,
            params: {
              producto_id: productoId,
              talla_id: tallaId
            }
          });
  
          stockActual = resDetalle.data?.stock || 0;
          nombreTalla = resDetalle.data?.talla || '';
        } else {
          stockActual = resProducto.data?.stock || 0;
        }
  
        const stockInicial = stockActual + totalVentas;
  
        setProductoInfo({
          ...resProducto.data,
          stockActual,
          stockInicial,
          nombreTalla
        });
  
        setDatosReales(resVentas.data);
  
        // 4. Obtener predicción
        const urlPred = `${API_URL}/api/ventas/prediccion/${modo}/${productoId}`;
        const resPred = await axios.get(urlPred, {
          withCredentials: true,
          params: tallaId ? { talla_id: tallaId } : {}
        });
  
        setDatosPrediccion(resPred.data);
      } catch (err) {
        console.error("Error al cargar datos para gráfica:", err);
        setError("No se puedo cargar los datos");
      } finally {
        setCargando(false);
      }
    };
  
    cargarDatos();
  }, [productoId, tallaId, modo]);
  

  // Función para formatear fechas según el modo
  const formatearFecha = (item) => {
    if (modo === 'dia') return item.fecha;
    if (modo === 'semana') return `Sem ${item.semana}`;
    if (modo === 'mes') return item.mes;
    return '';
  };

  // Obtener stock actual
  const stockActual = productoInfo?.stockActual || 0;
  const stockInicial = productoInfo?.stockInicial || 0;

  // Preparar datos para el gráfico
  const datosGrafico = {
    labels: [
      ...datosReales.map(item => formatearFecha(item)),
      ...datosPrediccion.map(item => formatearFecha(item))
    ],
    datasets: [
      {
        label: 'Ventas Reales',
        data: [
          ...datosReales.map(item => item.unidades_vendidas),
          ...Array(datosPrediccion.length).fill(null)
        ],
        borderColor: 'rgba(0, 200, 83, 1)', // Verde fuerte → combina con caja de crecimiento
        backgroundColor: 'rgba(0, 200, 83, 0.15)',
        tension: 0.3,
        fill: false,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8
      },
      {
        label: 'Predicción',
        data: [
          ...Array(datosReales.length).fill(null),
          ...datosPrediccion.map(item => item.unidades_estimadas)
        ],
        borderColor: 'rgba(255, 0, 0, 1)', // Rojo puro → no tiene tarjeta, solo se explica arriba
        backgroundColor: 'rgba(255, 0, 0, 0.15)',
        borderDash: [5, 5],
        tension: 0.3,
        fill: false,
        borderWidth: 3,
        pointRadius: 5,
        pointHoverRadius: 8
      },
      {
        label: 'Stock Actual',
        data: Array(datosReales.length + datosPrediccion.length).fill(stockActual),
        borderColor: 'rgba(33, 150, 243, 1)', // Azul fuerte → coincide con caja azul
        backgroundColor: 'rgba(33, 150, 243, 0.2)',
        borderWidth: 2,
        pointRadius: 0,
        fill: true
      },
      {
        label: 'Stock Inicial',
        data: Array(datosReales.length + datosPrediccion.length).fill(stockInicial),
        borderColor: 'rgba(233, 30, 99, 1)',
        backgroundColor: 'rgba(233, 30, 99, 0.2)',
        borderWidth: 2,
        borderDash: [5, 5],
        pointRadius: 0,
        fill: false
      }
    ]
  };

  const opciones = {
    responsive: true,
    maintainAspectRatio: false, // Permite controlar manualmente el aspect ratio
    plugins: {
      title: {
        display: true,
        text: `Tendencia de Ventas ${modo === 'dia' ? 'Diaria' : modo === 'semana' ? 'Semanal' : 'Mensual'}`,
        font: {
          size: 22,
          weight: 'bold'
        },
        padding: {
          top: 20,
          bottom: 10
        }
      },
      subtitle: {
        display: true,
        text: productoInfo?.nombre + (tallaId ? ` - Talla: ${productoInfo?.tallas?.find(t => t.id == tallaId)?.nombre}` : ''),
        font: {
          size: 16
        },
        padding: {
          bottom: 30
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += context.parsed.y + ' unidades';
              
              if (context.dataset.label === 'Stock Actual') {
                const ventasPromedio = datosReales.reduce((acc, curr) => acc + curr.unidades_vendidas, 0) / (datosReales.length || 1);
                const diasStock = Math.floor(stockActual / ventasPromedio);
                label += ` (Stock para ~${diasStock} ${modo === 'dia' ? 'días' : modo === 'semana' ? 'semanas' : 'meses'})`;
              }
              
              if (context.dataset.label === 'Stock Inicial') {
                label += ` (Stock inicial + ventas totales)`;
              }
            }
            return label;
          }
        },
        bodyFont: {
          size: 14
        },
        titleFont: {
          size: 16,
          weight: 'bold'
        },
        padding: 12,
        cornerRadius: 10
      },
      legend: {
        position: 'top',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 14
          },
          boxWidth: 12,
          boxHeight: 12
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: modo === 'dia' ? 'Días' : modo === 'semana' ? 'Semanas' : 'Meses',
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: {top: 10, bottom: 10}
        },
        grid: {
          display: false
        },
        ticks: {
          font: {
            size: 12
          }
        }
      },
      y: {
        title: {
          display: true,
          text: 'Unidades',
          font: {
            size: 14,
            weight: 'bold'
          },
          padding: {top: 10, bottom: 10}
        },
        min: 0,
        suggestedMax: Math.max(
          ...datosReales.map(d => d.unidades_vendidas),
          ...datosPrediccion.map(d => d.unidades_estimadas),
          stockInicial
        ) * 1.2,
        ticks: {
          font: {
            size: 12
          },
          stepSize: Math.ceil(Math.max(
            ...datosReales.map(d => d.unidades_vendidas),
            ...datosPrediccion.map(d => d.unidades_estimadas),
            stockInicial
          ) / 10)
        }
      }
    },
    interaction: {
      intersect: false,
      mode: 'index'
    },
    layout: {
      padding: {
        left: 20,
        right: 20,
        top: 20,
        bottom: 20
      }
    },
    elements: {
      line: {
        tension: 0.3
      }
    }
  };

  if (cargando) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
        <p className="mt-2 text-gray-600">Cargando datos de ventas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8 bg-red-50 rounded-lg">
        
      </div>
    );
  }

  if (datosReales.length < 2) {
    return (
      <div className="text-center py-8 bg-yellow-50 rounded-lg">
        <p className="text-yellow-800 font-medium">
          📊 No hay suficientes datos históricos para mostrar la gráfica. 
          Se necesitan al menos 2 {modo === 'dia' ? 'días' : modo === 'semana' ? 'semanas' : 'meses'} de ventas.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 mt-8 w-full">
      <div className="-m-4">
      <h4 className="text-2xl font-bold text-gray-800 mb-3">Análisis de Ventas Detallado</h4>
            <p className="text-gray-600 text-lg">
            La gráfica representa lo siguiente:
            </p>
            <ul className="list-disc list-inside text-gray-600 text-lg mt-2">
            <li>Línea <span className="text-green-600 font-semibold">verde</span>: ventas acumuladas reales registradas hasta la fecha.</li>
            <li>Línea <span className="text-red-500 font-semibold">roja</span>: proyección futura de ventas estimada mediante un modelo exponencial.</li>
            <li>Área <span className="text-blue-600 font-semibold">azul</span>: stock disponible actual  ({stockActual} unidades). </li>
            </ul>
      </div>
      
      <div className="h-[600px] w-full"> {/* Aumenté el tamaño de la gráfica */}
        <Line data={datosGrafico} options={opciones} />
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-blue-50 p-5 rounded-lg border border-blue-100 shadow-sm">
          <h4 className="font-semibold text-blue-800 mb-3 text-lg">📊 Ventas Totales</h4>
          <p className="text-3xl font-bold text-blue-600">
            {datosReales.reduce((acc, curr) => acc + curr.unidades_vendidas, 0)} unidades
          </p>
        </div>
        
        <div className="bg-green-50 p-5 rounded-lg border border-green-100 shadow-sm">
          <h4 className="font-semibold text-green-800 mb-3 text-lg">📈 Tasa de Crecimiento</h4>
          <p className="text-3xl font-bold text-green-600">
            {(
              ((datosReales[datosReales.length - 1]?.unidades_vendidas - datosReales[0]?.unidades_vendidas) / 
               datosReales[0]?.unidades_vendidas * 100) || 0
            ).toFixed(2)}%
          </p>
        </div>
        
        <div className="bg-blue-50 p-5 rounded-lg border border-blue-00 shadow-sm">
          <h4 className="font-semibold text-blue-700 mb-3 text-lg">📦 Stock Actual</h4>
          <p className="text-3xl font-bold text-blue-400">
            {stockActual} unidades
          </p>
          {stockActual > 0 && (
            <p className="text-base mt-2 text-blue-700">
              Suficiente para ~{Math.floor(
                stockActual / 
                (datosReales.reduce((acc, curr) => acc + curr.unidades_vendidas, 0) / datosReales.length)
              )} {modo === 'dia' ? 'días' : modo === 'semana' ? 'semanas' : 'meses'}
            </p>
          )}
        </div>

        <div className="bg-orange-50 p-5 rounded-lg border border-orange-100 shadow-sm">
         <h4 className="font-semibold text-orange-800 mb-3 text-lg">📦 Stock Inicial</h4>
         <p className="text-3xl font-bold text-orange-600">
            {stockInicial} unidades
          </p>
          <p className="text-base mt-2 text-orange-700">
            (Stock actual + ventas totales)
          </p>
        </div>
      </div>
      <ResultadosVentas 
        productoInfo={productoInfo}
        datosReales={datosReales}
        datosPrediccion={datosPrediccion}
        modo={modo}
        k={k} 
        />
    </div>
   
  
  );
};

export default GraficaPrediccion;