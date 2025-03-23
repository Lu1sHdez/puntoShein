import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const AnalisisProductos = () => {
  const [datos, setDatos] = useState([]);
  const [filtro, setFiltro] = useState("Todos");
  const [loading, setLoading] = useState(true);
  const [meses, setMeses] = useState(1);
  const [prediccion, setPrediccion] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await axios.get("http://localhost:4000/api/ventas/productosMasVendidos", {
          withCredentials: true,
        });
        const productosProcesados = res.data.map((venta) => ({
          producto_id: venta.producto_id,
          nombre: venta.producto.nombre,
          imagen: venta.producto.imagen,
          precio: parseFloat(venta.producto.precio),
          categoria: venta.producto.subcategoria.categoria.nombre,
          subcategoria: venta.producto.subcategoria.nombre,
          total_vendido: parseInt(venta.total_vendido),
        }));
        setDatos(productosProcesados);
      } catch (error) {
        console.error("Error al obtener productos más vendidos:", error);
      } finally {
        setLoading(false);
      }
    };

    obtenerDatos();
  }, []);

  const datosFiltrados =
    filtro === "Todos" ? datos : datos.filter((p) => p.nombre === filtro);

  const predecir = async () => {
    const producto = datos.find((p) => p.nombre === filtro);
    if (!producto) return;
    try {
        const res = await axios.get(
        `http://localhost:4000/api/ventas/predecir/${producto.producto_id}/${meses}`, {
          withCredentials: true,
        });
                  
      setPrediccion(res.data);
    } catch (err) {
      console.error("Error al predecir:", err);
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg w-full max-w-6xl mx-auto mt-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
        Productos Más Vendidos - Categoría: Vestidos
      </h2>

      <div className="mb-6">
        <label htmlFor="filtroProductos" className="block text-sm font-medium text-gray-700">
          Filtrar por producto:
        </label>
        <select
          id="filtroProductos"
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        >
          <option value="Todos">Todos</option>
          {datos.map((producto, index) => (
            <option key={index} value={producto.nombre}>
              {producto.nombre}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-6">
        <label htmlFor="meses" className="block text-sm font-medium text-gray-700">
          ¿En cuántos meses deseas predecir la demanda?
        </label>
        <input
          id="meses"
          type="number"
          min="1"
          value={meses}
          onChange={(e) => setMeses(e.target.value)}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm"
        />
        <button
          onClick={predecir}
          className="mt-3 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
        >
          Calcular predicción
        </button>
      </div>

      {prediccion && (
        <div className="mb-6 bg-green-50 border border-green-200 rounded p-4">
          <h4 className="font-bold text-green-700 mb-2">Predicción estimada</h4>
          <p>Para el mes {prediccion.meses}, se estima que se venderán <strong>{prediccion.prediccion}</strong> unidades.</p>
          <p className="text-sm text-gray-600">Sugerencia de compra: {Math.ceil(prediccion.prediccion * 1.1)} unidades (con 10% extra de seguridad).</p>
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-500">Cargando datos...</p>
      ) : datos.length === 0 ? (
        <p className="text-center text-gray-500">No hay ventas registradas aún.</p>
      ) : (
        <>
          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {datosFiltrados.map((producto, index) => (
              <div
                key={index}
                className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg shadow-sm border"
              >
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{producto.nombre}</h3>
                  <p className="text-sm text-gray-600">
                    {producto.categoria} - {producto.subcategoria}
                  </p>
                  <p className="text-pink-600 font-bold">Total Vendido: {producto.total_vendido}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={datosFiltrados}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="nombre" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total_vendido" fill="#ec4899" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default AnalisisProductos;
