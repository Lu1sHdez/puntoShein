import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import opinionRoutes from './routes/opinion.routes.js';
import recomendacionRutas from './routes/recomendacion.routes.js';
import autenticacionRutas from './routes/autenticacion.routes.js';
import productoRutas from './routes/producto.routes.js';
import usuarioRutas from './routes/usuario.routes.js';
import carritoRutas from "./routes/carrito.routes.js";
import compraRutas from "./routes/compra.routes.js";
import tallaRutas from "./routes/talla.routes.js";
import adminRutas from './routes/admin.routes.js'; 
import empresaRutas from './routes/empresa.routes.js'; 
import filtroRutas from './routes/filtros.routes.js'; 
import empleadoRutas from './routes/empleado.routes.js'; 
import preguntaFrecuenteRutas from './routes/preguntaFrecuente.routes.js'; 
import ventaRutas from './routes/ventas.routes.js'; 
import loginPin from './routes/pin.routes.js';
import tokenRoutes from "./routes/token.routes.js";
import documentoLegalRoutes from "./routes/documentoLegal.routes.js";


const app = express();

//Deshabilitar la divulgación de la tecnología (X-Powered-By)
app.disable('x-powered-by');

// Middleware para parsear JSON y cookies
app.use(express.json());
app.set('trust proxy', true);
app.use(cookieParser());

const corsOpcion = {
  origin: process.env.FRONTEND_URL,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
};

app.use(cors(corsOpcion));

// uso de Helmet para configurar csp
app.use(helmet());

app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'", 'https://puntoshein-kdxn.onrender.com/'],
    scriptSrc: ["'self'", "'unsafe-inline'", 'https://cdn.jsdelivr.net'],
    styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
    imgSrc: ["'self'", 'data:', 'https://res.cloudinary.com'],
    connectSrc: ["'self'", 'https://puntoshein-kdxn.onrender.com/'],
    fontSrc: ["'self'", 'https://fonts.gstatic.com'],
  },
}));


// Uso de Helmet para proteger contra Clickjacking
app.use(helmet.frameguard({ action: 'deny' }));

// Rutas de la aplicación
app.use('/api/autenticacion', autenticacionRutas);
app.use('/api/productos', productoRutas);
app.use('/api/recomendacion', recomendacionRutas);
app.use('/api/tallas', tallaRutas);
app.use('/api/ventas', ventaRutas);
app.use('/api/filtro', filtroRutas);
app.use('/api/usuario', usuarioRutas);
app.use('/api/carrito', carritoRutas);
app.use('/api/compra', compraRutas);
app.use('/api/empresa', empresaRutas);
app.use('/api/admin', adminRutas);
app.use('/api/opinion', opinionRoutes);
app.use('/api/empleado', empleadoRutas);
app.use('/api/preguntas', preguntaFrecuenteRutas)
app.use('/api/pin', loginPin)
app.use("/api/token-dispositivo", tokenRoutes);
app.use("/api/documento", documentoLegalRoutes);



// Ruta raíz para verificar que la API está en línea
app.get('/', (req, res) => {
  res.send('API Punto Shein funcionando correctamente');
});

// Middleware de manejo de errores para capturar errores no controlados
app.use((err, req, res, next) => {
  console.error(err.stack);  // Imprimir el error en la consola para depuración
  res.status(500).json({ mensaje: 'Error interno del servidor.', error: err.message });
});

export default app;






