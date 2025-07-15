import express from "express";
import { obtenerTallas} from "../controllers/talla.controller.js";
import { verificarToken, validarRol } from "../middleware/auth.js";

const router = express.Router();
const admin = validarRol(['administrador']); // Sólo administradores

// Ruta para obtener tallas
router.get("/obtener", verificarToken, admin, obtenerTallas);

export default router;
