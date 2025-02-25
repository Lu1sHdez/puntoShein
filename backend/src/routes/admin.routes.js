// src/routes/admin.routes.js
import { obtenerCategorias, crearCategoria, obtenerSubcategorias, crearSubcategoria } from '../controllers/categoria.controller.js';

import express from 'express';
import { obtenerUsuarios, 
    obtenerEmpleados, 
    obtenerSoloUsuarios, 
    obtenerAdmins, eliminarUsuario, 
    obtenerProductos,
    obtenerUsuarioPorId, crearProducto, actualizarRol, obtenerRoles
 } from '../controllers/admin.controller.js';

 import { actualizarEmpresa, obtenerEmpresa } from '../controllers/empresa.controller.js';
 import { actualizarPerfil } from '../controllers/usuario.controller.js';
 import { obtenerPerfil } from '../controllers/autenticacion.controller.js';
 import { verificarToken } from '../middleware/auth.js';

const router = express.Router();

// Rutas para obtener usuarios con filtros
router.get('/usuarios', obtenerUsuarios);  // Ruta para obtener todos los usuarios (con filtro de rol si se pasa)
router.get('/empleados', obtenerEmpleados);  // Ruta para obtener empleados
router.get('/solo-usuarios', obtenerSoloUsuarios);  // Ruta para obtener solo usuarios
router.get('/admins', obtenerAdmins);  // Ruta para obtener administradores
router.get('/usuarios/:id', obtenerUsuarioPorId);  // Nueva ruta para obtener detalles de un usuario
router.delete('/usuarios/:id', eliminarUsuario);  // Ruta para eliminar un usuario
router.get('/productos', obtenerProductos);  // Ruta para obtener productos

router.put('/perfil', verificarToken, actualizarPerfil);
router.get('/perfil', verificarToken, obtenerPerfil);

// Rutas para categorías
router.get('/categorias', obtenerCategorias);  // Obtener todas las categorías
router.post('/categorias', crearCategoria);   // Crear una nueva categoría
// Rutas para subcategorías
router.get('/subcategorias', obtenerSubcategorias);  // Obtener todas las subcategorías
router.post('/subcategorias', crearSubcategoria);   // Crear una nueva subcategoría
// Ruta para crear un producto
router.post('/productos', crearProducto);   // Crear un producto

// Ruta para actualizar el rol de un usuario
router.put('/usuarios/:id/rol', actualizarRol);  // Cambiar el rol de un usuario
router.get('/roles/', obtenerRoles);  // Opción para obtener el rol (aunque normalmente no es necesario este GET para este caso)

//empresa
router.get('/empresa', obtenerEmpresa); 
router.put('/empresa', actualizarEmpresa);

export default router;
