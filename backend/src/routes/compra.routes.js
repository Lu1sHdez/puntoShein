import express from 'express';
import { verificarToken, validarRol } from '../middleware/auth.js';
import {
comprarAhora
} from "../controllers/compra.controller.js";

const router = express.Router();
const usuarios = validarRol(['usuario', 'empleado', 'administrador']);

router.post("/comprar", verificarToken, usuarios, comprarAhora);

export default router;
