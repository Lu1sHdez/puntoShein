import Venta from "../models/ventas.model.js";
import Producto from "../models/producto.model.js";
import ProductoTalla from "../models/productoTalla.model.js";

export const comprarAhora = async (req, res) => {
  try {
    const { producto_id, talla_id, cantidad, usuario_id } = req.body;

    if (!usuario_id) {
      return res.status(401).json({ mensaje: "Usuario no autenticado." });
    }

    // Validar producto
    const producto = await Producto.findByPk(producto_id);
    if (!producto) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }

    // Validar talla
    const productoTalla = await ProductoTalla.findOne({
      where: {
        producto_id,
        talla_id,
      },
    });

    if (!productoTalla) {
      return res.status(400).json({ mensaje: "La talla no está disponible para este producto." });
    }

    if (productoTalla.stock < cantidad) {
      return res.status(400).json({ mensaje: "Stock insuficiente para la talla seleccionada." });
    }

    // Registrar la venta
    const venta = await Venta.create({
      producto_id,
      usuario_id,
      cantidad,
      talla_id, // <- importante registrar también la talla vendida
    });

    // Descontar stock de la talla
    productoTalla.stock -= cantidad;
    await productoTalla.save();

    // Recalcular stock general y actualizar
    const stockTotal = await ProductoTalla.sum("stock", {
      where: { producto_id },
    });

    producto.stock = stockTotal;
    await producto.save();

    res.json({
      mensaje: "Compra realizada correctamente.",
      venta,
    });
  } catch (error) {
    console.error("Error al procesar la compra:", error);
    res.status(500).json({ mensaje: "Error interno al procesar la compra." });
  }
};
