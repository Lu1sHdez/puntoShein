import express from 'express';
import {obtenerPerfil} from '../controllers/autenticacion.controller.js';
import {actualizarPerfil } from '../controllers/usuario.controller.js';
import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

// Ruta para obtener el perfil del usuario
router.get('/perfil',verificarToken, obtenerPerfil);
// Ruta para obtener el perfil del usuario
router.put('/perfil', verificarToken, actualizarPerfil);


export default router;
