// routes/empleado.routes.js
import express from 'express';
import { actualizarPerfil } from '../controllers/usuario.controller.js';
import { obtenerPerfil } from '../controllers/autenticacion.controller.js';
import { verificarToken, validarRol } from '../middleware/auth.js';

const router = express.Router();

const empleado = validarRol(['empleado']);


router.put('/perfil', verificarToken, empleado, actualizarPerfil);
router.get('/perfil', verificarToken, empleado, obtenerPerfil);

export default router;
