import Carrito from "../models/carrito.model.js";
import Producto from "../models/producto.model.js";

export const agregarAlCarrito = async (req, res) => {
  try {
    const { usuario_id, producto_id, cantidad } = req.body;

    // Verificar si el producto existe
    const producto = await Producto.findByPk(producto_id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Buscar si ya existe el producto en el carrito del usuario
    let itemCarrito = await Carrito.findOne({
      where: { usuario_id, producto_id },
    });

    if (itemCarrito) {
      // Si ya está en el carrito, actualizar la cantidad
      itemCarrito.cantidad += cantidad;
      await itemCarrito.save();
    } else {
      // Si no está, crear un nuevo registro
      itemCarrito = await Carrito.create({ usuario_id, producto_id, cantidad });
    }

    res.json({ message: "Producto agregado al carrito", itemCarrito });
  } catch (error) {
    res.status(500).json({ message: "Error al agregar al carrito", error });
  }
};
export const obtenerCarrito = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    const carrito = await Carrito.findAll({
      where: { usuario_id },
      include: [{ model: Producto, as: "producto" }],
    });

    res.json(carrito);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el carrito", error });
  }
};
export const eliminarDelCarrito = async (req, res) => {
  try {
    const { usuario_id, producto_id } = req.body;

    const deleted = await Carrito.destroy({
      where: { usuario_id, producto_id },
    });

    if (deleted) {
      res.json({ message: "Producto eliminado del carrito" });
    } else {
      res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar del carrito", error });
  }
};
export const vaciarCarrito = async (req, res) => {
  try {
    const { usuario_id } = req.body;

    await Carrito.destroy({
      where: { usuario_id },
    });

    res.json({ message: "Carrito vaciado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al vaciar el carrito", error });
  }
};
