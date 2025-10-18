import Pedido from "../../models/app/pedido.model.js";
import DetallePedido from "../../models/app/detallePedido.model.js";
import Cliente from "../../models/app/cliente.model.js";
import EstadoPedido from "../../models/app/estado.model.js";

export const registrarPedido = async (req, res) => {
  const { clienteId, productos, total, anticipo, restante, metodoPago } = req.body;

  console.log("=== DEBUG REGISTRAR PEDIDO ===");
  console.log("clienteId:", clienteId);
  console.log("total:", total);
  console.log("anticipo:", anticipo);
  console.log("restante:", restante);
  console.log("metodoPago:", metodoPago);
  console.log("productos:", productos);

  try {
    // Validaciones base
    if (!clienteId || !productos || productos.length === 0) {
      return res.status(400).json({
        mensaje: "Faltan datos obligatorios: clienteId o productos.",
      });
    }

    const cliente = await Cliente.findByPk(clienteId);
    if (!cliente) {
      return res.status(404).json({ mensaje: "Cliente no encontrado." });
    }

    // Calcular el total si no viene desde el frontend
    const totalCalculado =
      total ||
      productos.reduce((acc, p) => acc + Number(p.precio) * Number(p.cantidad), 0);

    // === Validación y normalización del pago ===
    let anticipoFinal = Number(anticipo) || 0;
    let restanteFinal = Number(restante) || 0;
    let metodoPagoFinal = metodoPago || "Anticipo 50%";

    // Si no se envía método o valores coherentes, el backend ajusta
    const minimoAnticipo = totalCalculado * 0.5;

    if (anticipoFinal < minimoAnticipo) {
      return res.status(400).json({
        mensaje: `El anticipo no puede ser menor al 50% del total. Mínimo: $${minimoAnticipo.toFixed(2)}`,
      });
    }

    if (anticipoFinal > totalCalculado) {
      return res.status(400).json({
        mensaje: `El anticipo no puede ser mayor al total del pedido. Total: $${totalCalculado.toFixed(2)}`,
      });
    }

    // Si no se mandó el restante, se calcula automáticamente
    if (!restanteFinal || restanteFinal === 0) {
      restanteFinal = totalCalculado - anticipoFinal;
    }

    // Crear pedido principal
    const pedido = await Pedido.create({
      clienteId: cliente.id,
      total: totalCalculado,
      anticipo: anticipoFinal,
      restante: restanteFinal,
      metodoPago: metodoPagoFinal,
    });

    await EstadoPedido.create({
      pedidoId: pedido.id,
      estado: "Por hacer",
      observaciones: "Pedido registrado correctamente.",
    });

    // Crear detalles del pedido
    for (const producto of productos) {
      await DetallePedido.create({
        pedidoId: pedido.id,
        nombre_producto: producto.nombre,
        incluyeTalla: producto.incluyeTalla || false,
        talla: producto.talla || null,
        cantidad: producto.cantidad,
        costo: producto.costo || 0,
        precio: producto.precio,
        total: producto.precio * producto.cantidad,
      });
    }

    return res.status(201).json({
      mensaje: "Pedido registrado correctamente.",
      pedido: {
        id: pedido.id,
        clienteId: cliente.id,
        total: totalCalculado,
        anticipo: anticipoFinal,
        restante: restanteFinal,
        metodoPago: metodoPagoFinal,
        estado: "Por hacer",
      },
    });
  } catch (error) {
    console.error("Error al registrar pedido:", error);
    return res.status(500).json({
      mensaje: "Error interno del servidor.",
      error: error.message,
    });
  }
};

export const obtenerPedidosPorEstado = async (req, res) => {
  const { estado } = req.params; // Ejemplo: "Por hacer"

  try {
    const pedidos = await Pedido.findAll({
      include: [
        {
          model: EstadoPedido,
          where: { estado }, // 👈 filtra por el estado recibido
          attributes: ["estado", "observaciones", "createdAt"],
        },
        {
          model: Cliente,
          attributes: ["id", "nombre", "apellido_paterno", "telefono"],
        },
        {
          model: DetallePedido,
          attributes: [
            "id",
            "nombre_producto",
            "talla",
            "cantidad",
            "precio",
            "total",
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
    });

    if (!pedidos || pedidos.length === 0) {
      return res.status(404).json({ mensaje: `No hay pedidos con estado "${estado}".` });
    }

    res.status(200).json(pedidos);
  } catch (error) {
    console.error("Error al obtener pedidos por estado:", error);
    res.status(500).json({
      mensaje: "Error interno del servidor.",
      error: error.message,
    });
  }
};

export const marcarProductoComoCompletado = async (req, res) => {
  const { id } = req.params;
  const { completado } = req.body;

  try {
    const detalle = await DetallePedido.findByPk(id);
    if (!detalle) {
      return res.status(404).json({ mensaje: "Producto no encontrado." });
    }

    detalle.completado = completado;
    await detalle.save();

    // Verifica el estado general del pedido
    const pedido = await Pedido.findByPk(detalle.pedidoId, { include: DetallePedido });
    const totalProductos = pedido.DetallePedidos.length;
    const completados = pedido.DetallePedidos.filter((p) => p.completado).length;

    const estado = await EstadoPedido.findOne({ where: { pedidoId: pedido.id } });
    if (completados === totalProductos) {
      estado.estado = "Realizados";
    } else if (completados > 0) {
      estado.estado = "Parcial";
    } else {
      estado.estado = "Por hacer";
    }

    await estado.save();

    res.status(200).json({ mensaje: "Producto actualizado correctamente", pedido });
  } catch (error) {
    console.error("Error al marcar producto:", error);
    res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
  }
};
export const actualizarEstadoPedido = async (req, res) => {
  const { pedidoId } = req.params;
  const { nuevoEstado } = req.body;

  try {
    const pedido = await Pedido.findByPk(pedidoId);
    if (!pedido) {
      return res.status(404).json({ mensaje: "Pedido no encontrado." });
    }

    const estado = await EstadoPedido.findOne({ where: { pedidoId } });
    if (!estado) {
      return res.status(404).json({ mensaje: "Estado del pedido no encontrado." });
    }

    const estadosValidos = ["Por hacer", "Realizados", "Por entregar", "Entregado"];
    if (!estadosValidos.includes(nuevoEstado)) {
      return res.status(400).json({ mensaje: "Estado no válido." });
    }

    // Actualizar estado
    estado.estado = nuevoEstado;
    estado.observaciones =
      nuevoEstado === "Por entregar"
        ? "El pedido ha llegado y está listo para entrega."
        : nuevoEstado === "Entregado"
        ? "El pedido ha sido entregado al cliente."
        : `El estado ha cambiado a ${nuevoEstado}.`;

    await estado.save();

    return res.status(200).json({
      mensaje: `El pedido ha sido actualizado a "${nuevoEstado}".`,
      estado: estado.estado,
      observaciones: estado.observaciones,
    });
  } catch (error) {
    console.error("Error al actualizar estado del pedido:", error);
    return res.status(500).json({
      mensaje: "Error interno del servidor.",
      error: error.message,
    });
  }
};
// === NUEVO: obtener actividades recientes ===
export const obtenerActividadesRecientes = async (req, res) => {
  try {
    const actividades = await EstadoPedido.findAll({
      include: [
        {
          model: Pedido,
          attributes: ["id", "total"],
          include: [
            {
              model: Cliente,
              attributes: ["nombre", "apellido_paterno"],
            },
          ],
        },
      ],
      order: [["createdAt", "DESC"]],
      limit: 10, // muestra las 10 más recientes
    });

    const data = actividades.map((a) => ({
      id: a.id,
      estado: a.estado,
      observaciones: a.observaciones,
      fecha: a.createdAt,
      cliente:
        a.Pedido?.Cliente?.nombre + " " + (a.Pedido?.Cliente?.apellido_paterno || ""),
      total: a.Pedido?.total || 0,
    }));

    res.status(200).json(data);
  } catch (error) {
    console.error("Error al obtener actividades recientes:", error);
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
};


