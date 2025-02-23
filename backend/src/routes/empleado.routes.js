// routes/empleado.routes.js
import express from 'express';
import { obtenerTareasEmpleado } from '../controllers/empleado.controller.js';
import { validarRol } from '../middleware/validarRol.js';

const router = express.Router();

// Rutas solo para empleados
router.get('/tareas', validarRol(['empleado']), obtenerTareasEmpleado);

export default router;
