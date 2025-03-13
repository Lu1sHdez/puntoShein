import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import autenticacionRutas from './routes/autenticacion.routes.js';
import productoRutas from './routes/producto.routes.js';
import usuarioRutas from './routes/usuario.routes.js';
import carritoRutas from "./routes/carrito.routes.js";
import adminRutas from './routes/admin.routes.js'; 
import empresaRutas from './routes/empresa.routes.js'; 
import empleadoRutas from './routes/empleado.routes.js'; 

const app = express();

// Middleware para parsear JSON y cookies
app.use(express.json());
app.set('trust proxy', true);
app.use(cookieParser());

// Configuración de CORS (Permitir solo solicitudes desde el frontend)
app.use(cors({
  origin: ['http://localhost:3000'],  // Asegúrate de que solo tu frontend tenga acceso
  credentials: true,  // Permitir el envío de cookies en solicitudes
}));

// Deshabilitar el encabezado X-Powered-By para no exponer información sobre el servidor
app.disable('x-powered-by');

// Configuración de Content-Security-Policy (CSP) para prevenir ataques XSS
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', 
    "default-src 'self'; " + 
    "script-src 'self' https://trusted-scripts.com; " + // Permitir scripts desde un origen confiable
    "style-src 'self' https://trusted-styles.com; " + // Permitir estilos desde un origen confiable
    "img-src 'self' https://trusted-images.com; " + // Permitir imágenes desde un origen confiable
    "font-src 'self'; " + // Permitir fuentes locales
    "connect-src 'self' https://api.trusted-api.com; " + // Permitir conexiones a APIs confiables
    "frame-ancestors 'none'; " + // Proteger contra clickjacking
    "base-uri 'self';"); // Evitar que se cambien las URLs base
  next();
});

// Agregar X-Content-Type-Options para evitar "sniffing" del tipo de contenido
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  next();
});

// Agregar X-Frame-Options para evitar ataques de Clickjacking
app.use((req, res, next) => {
  res.setHeader('X-Frame-Options', 'DENY');
  next();
});

// Agregar Strict-Transport-Security (HSTS) para forzar el uso de HTTPS
app.use((req, res, next) => {
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
  next();
});

// Agregar Referrer-Policy para no enviar información de referencia en los encabezados
app.use((req, res, next) => {
  res.setHeader('Referrer-Policy', 'no-referrer');
  next();
});

// Rutas de la aplicación
app.use('/api/autenticacion', autenticacionRutas);
app.use('/api/productos', productoRutas);
app.use('/api/usuario', usuarioRutas);
app.use('/api/carrito', carritoRutas);
app.use('/api/empresa', empresaRutas);
app.use('/api/admin', adminRutas);
app.use('/api/empleado', empleadoRutas);

// Middleware de manejo de errores para capturar errores no controlados
app.use((err, req, res, next) => {
  console.error(err.stack);  // Imprimir el error en la consola para depuración
  res.status(500).json({ mensaje: 'Error interno del servidor.', error: err.message });
});

export default app;
