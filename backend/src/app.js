import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import autenticacionRutas from './routes/autenticacion.routes.js';
import productoRutas from './routes/producto.routes.js';
import usuarioRutas from './routes/usuario.routes.js';
import carritoRutas from "./routes/carrito.routes.js";
import adminRutas from './routes/admin.routes.js'; 
import empresaRutas from './routes/empresa.routes.js'; 
import empleadoRutas from './routes/empleado.routes.js'; 
import preguntaFrecuenteRutas from './routes/preguntaFrecuente.routes.js'; 


const app = express();

//Deshabilitar la divulgación de la tecnología (X-Powered-By)
app.disable('x-powered-by');

// Middleware para parsear JSON y cookies
app.use(express.json());
app.set('trust proxy', true);
app.use(cookieParser());

const corsOpcion ={
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}
app.use(cors(corsOpcion));


// uso de Helmet para configurar csp
app.use(helmet());

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"],  
    scriptSrc: ["'self'"],  
    styleSrc: ["'self'"],  
    imgSrc: ["'self'"],  
    connectSrc: ["'self'"], 
    frameAncestors: ["'none'"],  
  },
}));


// Uso de Helmet para proteger contra Clickjacking
app.use(helmet.frameguard({ action: 'deny' }));

// Rutas de la aplicación
app.use('/api/autenticacion', autenticacionRutas);
app.use('/api/productos', productoRutas);
app.use('/api/usuario', usuarioRutas);
app.use('/api/carrito', carritoRutas);
app.use('/api/empresa', empresaRutas);
app.use('/api/admin', adminRutas);
app.use('/api/empleado', empleadoRutas);
app.use('/api/preguntas', preguntaFrecuenteRutas)

// Middleware de manejo de errores para capturar errores no controlados
app.use((err, req, res, next) => {
  console.error(err.stack);  // Imprimir el error en la consola para depuración
  res.status(500).json({ mensaje: 'Error interno del servidor.', error: err.message });
});

export default app;



