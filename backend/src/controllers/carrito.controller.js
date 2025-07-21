import Carrito from "../models/carrito.model.js";
import Producto from "../models/producto.model.js";
import Talla from "../models/tallas.model.js"; // ✅ obligatorio


// Función auxiliar para verificar si la cantidad está dentro del límite
const verificarCantidadLimite = (cantidad) => {
  if (cantidad > 5) {
    return 5;  // Limita la cantidad a 5 si es mayor
  }
  return cantidad;
};

export const agregarAlCarrito = async (req, res) => {
  try {
    const { usuario_id, producto_id, cantidad, talla_id } = req.body;

    // Validar existencia del producto
    const producto = await Producto.findByPk(producto_id);
    if (!producto) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }

    // Validar existencia de la talla
    if (!talla_id) {
      return res.status(400).json({ message: "Debes seleccionar una talla" });
    }

    // Verificar cantidad
    const cantidadVerificada = verificarCantidadLimite(cantidad);

    // Buscar si ya existe el producto en el carrito con esa talla
    let itemCarrito = await Carrito.findOne({
      where: { usuario_id, producto_id, talla_id },
    });

    if (itemCarrito) {
      // Si ya está, sumar cantidades (sin pasarse del límite)
      itemCarrito.cantidad += cantidadVerificada;
      itemCarrito.cantidad = verificarCantidadLimite(itemCarrito.cantidad);
      await itemCarrito.save();
    } else {
      // Si no existe, crear nuevo registro
      itemCarrito = await Carrito.create({
        usuario_id,
        producto_id,
        talla_id,
        cantidad: cantidadVerificada,
      });
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
      include: [
        {
          model: Producto,
          as: "producto",
          attributes: ['id', 'nombre', 'descripcion', 'precio', 'imagen'],
        },
        {
          model: Talla,
          as: "talla",
          attributes: ['id', 'nombre'], // Devuelve talla seleccionada
        }
      ],
    });

    if (carrito.length === 0) {
      return res.status(200).json({ message: "El carrito está vacío." });
    }

    const totalCantidad = carrito.reduce((total, item) => total + item.cantidad, 0);

    res.json({ carrito, totalCantidad });

  }catch (error) {
    console.error("Error al obtener el carrito:", error); // ← log completo
    res.status(500).json({ message: "Error al obtener el carrito", error: error.message });
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



export const actualizarCantidad = async (req, res) => {
  try {
    const { usuario_id, producto_id, cantidad } = req.body;

    // Verificar si la cantidad no excede el límite
    const cantidadVerificada = verificarCantidadLimite(cantidad);

    const miCarrito = await Carrito.findOne({
      where: { usuario_id, producto_id },
    });

    if (!miCarrito) {
      return res.status(404).json({ message: "Producto no encontrado en el carrito" });
    }

    // Actualizar la cantidad
    miCarrito.cantidad = cantidadVerificada;

    await miCarrito.save();

    res.json({ message: "Cantidad actualizada", miCarrito });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la cantidad", error });
  }
};

export const obtenerCantidad = async (req, res) => {
  try {
    const { usuario_id } = req.params;

    // Buscar el total de productos en el carrito del usuario sin incluir detalles de los productos
    const totalCantidad = await Carrito.sum('cantidad', {
      where: { usuario_id }
    });

    if (totalCantidad === 0 || totalCantidad === null) {
      return res.status(200).json({ message: "El carrito está vacío." });
    }

    res.json({ totalCantidad }); // Devolver la cantidad total de productos en el carrito
  } catch (error) {
    res.status(500).json({ message: "Error al obtener la cantidad total de productos", error });
  }
};
