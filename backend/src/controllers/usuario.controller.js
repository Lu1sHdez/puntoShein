import Usuario from '../models/usuario.model.js';
import jwt from 'jsonwebtoken';

export const actualizarPerfil = async (req, res) => {
    try {
      const { nombre_usuario, nombre, apellido_paterno, apellido_materno, telefono, correo } = req.body;
      const token = req.cookies.token;
  
      if (!token) {
        return res.status(401).json({ mensaje: 'No autorizado, token no encontrado.' });
      }
  
      // Verificar el token
      const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
  
      // Buscar al usuario en la base de datos
      const usuario = await Usuario.findByPk(decoded.id);
      if (!usuario) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
      }
  
      // Actualizar los campos
      usuario.nombre_usuario = nombre_usuario || usuario.nombre_usuario;
      usuario.nombre = nombre || usuario.nombre;
      usuario.apellido_paterno = apellido_paterno || usuario.apellido_paterno;
      usuario.apellido_materno = apellido_materno || usuario.apellido_materno;
      usuario.telefono = telefono || usuario.telefono;
      usuario.correo = correo || usuario.correo;
  
      await usuario.save();
  
      return res.status(200).json({ mensaje: 'Perfil actualizado exitosamente.', usuario });
  
    } catch (error) {
      console.error(error);
      return res.status(500).json({ mensaje: 'Error interno del servidor.', error: error.message });
    }
};
  