// src/routes/app/pedidos.routes.js
import { Router } from "express";
import {
  registrarPedido,
  obtenerPedidosPorEstado,
  marcarProductoComoCompletado,
  actualizarEstadoPedido,
  obtenerActividadesRecientes
} from "../../controllers/app/pedido.controller.js";

const router = Router();

router.post("/registrar", registrarPedido);
router.get("/estado/:estado", obtenerPedidosPorEstado);
router.put("/detalle/:id/completado", marcarProductoComoCompletado);
router.put("/:pedidoId/estado", actualizarEstadoPedido);
router.get("/actividades", obtenerActividadesRecientes); 
export default router;
