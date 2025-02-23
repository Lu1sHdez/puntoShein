// src/routes/admin.routes.js
import express from 'express';
import { obtenerUsuarios, 
    obtenerEmpleados, 
    obtenerSoloUsuarios, 
    obtenerAdmins, eliminarUsuario, 
    obtenerProductos,
    obtenerUsuarioPorId
 } from '../controllers/admin.controller.js';

const router = express.Router();

// Rutas para obtener usuarios con filtros
router.get('/usuarios', obtenerUsuarios);  // Ruta para obtener todos los usuarios (con filtro de rol si se pasa)
router.get('/empleados', obtenerEmpleados);  // Ruta para obtener empleados
router.get('/solo-usuarios', obtenerSoloUsuarios);  // Ruta para obtener solo usuarios
router.get('/admins', obtenerAdmins);  // Ruta para obtener administradores
router.get('/usuarios/:id', obtenerUsuarioPorId);  // Nueva ruta para obtener detalles de un usuario
router.delete('/usuarios/:id', eliminarUsuario);  // Ruta para eliminar un usuario
router.get('/productos', obtenerProductos);  // Ruta para obtener productos

export default router;
