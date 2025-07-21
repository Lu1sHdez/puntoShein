import express from 'express';
import { verificarToken, validarRol } from '../middleware/auth.js';

import {
  obtenerUsuarios,
  obtenerEmpleados,
  obtenerSoloUsuarios,
  obtenerAdmins,
  eliminarUsuario,
  obtenerUsuarioPorId,
  actualizarRol,
  obtenerRoles,
  recuperarPasswordAdmin,
  restablecerPasswordAdmin,
  cambiarPasswordAdmin,
  validarCodigoAdmin,
  enviarInvitacionEmpleado
} from '../controllers/admin.controller.js';
import { actualizarPerfil } from '../controllers/usuario.controller.js';
import { obtenerPerfil } from '../controllers/autenticacion.controller.js';
import {
  crearCategoria,
  crearSubcategoria,
  obtenerSubcategoriasPorCategoria,
  obtenerCategorias
} from '../controllers/categoria.controller.js';

const router = express.Router();

// Middleware de autenticación y autorización por rol
const admin = validarRol(['administrador']);

// Rutas para usuarios
router.get('/usuarios', verificarToken, admin, obtenerUsuarios);
router.get('/empleados', verificarToken, admin, obtenerEmpleados);
router.get('/solo-usuarios', verificarToken, admin, obtenerSoloUsuarios);
router.get('/admins', verificarToken, admin, obtenerAdmins);
router.get('/usuarios/:id', verificarToken, admin, obtenerUsuarioPorId);
router.delete('/usuarios/:id', verificarToken, admin, eliminarUsuario);

// Rutas para el perfil del usuario
router.put('/perfil', verificarToken, admin, actualizarPerfil);
router.get('/perfil', verificarToken, admin, obtenerPerfil);

// Rutas para categorías y subcategorías
router.get('/categorias', obtenerCategorias);  // Obtener todas las categorías
router.post('/categorias', verificarToken, admin, crearCategoria);  // Crear nueva categoría
router.get('/subcategorias', obtenerSubcategoriasPorCategoria);  // Obtener todas las subcategorías
router.post('/subcategorias', verificarToken, admin, crearSubcategoria);  // Crear nueva subcategoría

// Rutas para roles
router.put('/usuarios/:id/rol', verificarToken, admin, actualizarRol);  // Actualizar rol de usuario
router.get('/roles', verificarToken, admin, obtenerRoles);  // Obtener roles disponibles

// Rutas de recuperación de contraseña para el administrador
router.put('/cambiar-contrasena', express.json(), verificarToken, admin, cambiarPasswordAdmin);  // requiere sesión
router.post('/recuperar-password', express.json(), recuperarPasswordAdmin);  // no requiere sesión
router.put('/restablecer-password', express.json(), restablecerPasswordAdmin);  // no requiere sesión
router.post('/validar-codigo', express.json(), validarCodigoAdmin);  // no requiere sesión

router.post('/enviarInvitacionEmpleado', verificarToken, admin, enviarInvitacionEmpleado);  // no requiere sesión


/* GESTION DE EMPLEADOS */
export default router;
