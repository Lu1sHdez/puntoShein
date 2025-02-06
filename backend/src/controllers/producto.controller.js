import Producto from "../models/producto.model.js";
import Categoria from "../models/categoria.model.js"; // ✅ Importar Categoria
import Subcategoria from "../models/subcategoria.model.js"; // ✅ Importar Subcategoria
import { Op, Sequelize } from "sequelize";

// 🔍 Buscar productos por nombre
export const buscarProductos = async (req, res) => {
  try {
    const { nombre } = req.query;

    if (!nombre) {
      return res.status(400).json({ mensaje: "El parámetro de búsqueda es obligatorio." });
    }

    const productos = await Producto.findAll({
      where: {
        nombre: {
          [Op.iLike]: `%${nombre}%`, // Permite buscar productos con coincidencias parciales
        },
      },
      include: [
        {
          model: Subcategoria,
          as: "subcategoria",
          include: {
            model: Categoria,
            as: "categoria",
          },
        },
      ],
    });

    res.json(productos);
  } catch (error) {
    console.error("Error al buscar productos:", error);
    res.status(500).json({ mensaje: "Error al buscar productos." });
  }
};

// 🔍 Obtener todos los productos (para AllProductos.js)
export const allProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll({
      order: Sequelize.literal("RANDOM()"),
      include: [
        {
          model: Subcategoria,
          as: "subcategoria",
          include: {
            model: Categoria,
            as: "categoria",
          },
        },
      ],
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

    const producto = await Producto.findByPk(id, {
      include: [
        {
          model: Subcategoria,
          as: "subcategoria",
          include: {
            model: Categoria,
            as: "categoria",
          },
        },
      ],
    });

    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado" });
    }

    res.json(producto);
  } catch (error) {
    console.error("Error al obtener detalles del producto:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

export const filtrarProductos = async (req, res) => {
    try {
      const { categoria_id, subcategoria_id } = req.query;
      let filtros = {};
  
      if (categoria_id) {
        filtros["$subcategoria.categoria_id$"] = categoria_id; // Filtra por categoría
      }
      if (subcategoria_id) {
        filtros.subcategoria_id = subcategoria_id; // Filtra por subcategoría
      }
  
      const productos = await Producto.findAll({
        where: filtros,
        include: [
          {
            model: Subcategoria,
            as: "subcategoria",
            include: {
              model: Categoria,
              as: "categoria",
            },
          },
        ],
      });
  
      res.json(productos);
    } catch (error) {
      console.error("Error al filtrar productos:", error);
      res.status(500).json({ mensaje: "Error al filtrar productos." });
    }
  };
  
// ✅ Obtener todas las categorías
export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// ✅ Obtener subcategorías según la categoría seleccionada
export const obtenerSubcategorias = async (req, res) => {
  try {
    const { categoria_id } = req.query;
    if (!categoria_id) {
      return res.status(400).json({ mensaje: "Se requiere el ID de la categoría." });
    }

    const subcategorias = await Subcategoria.findAll({
      where: { categoria_id },
    });

    res.json(subcategorias);
  } catch (error) {
    console.error("Error al obtener subcategorías:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};
