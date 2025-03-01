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
  editarProducto,
} from '../controllers/admin.controller.js';
import { actualizarEmpresa, obtenerEmpresa } from '../controllers/empresa.controller.js';
import { actualizarPerfil } from '../controllers/usuario.controller.js';
import { obtenerPerfil } from '../controllers/autenticacion.controller.js';
import {
  crearCategoria,
  crearSubcategoria,
  obtenerSubcategorias,
  obtenerCategorias
} from '../controllers/categoria.controller.js';
import { 
  obtenerProductoPorId, 
  filtrarProductos, 
  buscarProductos
} from '../controllers/producto.controller.js';

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

// Rutas para productos
router.get('/productos', verificarToken, admin, obtenerProductos);  // Obtener todos los productos
router.get('/productos/:id', verificarToken, admin, obtenerProductoPorId);  // Obtener producto por ID
router.get('/filtrar', verificarToken, admin, filtrarProductos);  // Filtrar productos por categoría y subcategoría
router.post('/productos', verificarToken, admin, crearProducto);  // Crear nuevo producto
router.get('/buscar', verificarToken, admin, buscarProductos);

router.put('/productos/:id', verificarToken, admin, editarProducto); // Ruta para editar producto


// Rutas para el perfil del usuario
router.put('/perfil', verificarToken, admin, actualizarPerfil);
router.get('/perfil', verificarToken, admin, obtenerPerfil);

// Rutas para categorías y subcategorías
router.get('/categorias', verificarToken, admin, obtenerCategorias);  // Obtener todas las categorías
router.post('/categorias', verificarToken, admin, crearCategoria);  // Crear nueva categoría
router.get('/subcategorias', verificarToken, admin, obtenerSubcategorias);  // Obtener todas las subcategorías
router.post('/subcategorias', verificarToken, admin, crearSubcategoria);  // Crear nueva subcategoría

// Rutas para roles
router.put('/usuarios/:id/rol', verificarToken, admin, actualizarRol);  // Actualizar rol de usuario
router.get('/roles', verificarToken, admin, obtenerRoles);  // Obtener roles disponibles

// Rutas para la empresa
router.get('/empresa', verificarToken, admin, obtenerEmpresa);  // Obtener datos de la empresa
router.put('/empresa', verificarToken, admin, actualizarEmpresa);  // Actualizar datos de la empresa

export default router;
