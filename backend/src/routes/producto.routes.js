import express from 'express';
import { verificarToken, validarRol } from '../middleware/auth.js';
import multer from 'multer';
import { buscarProductos, allProductos, obtenerProductoPorId, 
    filtrarProductos,obtenerCategorias,obtenerSubcategorias,obtenerProductosPorSubcategoria, 
    obtenerDetalleProductoPorTalla, 
    resumenStock,
    notificaciones,
    subirImagenProducto
} from '../controllers/producto.controller.js';

const admin = validarRol(['administrador']);

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // 🖼 Almacenamiento temporal

router.post('/producto/imagen', verificarToken, admin, upload.single('imagen'), subirImagenProducto);

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
router.get('/notificaciones', notificaciones);
router.get('/resumen-stock', resumenStock);

// Ruta para obtener un producto por su ID
router.get('/:id', obtenerProductoPorId);


export default router;
