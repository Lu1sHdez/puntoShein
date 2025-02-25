import express from 'express';
import { obtenerEmpresa } from '../controllers/empresa.controller.js';

const router = express.Router();

// Ruta para obtener los datos de la empresa
router.get('/empresa', obtenerEmpresa);

export default router;
