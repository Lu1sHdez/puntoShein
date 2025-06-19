import Producto from "../models/producto.model.js";
import Categoria from "../models/categoria.model.js"; //  Importar Categoria
import Subcategoria from "../models/subcategoria.model.js"; // 
import {Sequelize } from "sequelize";
import Talla from "../models/tallas.model.js";
import ProductoTalla from "../models/productoTalla.model.js";
import Venta from "../models/ventas.model.js";

import admin from 'firebase-admin';
import path from 'path'; // Importar path para manejar rutas
import { fileURLToPath } from 'url'; // Importar fileURLToPath para usar con import.meta.url

// Obtener la ruta del archivo actual y luego la ruta del archivo JSON
const __filename = fileURLToPath(import.meta.url); // obtener el nombre del archivo actual
const __dirname = path.dirname(__filename); // obtener el directorio donde se encuentra el archivo actual

// Cargar las credenciales desde el archivo serviceAccountKey.json
const serviceAccount = path.resolve(__dirname, '../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

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

const sendNotification = async (token, message) => {
  const payload = {
    notification: {
      title: 'Alerta de Stock',
      body: message,
    },
  };

  try {
    await admin.messaging().sendToDevice(token, payload);
    console.log('Notificación enviada');
  } catch (error) {
    console.error('Error al enviar notificación:', error);
  }
};

export const resumenStock = async (req, res) => {
  try {
    const productos = await Producto.findAll();

    let agotados = 0;
    let critico = 0;
    let ok = 0;
    let mensaje = '';

    productos.forEach(p => {
      if (p.stock === 0) {
        agotados++;
        mensaje += `El producto ${p.nombre} está agotado.\n`;
      } else if (p.stock <= 5) {
        critico++;
        mensaje += `El producto ${p.nombre} está próximo a agotarse.\n`;
      } else {
        ok++;
      }
    });

    // Aquí debes enviar la notificación
    if (mensaje) {
      const adminToken = 'ADMIN_FCM_TOKEN';  // El token de FCM del administrador
      sendNotification(adminToken, mensaje);  // Envía el mensaje al administrador
    }

    res.json({
      agotados,
      critico,
      ok,
    });
  } catch (error) {
    console.error("Error al obtener resumen de stock:", error);
    res.status(500).json({ mensaje: "Error al obtener resumen de stock" });
  }
};
