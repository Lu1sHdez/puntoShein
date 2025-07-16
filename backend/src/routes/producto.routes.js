import express from 'express';
import { verificarToken, validarRol } from '../middleware/auth.js';
import multer from 'multer';
import { 
    buscarProductos, allProductos, obtenerProductoPorId, 
    filtrarProductos, obtenerProductosPorSubcategoria, obtenerDetalleProductoPorTalla, 
    resumenStock, notificaciones, subirImagenProducto, 
    obtenerProductos, eliminarProducto, crearProducto, editarProducto, 
} from '../controllers/producto.controller.js';

import {obtenerCategorias, obtenerSubcategoriasPorCategoria,  crearCategoria,
    crearSubcategoria,eliminarCategoria, eliminarSubcategoria, editarCategoria, editarSubcategoria} from '../controllers/categoria.controller.js'

const admin = validarRol(['administrador']);
const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // 🖼 Almacenamiento temporal

// Subir imagen para productos
router.post('/producto/imagen', verificarToken, admin, upload.single('imagen'), subirImagenProducto);

// Rutas CRUD para categorías
router.get('/categorias', obtenerCategorias);
router.post('/categorias', verificarToken, admin, crearCategoria);
router.put('/categorias/:id', verificarToken, admin, editarCategoria);
router.delete('/categorias/:id', verificarToken, admin, eliminarCategoria);

// Rutas CRUD para subcategorías
router.get('/subcategorias', obtenerSubcategoriasPorCategoria);
router.post('/subcategorias', verificarToken, admin, crearSubcategoria);
router.put('/subcategorias/:id', verificarToken, admin, editarSubcategoria);
router.delete('/subcategorias/:id', verificarToken, admin, eliminarSubcategoria);


router.delete('/eliminar/:id', eliminarProducto);
router.get('/productosPorSubcategoria', obtenerProductosPorSubcategoria);
router.get('/detallePorTalla', obtenerDetalleProductoPorTalla);

// Rutas para productos
router.get('/filtrar', filtrarProductos);
router.get('/buscar', buscarProductos);
router.get('/allProductos', allProductos);
router.get('/notificaciones', notificaciones);
router.get('/resumen-stock', resumenStock);
router.get('/obtener', obtenerProductos);  // Obtener todos los productos
router.get('/productos/:id', obtenerProductoPorId);  // Obtener producto por ID
router.post('/crear',verificarToken, admin, crearProducto);  // Crear nuevo producto (solo para prueba)
router.put('/productos/:id', editarProducto); // Editar producto
router.delete('/eliminar/:id', eliminarProducto); // Eliminar producto

export default router;
