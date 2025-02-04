import express from 'express';
import { buscarProductos, allProductos, obtenerProductoPorId } from '../controllers/producto.controller.js';

const router = express.Router();

// Ruta para buscar productos
router.get('/buscar', buscarProductos);
// Ruta para obtener todos los productos
router.get('/allProductos', allProductos);
// 📌 Ruta para obtener un producto por su ID
router.get('/:id', obtenerProductoPorId);

export default router;
