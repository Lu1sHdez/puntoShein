import React, { useEffect, useState } from "react";
import axios from "axios";
import ResumenDemanda from "./ResumenDemanda";
import TablaDemanda from "./TablaDemanda";
import { API_URL } from "../../ApiConexion";
import GraficaDemanda from "./GraficaDemanda";


const Demanda = () => {
  const [predicciones, setPredicciones] = useState([]);
  const [resumen, setResumen] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [filtro, setFiltro] = useState("alto");
  
  

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/prediccion/demanda`, {
          withCredentials: true,
        });

        const datos = res.data;

        // Simular clasificación por volumen de ventas según demanda total
        const clasificados = datos.map((p) => {
          const total = p.predicciones.reduce((sum, p) => sum + p.demanda_predicha, 0);

          return {
            ...p,
            total_predicho: total,
          };
        });

        // Ordenar por demanda total y clasificar
        const ordenados = clasificados.sort((a, b) => b.total_predicho - a.total_predicho);
        const total = ordenados.length;
        const tercio = Math.ceil(total / 3);

        const conNivel = ordenados.map((p, i) => {
          let nivel = "bajo";
          if (i < tercio) nivel = "alto";
          else if (i < tercio * 2) nivel = "medio";
          return { ...p, nivel };
        });

        let resumenPorNivel = {
            alto: { min: 0, max: 0 },
            medio: { min: 0, max: 0 },
            bajo: { min: 0, max: 0 },
          };
          
          ordenados.forEach((p, i) => {
            let nivel = "bajo";
            if (i < tercio) nivel = "alto";
            else if (i < tercio * 2) nivel = "medio";
          
            if (!resumenPorNivel[nivel].min || p.total_predicho < resumenPorNivel[nivel].min) {
              resumenPorNivel[nivel].min = p.total_predicho;
            }
            if (p.total_predicho > resumenPorNivel[nivel].max) {
              resumenPorNivel[nivel].max = p.total_predicho;
            }
          });
          

        setPredicciones(conNivel);
        setResumen(resumenPorNivel);

      } catch (error) {
        console.error("Error al obtener predicciones:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerDatos();
  }, []);

  const filtrados = predicciones.filter((p) => p.nivel === filtro);
  const resumenStock = {
    necesitanAbastecer: filtrados.filter(p => p.predicciones[0]?.demanda_predicha > p.stock_actual).length,
    stockJusto: filtrados.filter(p => p.predicciones[0]?.demanda_predicha >= p.stock_actual * 0.8 && p.predicciones[0]?.demanda_predicha <= p.stock_actual).length,
    stockSuficiente: filtrados.filter(p => p.predicciones[0]?.demanda_predicha < p.stock_actual * 0.8).length,
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Predicción de Demanda Semanal</h1>
      <p className="mb-2 text-xs text-gray-500">
        🔴 Necesitan abastecimiento: {resumenStock.necesitanAbastecer} &nbsp;
        🟡 Stock justo: {resumenStock.stockJusto} &nbsp;
        🟢 Stock suficiente: {resumenStock.stockSuficiente}
        </p>


      <ResumenDemanda filtro={filtro} setFiltro={setFiltro} />
      <GraficaDemanda productos={filtrados} />

      {!cargando && resumen[filtro] && (
        <p className="mb-4 text-sm text-gray-700">
            <p className="mb-2 text-sm text-gray-600">
            Total de productos en esta categoría: <strong>{filtrados.length}</strong>
            </p>

            Mostrando productos con{" "}
            <strong>
            {filtro === "alto" && "ventas altas"}
            {filtro === "medio" && "ventas medias"}
            {filtro === "bajo" && "ventas bajas"}
            </strong>{" "}
            (entre {Math.floor(resumen[filtro].min)} y {Math.ceil(resumen[filtro].max)} unidades que probablemente se venderán en las próximas 4 semanas).
        </p>
        )}


      {cargando ? (
        <p className="mt-6 text-gray-500">Cargando predicciones...</p>
      ) : (
        <TablaDemanda productos={filtrados} />
      )}

    </div>
  );
};

export default Demanda;
