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

    // Verificar si hay suficiente stock
    if (producto.stock < cantidad) {
      return res.status(400).json({ message: "No hay suficiente stock disponible" });
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

    // Actualizar el stock del producto
    producto.stock -= cantidad;
    await producto.save();

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
      include: [{
        model: Producto,
        as: "producto",
        attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen'], // Specify the fields you want
      }],
    });

    // Check if the cart is empty
    if (carrito.length === 0) {
      return res.status(404).json({ message: "El carrito está vacío." });
    }

    res.json(carrito);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el carrito", error });
  }
};

export const eliminarDelCarrito = async (req, res) => {
  try {
    const { usuario_id, producto_id } = req.body;

    // Buscar el producto en el carrito
    const itemCarrito = await Carrito.findOne({
      where: { usuario_id, producto_id },
    });

    if (!itemCarrito) {
      return res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }

    // Buscar el producto en la base de datos
    const producto = await Producto.findByPk(producto_id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Aumentar el stock del producto según la cantidad que estaba en el carrito
    producto.stock += itemCarrito.cantidad;
    await producto.save();

    // Eliminar el producto del carrito
    await itemCarrito.destroy();

    res.json({ message: "Producto eliminado del carrito y stock actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar del carrito", error });
  }
};

export const vaciarCarrito = async (req, res) => {
  try {
    const { usuario_id } = req.body;

    // Buscar todos los productos en el carrito del usuario
    const itemsCarrito = await Carrito.findAll({
      where: { usuario_id },
    });

    if (itemsCarrito.length === 0) {
      return res.status(404).json({ message: "El carrito está vacío" });
    }

    // Recorrer los productos en el carrito y actualizar el stock
    for (let item of itemsCarrito) {
      const producto = await Producto.findByPk(item.producto_id);
      if (producto) {
        producto.stock += item.cantidad; // Aumentar el stock del producto
        await producto.save();
      }
    }

    // Vaciar el carrito
    await Carrito.destroy({
      where: { usuario_id },
    });

    res.json({ message: "Carrito vaciado y stock de productos actualizado" });
  } catch (error) {
    res.status(500).json({ message: "Error al vaciar el carrito", error });
  }
};
