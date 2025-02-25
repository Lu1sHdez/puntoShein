// routes/empleado.routes.js
import express from 'express';
import { actualizarPerfil } from '../controllers/usuario.controller.js';
import { obtenerPerfil } from '../controllers/autenticacion.controller.js';
import { verificarToken } from '../middleware/auth.js';


const router = express.Router();

router.put('/perfil', verificarToken, actualizarPerfil);
router.get('/perfil', verificarToken, obtenerPerfil);

export default router;
