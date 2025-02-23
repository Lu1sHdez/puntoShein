  import express from 'express';
  import cors from 'cors';
  import autenticacionRutas from './routes/autenticacion.routes.js';
  import productoRutas from './routes/producto.routes.js';
  import usuarioRutas from './routes/usuario.routes.js';
  import carritoRutas from "./routes/carrito.routes.js";
  import adminRutas from './routes/admin.routes.js';  // Importa las rutas de admin

  import cookieParser from 'cookie-parser';

  const app = express();
  // Middleware para procesar JSON (¡debe ir antes de las rutas!)
  app.use(express.json());

  app.use(cookieParser());

  // Configuración de CORS
  app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
  }));

  // Rutas de autenticación (registro)
  app.use('/api/autenticacion', autenticacionRutas);
  // Ruta para buscar productos
  app.use('/api/productos', productoRutas);
  // Ruta para buscar productos
  app.use('/api/usuario', usuarioRutas);
  // Ruta para buscar carrito
  app.use('/api/carrito', carritoRutas);

  app.use('/api/admin', adminRutas);  
  // Middleware de manejo de errores
  app.use((err, req, res, next) => {
    console.error(err);  // Esto te dará más detalles sobre el error en la consola
    res.status(500).json({ mensaje: 'Error interno del servidor.', error: err.message });
  });

  export default app;
