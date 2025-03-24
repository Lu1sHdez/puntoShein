import express from 'express';
import { verificarToken, validarRol } from '../middleware/auth.js';
import { obtenerVentasSemanales, predecirVentasFuturas, predecirSemanasPorMeta, obtenerProductosVendidos} from '../controllers/ventas.controller.js';

const router = express.Router();

const admin = validarRol(['administrador']);

router.get('/ventaSemanal/:producto_id', verificarToken, admin, obtenerVentasSemanales);
router.get('/predecir/:producto_id', verificarToken, admin, predecirVentasFuturas);
// ✅ Predicción de semanas para vender una cantidad específica (meta=X)
router.get('/predecirMeta/:producto_id', verificarToken, admin, predecirSemanasPorMeta)
router.get('/productosVendidos', verificarToken, admin, obtenerProductosVendidos)


export default router;      
