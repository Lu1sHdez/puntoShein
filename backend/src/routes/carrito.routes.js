import express from 'express';
import {
  agregarAlCarrito,
  obtenerCarrito,
  eliminarDelCarrito,
  vaciarCarrito
} from "../controllers/carrito.controller.js";

const router = express.Router();

router.post("/agregar", agregarAlCarrito); // Agregar producto al carrito
router.get("/:usuario_id", obtenerCarrito); // Obtener carrito de un usuario
router.delete("/eliminar", eliminarDelCarrito); // Eliminar un producto del carrito
router.delete("/vaciar", vaciarCarrito); // Vaciar carrito completo

export default router;
