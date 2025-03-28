import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../ApiConexion';
import GraficaPrediccion from './GraficaPrediccion';


const TablaVentas = ({ productoId, tallaId }) => {
  const [modo, setModo] = useState('dia'); // 'dia', 'semana', 'mes'
  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const obtenerTotalVendidas = () =>
    ventas.reduce((acc, venta) => acc + venta.unidades_vendidas, 0);



  useEffect(() => {
    if (!productoId) return;


    const cargarVentas = async () => {
      setCargando(true);
      setError(null);

      let url = '';
      if (modo === 'dia') url = `${API_URL}/api/ventas/ventasPorDia/${productoId}`;
      if (modo === 'semana') url = `${API_URL}/api/ventas/ventaSemanal/${productoId}`;
      if (modo === 'mes') url = `${API_URL}/api/ventas/ventasPorMes/${productoId}`;

      try {
        const res = await axios.get(url, {
          withCredentials: true,
          params: tallaId ? { talla_id: tallaId } : {},
        });
        setVentas(res.data);
      } catch (err) {
        setError('No hay ventas registradas para este producto.');
        setVentas([]);
      } finally {
        setCargando(false);
      }
    };

    cargarVentas();
  }, [productoId, tallaId, modo]);

  const calcularCrecimiento = (index) => {
    if (index === 0 || ventas.length < 2) return 'N/A';
  
    const anterior = ventas[index - 1].unidades_vendidas;
    const actual = ventas[index].unidades_vendidas;
  
    if (anterior === 0) return 'N/A';
  
    const crecimiento = ((actual - anterior) / anterior) * 100;
    const simbolo = crecimiento > 0 ? '↑' : crecimiento < 0 ? '↓' : '→';
  
    return `${simbolo} ${Math.abs(crecimiento).toFixed(2)}%`;
  };
  

  return (
   <div>
        <section className=" py-12 px-4 md:px-12">
      <div className="max-w-6xl mx-auto bg-white shadow-xl rounded-3xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h3 className="text-3xl font-bold text-gray-800 mb-2">📅 Historial de Ventas</h3>
          <div className="flex justify-center gap-4 mt-4">
            {['dia', 'semana', 'mes'].map((tipo) => (
              <button
                key={tipo}
                onClick={() => setModo(tipo)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition duration-200 shadow-sm ${
                  modo === tipo
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tipo === 'dia' ? '🗓️ Día' : tipo === 'semana' ? '📆 Semana' : '🗃️ Mes'}
              </button>
            ))}
          </div>
        </div>

        {cargando && (
          <p className="text-center text-gray-500 text-sm">Cargando ventas...</p>
        )}

        {error && (
          <div className="text-center bg-yellow-50 border border-yellow-300 text-yellow-800 px-6 py-4 rounded-lg font-medium shadow-sm">
            ⚠️ {error}
          </div>
        )}

        {!cargando && ventas.length > 0 && (
          <>
            <div className="overflow-x-auto shadow-lg rounded-xl border border-gray-200">
              <table className="min-w-full table-auto">
                <thead className="bg-blue-50 text-blue-800">
                  <tr>
                    <th className="py-3 px-5 text-left font-semibold border-b">🗓 Fecha</th>
                    <th className="py-3 px-5 text-left font-semibold border-b">📦 Unidades Vendidas</th>
                    <th className="py-3 px-5 text-left font-semibold border-b">📈 Crecimiento</th>

                  </tr>
                </thead>
                <tbody>
                    {ventas.map((venta, idx) => (
                        <tr key={idx} className="hover:bg-gray-50 transition duration-150 border-b">
                        <td className="py-2 px-5">
                            {modo === 'dia' && venta.fecha &&
                                new Date(venta.fecha).toLocaleDateString('es-MX')}

                            {modo === 'semana' && venta.semana &&
                                `Semana ${venta.semana} (${new Date(venta.fecha).toLocaleDateString('es-MX')})`}

                            {modo === 'mes' && venta.mes &&
                                venta.mes.charAt(0).toUpperCase() + venta.mes.slice(1)} {/* Capitalizar primera letra */}
                            </td>

                        <td className="py-2 px-5 font-medium text-gray-800">
                            {venta.unidades_vendidas}
                        </td>
                        <td className={`py-2 px-5 font-medium ${
                            calcularCrecimiento(idx).includes('↑') 
                            ? 'text-green-600' 
                            : calcularCrecimiento(idx).includes('↓') 
                                ? 'text-red-600' 
                                : 'text-gray-500'
                        }`}>
                            {calcularCrecimiento(idx)}
                        </td>
                        </tr>
                    ))}
                    </tbody>

              </table>
            </div>

            <div className="mt-6 text-center">
              <p className="text-gray-700 font-medium text-lg">
                🧾 Total de unidades vendidas:{' '}
                <span className="text-blue-600 font-bold">{obtenerTotalVendidas()}</span>
              </p>
            </div>
          </>
        )}
      </div>
            


    </section>
    <GraficaPrediccion productoId={productoId} tallaId={tallaId} modo={modo} />

   </div> 




  );
};

export default TablaVentas;
