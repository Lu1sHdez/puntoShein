// middleware/auth.js
import jwt from 'jsonwebtoken';

export const verificarToken = (req, res, next) => {
    const token = req.cookies.token; // Asegúrate de que el token está en las cookies
    if (!token) {
      return res.status(401).json({ mensaje: "No autorizado, token no encontrado." });
    }
    try {
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
      req.userId = decoded.id; // Almacena el id del usuario
      req.userRol = decoded.rol; // Almacena el rol del usuario
      next(); // Llama al siguiente middleware
    } catch (error) {
      return res.status(401).json({ mensaje: "Token no válido." });
    }
  };
  