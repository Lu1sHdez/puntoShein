import Talla from "../models/tallas.model.js";

// Obtener todas las tallas disponibles
export const obtenerTallas = async (req, res) => {
  try {
    const tallas = await Talla.findAll();
    res.json(tallas);
  } catch (error) {
    console.error("Error al obtener tallas:", error);
    res.status(500).json({ mensaje: "Error interno al obtener tallas" });
  }
};
