import Venta from "../models/ventas.model.js";
import Producto from "../models/producto.model.js";
import { Op } from "sequelize";

export const obtenerProductosVendidos = async (req, res) => {
  try {
    // Obtener IDs únicos de productos vendidos
    const ventas = await Venta.findAll({
      attributes: ["producto_id"],
      group: ["producto_id"],
    });

    const productoIds = ventas.map((v) => v.producto_id);

    if (productoIds.length === 0) {
      return res.status(404).json({ mensaje: "No hay productos vendidos aún." });
    }

    // Obtener información de los productos vendidos

    const productos = await Producto.findAll({
      where: {
        id: {
          [Op.in]: productoIds,
        },
      },
    });

    // Formato de respuesta
    const resultado = productos.map((producto) => ({
      producto: {
        id: producto.id,
        imagen:producto.imagen,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        stock: producto.stock,
        // Puedes agregar más campos si quieres
      },
    }));

    res.json(resultado);
  } catch (error) {
    console.error("Error al obtener productos vendidos:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const obtenerVentasSemanales = async (req, res) => {
  try {
    const { producto_id } = req.params;

    // Obtener todas las ventas del producto ordenadas por fecha
    const ventas = await Venta.findAll({
      where: { producto_id },
      order: [["fecha_venta", "ASC"]],
    });

    if (ventas.length === 0) {
      return res.status(404).json({ mensaje: "No hay ventas registradas para este producto" });
    }

    // Agrupar ventas por semana
    const ventasSemanales = {};

    ventas.forEach((venta) => {
      const fechaVenta = new Date(venta.fecha_venta);
      const semana = getWeekNumber(fechaVenta);

      if (!ventasSemanales[semana]) {
        ventasSemanales[semana] = {
          unidades_vendidas: 0,
          fecha: fechaVenta, // guardar la primera fecha de esa semana
        };
      }

      ventasSemanales[semana].unidades_vendidas += venta.cantidad;
    });

    // Formatear la respuesta
    const resultado = Object.entries(ventasSemanales).map(([semana, data]) => ({
      semana: parseInt(semana),
      unidades_vendidas: data.unidades_vendidas,
      fecha: data.fecha, // incluir la fecha en la respuesta
    }));

    res.json(resultado);
  } catch (error) {
    console.error("Error al obtener ventas semanales:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
// Función para obtener el número de semana a partir de una fecha
const getWeekNumber = (date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date - startOfYear) / 86400000;
  return Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
};
export const predecirVentasFuturas = async (req, res) => {
  try {
    const { producto_id } = req.params;
    const { semana } = req.query;

    if (!semana) {
      return res.status(400).json({ mensaje: "Se requiere el número de semana para la predicción." });
    }

    const s = parseInt(semana); // ✅ Conversión segura

    const producto = await Producto.findByPk(producto_id);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    const ventas = await Venta.findAll({
      where: { producto_id },
      order: [["fecha_venta", "ASC"]],
    });

    if (ventas.length < 2) {
      return res.status(400).json({ mensaje: "Se necesitan al menos 2 ventas para predecir." });
    }

    // Agrupar ventas por semana
    const fechaInicio = new Date(ventas[0].fecha_venta);
    const ventasSemanas = [];

    ventas.forEach((venta) => {
      const fecha = new Date(venta.fecha_venta);
      const semanaVenta = Math.floor((fecha - fechaInicio) / (1000 * 60 * 60 * 24 * 7)) + 1;

      if (!ventasSemanas[semanaVenta - 1]) ventasSemanas[semanaVenta - 1] = 0;
      ventasSemanas[semanaVenta - 1] += venta.cantidad;
    });

    // Ajuste exponencial usando regresión logarítmica
    const x = ventasSemanas.map((_, i) => i + 1);
    const y = ventasSemanas;
    const logY = y.map(v => Math.log(v));

    const n = x.length;
    const sumX = x.reduce((a, b) => a + b, 0);
    const sumLogY = logY.reduce((a, b) => a + b, 0);
    const sumXLogY = x.reduce((sum, xi, i) => sum + xi * logY[i], 0);
    const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);

    const b = (n * sumXLogY - sumX * sumLogY) / (n * sumX2 - sumX * sumX);
    const a = (sumLogY - b * sumX) / n;

    const P1 = Math.exp(a);
    const k = b;
    const prediccion = Math.round(P1 * Math.exp(k * (s - 1)));

    res.json({
      producto_id,
      nombre: producto.nombre,
      semana: s,
      prediccion,
      P1: P1.toFixed(2),
      k: k.toFixed(5),
      mensaje: `Se estima que en la semana ${s} se venderán aproximadamente ${prediccion} unidades.`,
    });
  } catch (error) {
    console.error("Error al predecir ventas por semana:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const predecirSemanasPorMeta = async (req, res) => {
  try {
    const { producto_id } = req.params;
    const { meta } = req.query;

    if (!meta) {
      return res.status(400).json({ mensaje: "Se requiere la meta de ventas para la predicción." });
    }

    const producto = await Producto.findByPk(producto_id);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    const ventas = await Venta.findAll({
      where: { producto_id },
      order: [["fecha_venta", "ASC"]],
    });

    if (ventas.length < 2) {
      return res.status(400).json({ mensaje: "Se necesitan al menos 2 ventas para predecir." });
    }

    // Agrupar ventas por semana
    const fechaInicio = new Date(ventas[0].fecha_venta);
    const ventasSemanas = [];

    ventas.forEach((venta) => {
      const fecha = new Date(venta.fecha_venta);
      const semanaVenta = Math.floor((fecha - fechaInicio) / (1000 * 60 * 60 * 24 * 7)) + 1;

      if (!ventasSemanas[semanaVenta - 1]) ventasSemanas[semanaVenta - 1] = 0;
      ventasSemanas[semanaVenta - 1] += venta.cantidad;
    });

    const P1 = ventasSemanas[0]; // Ventas en la primera semana
    const P2 = ventasSemanas[1]; // Ventas en la segunda semana
    const k = Math.log(P2 / P1); // Tasa de crecimiento

    const metaUnidades = parseInt(meta); // Meta de ventas
    const semanas = Math.ceil(Math.log(metaUnidades / P1) / k); // Semanas necesarias

    res.json({
      producto_id,
      nombre: producto.nombre,
      meta: metaUnidades,
      semanas,
      P1,
      P2,
      k: k.toFixed(5),
      mensaje: `Se estima que tomará ${semanas} semanas vender ${metaUnidades} unidades.`,
    });
  } catch (error) {
    console.error("Error al predecir semanas por meta:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};