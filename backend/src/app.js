// src/app.js
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// Importar rutas
import opinionRoutes from "./routes/opinion.routes.js";
import recomendacionRutas from "./routes/recomendacion.routes.js";
import prediccionRutas from "./routes/prediccion.routes.js";
import autenticacionRutas from "./routes/autenticacion.routes.js";
import productoRutas from "./routes/producto.routes.js";
import usuarioRutas from "./routes/usuario.routes.js";
import carritoRutas from "./routes/carrito.routes.js";
import compraRutas from "./routes/compra.routes.js";
import tallaRutas from "./routes/talla.routes.js";
import adminRutas from "./routes/admin.routes.js";
import empresaRutas from "./routes/empresa.routes.js";
import filtroRutas from "./routes/filtros.routes.js";
import empleadoRutas from "./routes/empleado.routes.js";
import preguntaFrecuenteRutas from "./routes/preguntaFrecuente.routes.js";
import ventaRutas from "./routes/ventas.routes.js";
import loginPin from "./routes/pin.routes.js";
import tokenRoutes from "./routes/token.routes.js";
import documentoLegalRoutes from "./routes/documentoLegal.routes.js";

// Rutas app móvil
import authRoutes from "./routes/app/authApp.routes.js";
import clienteRoutes from "./routes/app/cliente.routes.js";
import pedidosRoutes from "./routes/app/pedidos.routes.js";
import perfilRoutes from "./routes/app/perfil.routes.js";

const app = express();

// Deshabilitar "X-Powered-By"
app.disable("x-powered-by");

// Middlewares básicos
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", true);

// ✅ Configuración de CORS
const allowedOrigins = [
  "http://localhost:3000",
  "https://punto-shein.vercel.app",
  "https://12ee902f0035.ngrok-free.app", // tu túnel actual
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Origen no permitido por CORS"));
    }
  },
  credentials: true, // permite cookies / tokens
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
};

app.use(cors(corsOptions));

// ✅ Rutas principales
app.use("/api/autenticacion", autenticacionRutas);
app.use("/api/productos", productoRutas);
app.use("/api/recomendacion", recomendacionRutas);
app.use("/api/prediccion", prediccionRutas);
app.use("/api/tallas", tallaRutas);
app.use("/api/ventas", ventaRutas);
app.use("/api/filtro", filtroRutas);
app.use("/api/usuario", usuarioRutas);
app.use("/api/carrito", carritoRutas);
app.use("/api/compra", compraRutas);
app.use("/api/empresa", empresaRutas);
app.use("/api/admin", adminRutas);
app.use("/api/opinion", opinionRoutes);
app.use("/api/empleado", empleadoRutas);
app.use("/api/preguntas", preguntaFrecuenteRutas);
app.use("/api/pin", loginPin);
app.use("/api/token-dispositivo", tokenRoutes);
app.use("/api/documento", documentoLegalRoutes);

// ✅ App móvil
app.use("/api/app/autenticacion", authRoutes);
app.use("/api/app/clientes", clienteRoutes);
app.use("/api/app/pedidos", pedidosRoutes);
app.use("/api/app/perfil", perfilRoutes);

// ✅ Ruta de prueba
app.get("/", (req, res) => {
  res.send("API Punto Shein funcionando correctamente (modo local)");
});

// ✅ Middleware de errores
app.use((err, req, res, next) => {
  console.error("Error:", err.stack);
  res
    .status(500)
    .json({ mensaje: "Error interno del servidor.", error: err.message });
});

export default app;
