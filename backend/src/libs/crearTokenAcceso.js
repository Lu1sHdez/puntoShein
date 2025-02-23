//backend\src\libs\crearTokenAcceso.js
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config(); // Cargar variables de entorno

export const crearTokenAcceso = (usuario) => {
  return jwt.sign(
    { id: usuario.id, rol: usuario.rol }, // Payload del token
    process.env.TOKEN_SECRET, // Clave secreta
    { expiresIn: '1d' } // Expiración de 1 día
  );
};
  