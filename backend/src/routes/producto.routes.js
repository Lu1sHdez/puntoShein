import {validarRol, verificarToken  } from '../middleware/auth.js';
import express from 'express';
import { buscarProductos, allProductos, obtenerProductoPorId, 
    filtrarProductos,obtenerCategorias,obtenerSubcategorias,obtenerProductosPorSubcategoria, obtenerDetalleProductoPorTalla} from '../controllers/producto.controller.js';

const router = express.Router();
const admin = validarRol(['administrador']);

// Ruta para obtener todas las categorías
router.get('/categorias', obtenerCategorias);
// Ruta para obtener subcategorías de una categoría
router.get('/subcategorias', obtenerSubcategorias);
router.get('/productosPorSubcategoria', obtenerProductosPorSubcategoria)
router.get("/detallePorTalla", obtenerDetalleProductoPorTalla);

// Ruta para obtener productos por filtro
router.get('/filtrar', filtrarProductos);
// Ruta para buscar productos
router.get('/buscar', buscarProductos);
// Ruta para obtener todos los productos
router.get('/allProductos', allProductos);


// Ruta para obtener un producto por su ID
router.get('/:id', obtenerProductoPorId);

export default router;
