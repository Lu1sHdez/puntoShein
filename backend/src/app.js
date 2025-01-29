import express from 'express';
import cors from 'cors';
import autenticacionRutas from './routes/autenticacion.routes.js';

const app = express();

// Middleware para procesar JSON (¡debe ir antes de las rutas!)
app.use(express.json());

// Configuración de CORS
app.use(cors({
  origin: ['http://localhost:3000'],
  credentials: true,
}));

// Rutas de autenticación (registro)
app.use('/api/autenticacion', autenticacionRutas);

// Middleware de manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ mensaje: 'Error interno del servidor' });
});

export default app;
