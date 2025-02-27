// routes/admin.routes.js
import express from 'express';
import { verificarToken, validarRol } from '../middleware/auth.js';

import {
  obtenerUsuarios,
  obtenerEmpleados,
  obtenerSoloUsuarios,
  obtenerAdmins,
  eliminarUsuario,
  obtenerProductos,
  obtenerUsuarioPorId,
  crearProducto,
  actualizarRol,
  obtenerRoles,
} from '../controllers/admin.controller.js';
import { actualizarEmpresa, obtenerEmpresa } from '../controllers/empresa.controller.js';
import { actualizarPerfil } from '../controllers/usuario.controller.js';
import { obtenerPerfil } from '../controllers/autenticacion.controller.js';
import {
  obtenerCategorias,
  crearCategoria,
  obtenerSubcategorias,
  crearSubcategoria,
} from '../controllers/categoria.controller.js';

const router = express.Router();

// Middleware de autenticación y autorización por rol
const admin = validarRol(['administrador']);
router.get('/usuarios', verificarToken, admin, obtenerUsuarios);

router.get('/empleados', verificarToken, admin, obtenerEmpleados);
router.get('/solo-usuarios', verificarToken, admin, obtenerSoloUsuarios);
router.get('/admins', verificarToken, admin, obtenerAdmins);
router.get('/usuarios/:id', verificarToken, admin, obtenerUsuarioPorId);
router.delete('/usuarios/:id', verificarToken, admin, eliminarUsuario);

// Rutas para productos
router.get('/productos', verificarToken, admin, obtenerProductos);
router.post('/productos', verificarToken, admin, crearProducto);

// Rutas para el perfil del usuario
router.put('/perfil', verificarToken, admin, actualizarPerfil);
router.get('/perfil', verificarToken, admin, obtenerPerfil);

// Rutas para categorías y subcategorías
router.get('/categorias', verificarToken, admin, obtenerCategorias);
router.post('/categorias', verificarToken, admin, crearCategoria);
router.get('/subcategorias', verificarToken, admin, obtenerSubcategorias);
router.post('/subcategorias', verificarToken, admin, crearSubcategoria);

// Rutas para roles
router.put('/usuarios/:id/rol', verificarToken, admin, actualizarRol);
router.get('/roles', verificarToken, admin, obtenerRoles);

// Rutas para la empresa
router.get('/empresa', verificarToken, admin, obtenerEmpresa);
router.put('/empresa', verificarToken, admin, actualizarEmpresa);   

export default router;