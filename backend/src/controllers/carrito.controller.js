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
      include: [{
        model: Producto,
        as: "producto",
        attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen'], // Specify the fields you want
      }],
    });

    // Checar si el carrito esta vacio
    if (carrito.length === 0) {
      return res.status(200).json({ message: "El carrito está vacío." });
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

    // Eliminar el producto del carrito
    await itemCarrito.destroy();

    res.json({ message: "Producto eliminado del carrito" });
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

    // Vaciar el carrito
    await Carrito.destroy({
      where: { usuario_id },
    });

    res.json({ message: "Carrito vaciado" });
  } catch (error) {
    res.status(500).json({ message: "Error al vaciar el carrito", error });
  }
};

  export const actualizarCantidad = async(req, res) =>{
    try {
      const {usuario_id, producto_id, cantidad} = req.body;

      if (cantidad>5){
          return res.status(400).json({message: "No puedes agregar mas productos"});
      };

      const miCarrito = await Carrito.findOne({
        where: {usuario_id, producto_id}
      });

      if (!miCarrito){
        return res.status(404).json({message: "Producto no encontrado en el carrito"});
      }

      miCarrito.cantidad = cantidad;
      await miCarrito.save();
      res.json({message: "Cantidad actualizada", miCarrito});

    } catch (error) {
      res.status(500).json({message: "Error al actualizar la cantidad", error})
    }
  };