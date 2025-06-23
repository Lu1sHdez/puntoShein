import Producto from "../models/producto.model.js";
import Categoria from "../models/categoria.model.js"; //  Importar Categoria
import Subcategoria from "../models/subcategoria.model.js"; // 
import {Sequelize } from "sequelize";
import Talla from "../models/tallas.model.js";
import ProductoTalla from "../models/productoTalla.model.js";
import Venta from "../models/ventas.model.js";
import TokenDispositivo from "../models/tokenDispositivo.model.js";
import { enviarNotificacionStock } from "../utils/notificaciones.js";


// Función para buscar productos por nombre
export const buscarProductos = async (req, res) => {
  try {
    const { nombre } = req.query;  // Obtener el término de búsqueda desde la query string

    if (!nombre) {
      return res.status(400).json({ mensaje: 'Debe proporcionar un término de búsqueda.' });
    }

    // Filtrar productos por nombre utilizando el término de búsqueda
    const productos = await Producto.findAll({
      where: {
        nombre: {
          [Sequelize.Op.iLike]: `%${nombre}%`,  // Usar iLike para insensibilidad a mayúsculas/minúsculas
        },
      },
    });

    // Devolver los productos que coinciden con el término de búsqueda
    res.json(productos);
  } catch (error) {
    console.error("Error al buscar productos:", error);
    res.status(500).json({ mensaje: "Error al buscar productos." });
  }
};

//  Obtener todos los productos (para AllProductos.js)
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
        {
          model: Talla,
          as: "tallas",
          through: {
            attributes: ['stock'], // stock por talla
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


//  Obtener un producto por su ID
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
        {
          model: Talla,
          as: "tallas",
          through: {
            attributes: ['stock'],
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
      filtros["$subcategoria.categoria_id$"] = categoria_id;
    }
    if (subcategoria_id) {
      filtros.subcategoria_id = subcategoria_id;
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
        {
          model: Talla,
          as: "tallas",
          through: {
            attributes: ['stock'],
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

  
//  Obtener todas las categorías
export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//  Obtener subcategorías según la categoría seleccionada
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
export const obtenerProductosPorSubcategoria = async (req, res) => {
  try {
    const { subcategoria_id } = req.query;

    if (!subcategoria_id) {
      return res.status(400).json({ mensaje: "Se requiere el ID de la subcategoría." });
    }

    const productos = await Producto.findAll({
      where: { subcategoria_id },
      include: [
        {
          model: Subcategoria,
          as: "subcategoria",
          include: {
            model: Categoria,
            as: "categoria",
          },
        },
        {
          model: Talla,
          as: "tallas",
          through: {
            attributes: ['stock'],
          },
        },
      ],
    });

    res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos por subcategoría:", error);
    res.status(500).json({ mensaje: "Error al obtener productos por subcategoría." });
  }
};


export const eliminarProducto = async (req, res) => {
  try {
    const { id } = req.params;

    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Verifica si está relacionado con alguna venta
    const ventasRelacionadas = await Venta.findOne({ where: { producto_id: id } });

    if (ventasRelacionadas) {
      return res.status(400).json({
        mensaje: 'No se puede eliminar este producto porque está relacionado con una o más ventas.',
      });
    }

    await producto.destroy();
    res.json({ mensaje: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar el producto:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el producto' });
  }
};

export const obtenerDetalleProductoPorTalla = async (req, res) => {
  try {
    const { producto_id, talla_id } = req.query;

    // 1. Obtener el producto
    const producto = await Producto.findByPk(producto_id, {
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

    // 2. Obtener la relación con la talla específica (stock)
    const relacion = await ProductoTalla.findOne({
      where: {
        producto_id,
        talla_id,
      },
    });

    if (!relacion) {
      return res.status(404).json({ mensaje: "Talla no asignada al producto" });
    }

    // 3. Obtener la talla (para nombre de la talla)
    const talla = await Talla.findByPk(talla_id);
    if (!talla) {
      return res.status(404).json({ mensaje: "Talla no encontrada" });
    }

    // 4. Devolver toda la  info del producto + talla y stock específico
    res.json({
      ...producto.toJSON(),
      stock: relacion.stock, // sobrescribimos el stock total con el de la talla seleccionada
      talla: talla.nombre,
    });

  } catch (error) {
    console.error("Error al obtener detalle por talla:", error);
    res.status(500).json({ mensaje: "Error interno al obtener detalle del producto" });
  }
};

export const resumenStock = async (req, res) => {
  try {
    const productos = await Producto.findAll();

    let agotados = 0;
    let critico = 0;
    let ok = 0;

    productos.forEach(p => {
      const cantidad = p.stock ?? 0;

      if (cantidad === 0) {
        agotados++;
      } else if (cantidad <= 10) {
        critico++;
      } else {
        ok++;
      }
    });

    res.json({ agotados, critico, ok });
  } catch (error) {
    console.error("Error al obtener resumen de stock:", error);
    res.status(500).json({ mensaje: "Error al obtener resumen de stock" });
  }
};

// Enviar notificaciones automáticas para productos agotados o críticos
export const notificaciones = async (req, res) => {
  try {
    const productos = await Producto.findAll();
    const tokens = await TokenDispositivo.findAll();

    const criticos = productos.filter(p => p.stock > 0 && p.stock <= 5);
    const agotados = productos.filter(p => p.stock === 0);

    if (tokens.length === 0) {
      return res.status(200).json({ mensaje: "No hay dispositivos registrados para enviar notificaciones." });
    }

    for (const { token } of tokens) {
      for (const p of criticos) {
        await enviarNotificacionStock(
          token,
          `⚠️ Stock bajo: ${p.nombre}`,
          `Quedan ${p.stock} unidades`
            );
        
      }

      for (const p of agotados) {
        await enviarNotificacionStock(
          token,
          `🚫 Agotado: ${p.nombre}`,
          `Sin unidades disponibles`
        );
        
      }
    }

    res.status(200).json({
      mensaje: "Notificaciones enviadas",
      criticos: criticos.map(p => p.nombre),
      agotados: agotados.map(p => p.nombre),
    });
  } catch (error) {
    console.error("Error al notificar productos críticos/agotados:", error);
    res.status(500).json({ mensaje: "Error al enviar notificaciones" });
  }
};
