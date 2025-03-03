import express from 'express';
import { verificarToken, validarRol } from '../middleware/auth.js';
import {
  agregarAlCarrito,
  obtenerCarrito,
  eliminarDelCarrito,
  vaciarCarrito
} from "../controllers/carrito.controller.js";

const router = express.Router();
const usuarios = validarRol(['usuario', 'empleado', 'administrador']);

// Rutas protegidas para agregar productos al carrito, solo para usuarios autenticados
router.post("/agregar", verificarToken, usuarios, agregarAlCarrito);

// Ruta para obtener el carrito de un usuario
router.get("/:usuario_id", verificarToken, usuarios, obtenerCarrito);

// Rutas para eliminar o vaciar el carrito, solo accesibles por usuarios
router.delete("/eliminar", verificarToken, usuarios, eliminarDelCarrito);
router.delete("/vaciar", verificarToken, usuarios, vaciarCarrito);

export default router;
