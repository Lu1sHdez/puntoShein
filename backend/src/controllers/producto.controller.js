import Producto from '../models/producto.model.js';
import { Op, Sequelize  } from 'sequelize';
// Buscar productos por nombre
export const buscarProductos = async (req, res) => {
  try {
    const { nombre } = req.query; // Recibe el término de búsqueda desde la URL

    if (!nombre) {
      return res.status(400).json({ mensaje: "El parámetro de búsqueda es obligatorio." });
    }

    // Buscar productos cuyo nombre contenga la palabra clave (insensible a mayúsculas y minúsculas)
    const productos = await Producto.findAll({
      where: {
        nombre: {
          [Op.iLike]: `%${nombre}%`, // Permite buscar productos con coincidencias parciales
        }
      }
    });

    res.json(productos);
  } catch (error) {
    console.error("Error al buscar productos:", error);
    res.status(500).json({ mensaje: "Error al buscar productos." });
  }
};
// Obtener todos los productos (para AllProductos.js)
export const allProductos = async (req, res) => {
    try {
      const productos = await Producto.findAll({
        order: Sequelize.literal("RANDOM()"),
      });
  
      res.json(productos);
    } catch (error) {
      console.error("Error al obtener productos:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};
// 🔍 Obtener un producto por su ID
export const obtenerProductoPorId = async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await Producto.findByPk(id);
  
      if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }
  
      res.json(producto);
    } catch (error) {
      console.error("Error al obtener detalles del producto:", error);
      res.status(500).json({ mensaje: "Error interno del servidor" });
    }
};

