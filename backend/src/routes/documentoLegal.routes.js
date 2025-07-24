import express from 'express';
import { verificarToken, validarRol } from '../middleware/auth.js';

import {
  obtenerDocumentoPorTipo,
  obtenerTodosDocumentos,
  actualizarDocumento,  // Nueva función para actualizar documentos
} from '../controllers/documentoLegal.controller.js';

const router = express.Router();

// Middleware de autenticación y autorización por rol
const admin = validarRol(['administrador']);

// Actualizar documento legal
router.put('/documentos/:tipo', verificarToken, admin, actualizarDocumento);

// Obtener un documento legal por tipo
router.get('/documentos/:tipo', obtenerDocumentoPorTipo);

// Obtener todos los documentos
router.get('/documentos', verificarToken, admin, obtenerTodosDocumentos);

export default router;
