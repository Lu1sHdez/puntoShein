import express from 'express';
import { registro, login, cerrarSesion, recuperarPassword,restablecerPassword} from '../controllers/autenticacion.controller.js';

const router = express.Router();

// Ruta para registrar usuarios
router.post('/registro', express.json(), registro);

// Ruta para iniciar sesión
router.post('/login', express.json(), login);

// Ruta para cerrar sesión
router.post('/logout', cerrarSesion);

// Ruta de recuperar contraseña
router.post('/recuperarPassword', express.json(), recuperarPassword);
// Ruta para restablecer contraseña
router.post('/restablecerPassword', express.json(), restablecerPassword);

export default router;
