import Venta from "../models/ventas.model.js";
import Producto from "../models/producto.model.js";

export const comprarAhora = async (req, res) => {
    try {
      const { producto_id, cantidad, usuario_id } = req.body;
  
      if (!usuario_id) {
        return res.status(401).json({ mensaje: "Usuario no autenticado (temporal fallback)" });
      }
  
      const producto = await Producto.findByPk(producto_id);
      if (!producto) {
        return res.status(404).json({ mensaje: "Producto no encontrado" });
      }
  
      if (producto.stock < cantidad) {
        return res.status(400).json({ mensaje: "Stock insuficiente" });
      }
  
      const venta = await Venta.create({
        producto_id,
        usuario_id,
        cantidad,
      });
  
      producto.stock -= cantidad;
      await producto.save();
  
      res.json({
        mensaje: "Compra simulada correctamente",
        venta,
      });
    } catch (error) {
      console.error("Error al simular la compra:", error);
      res.status(500).json({ mensaje: "Error al procesar la compra" });
    }
};
  