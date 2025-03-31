import express from 'express';
import {obtenerPerfil} from '../controllers/autenticacion.controller.js';
import {actualizarPerfil } from '../controllers/usuario.controller.js';
import { verificarToken, validarRol } from '../middleware/auth.js';

const router = express.Router();

const usuario = validarRol(['usuario']);

// Ruta para obtener el perfil del usuario
router.get('/perfil',verificarToken, usuario, obtenerPerfil);
// Ruta para obtener el perfil del usuario
router.put('/perfil', verificarToken, usuario, actualizarPerfil);

export default router;  
