import express from 'express';
import {obtenerPerfil} from '../controllers/autenticacion.controller.js';
import {actualizarPerfil } from '../controllers/usuario.controller.js';


const router = express.Router();

// Ruta para obtener el perfil del usuario
router.get('/perfil', obtenerPerfil);
// Ruta para obtener el perfil del usuario
router.put('/perfil', actualizarPerfil);


export default router;
