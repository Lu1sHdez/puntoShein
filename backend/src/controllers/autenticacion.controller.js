import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcryptjs';
import { crearTokenAcceso } from '../libs/crearTokenAcceso.js';
import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import logger from '../libs/logger.js'; 

export const registro = async (req, res) => {
  try {
    const { correo, password, nombre_usuario, nombre, apellido_materno, apellido_paterno, telefono, rol } = req.body;

    // Validación de campos vacíos
    if (!correo || !password || !nombre_usuario || !nombre || !apellido_paterno || !telefono) {
      const errorMessage = {
        message: "Todos los campos son obligatorios.",
        level: "warn",
        codigo_error: "400",
        ip_cliente: req.ip,
        fecha_hora: new Date().toISOString(),
      };
      logger.warn(errorMessage);  // Registra el error
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios." });
    }

    // Validación de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(correo)) {
      const errorMessage = {
        message: "El correo no tiene un formato válido.",
        level: "warn",
        codigo_error: "400",
        ip_cliente: req.ip,
        fecha_hora: new Date().toISOString(),
      };
      logger.warn(errorMessage);  // Registra el error
      return res.status(400).json({ mensaje: "El correo no tiene un formato válido." });
    }

    // Validación de teléfono (solo números y 10 dígitos)
    const telefonoRegex = /^\d{10}$/;
    if (!telefonoRegex.test(telefono)) {
      const errorMessage = {
        message: "El teléfono debe tener 10 dígitos.",
        level: "warn",
        codigo_error: "400",
        ip_cliente: req.ip,
        fecha_hora: new Date().toISOString(),
      };
      logger.warn(errorMessage);  // Registra el error
      return res.status(400).json({ mensaje: "El teléfono debe tener 10 dígitos." });
    }

    // Validación de nombre de usuario (alfanumérico, entre 5 y 20 caracteres)
    const usernameRegex = /^[A-Za-z\d]{5,20}$/;
    if (!usernameRegex.test(nombre_usuario)) {
      const errorMessage = {
        message: "El usuario debe tener 5-20 letras o números",
        level: "warn",
        codigo_error: "400",
        ip_cliente: req.ip,
        fecha_hora: new Date().toISOString(),
      };
      logger.warn(errorMessage);  // Registra el error
      return res.status(400).json({ mensaje: "El usuario debe tener 5-20 letras o números" });
    }

    // Verificar si el correo ya está registrado
    const correoExistente = await Usuario.findOne({ where: { correo } });
    if (correoExistente) {
      const errorMessage = {
        message: "Correo ya registrado",
        level: "warn",
        codigo_error: "400",
        ip_cliente: req.ip,
        fecha_hora: new Date().toISOString(),
        usuario: correo,
      };
      logger.warn(errorMessage);  // Registra el error
      return res.status(400).json({ mensaje: "Correo ya registrado" });
    }

    // Verificar si el teléfono ya está registrado
    const telefonoExistente = await Usuario.findOne({ where: { telefono } });
    if (telefonoExistente) {
      const errorMessage = {
        message: "Teléfono ya registrado",
        level: "warn",
        codigo_error: "400",
        ip_cliente: req.ip,
        fecha_hora: new Date().toISOString(),
        telefono,
      };
      logger.warn(errorMessage);  // Registra el error
      return res.status(400).json({ mensaje: "Teléfono ya registrado" });
    }

    // Verificar si el nombre de usuario ya está registrado
    const usuarioExistente = await Usuario.findOne({ where: { nombre_usuario } });
    if (usuarioExistente) {
      const errorMessage = {
        message: "Intenta con otro nombre de usuario",
        level: "warn",
        codigo_error: "400",
        ip_cliente: req.ip,
        fecha_hora: new Date().toISOString(),
        usuario: nombre_usuario,
      };
      logger.warn(errorMessage);  // Registra el error
      return res.status(400).json({ mensaje: "Intenta con otro nombre de usuario" });
    }

    // Hashear la contraseña con bcrypt
    const contraseñaHasheada = await bcrypt.hash(password, 10);

    // Crear usuario
    const nuevoUsuario = await Usuario.create({
      nombre_usuario,
      nombre,
      apellido_paterno,
      apellido_materno,
      correo,
      telefono,
      password: contraseñaHasheada,
      rol: rol || 'usuario',  // Asignar rol por defecto si no se especifica
    });

    return res.status(201).json({
      mensaje: "Usuario registrado exitosamente.",
      usuario: {
        id: nuevoUsuario.id,
        nombre_usuario: nuevoUsuario.nombre_usuario,
        correo: nuevoUsuario.correo,
        rol: nuevoUsuario.rol,
      },
    });

  } catch (error) {
    // Crear un mensaje estructurado para el log en caso de error
    const errorMessage = {
      message: error.message,
      level: 'error',
      codigo_error: error.code || 'No especificado',
      stack: error.stack,
      ip_cliente: req.ip,
      fecha_hora: new Date().toISOString(),
    };

    // Registrar el error en el log
    logger.error(errorMessage);
    return res.status(500).json({ mensaje: "Error interno del servidor." });
  }
};

export const login = async (req, res) => {
  try {
    const { correo, password } = req.body;

    // Validar que los campos no estén vacíos
    if (!correo || !password) {
      const errorMessage = {
        message: "El correo y la contraseña son obligatorios.",
        level: "warn",
        codigo_error: "400",
        ip_cliente: req.ip,
        fecha_hora: new Date().toISOString(),
      };
      logger.warn(errorMessage);
      return res.status(400).json({ mensaje: errorMessage.message });
    }

    // Buscar al usuario en la base de datos
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      const errorMessage = {
        message: "Credenciales inválidas - Usuario no encontrado",
        level: "error",
        codigo_error: "400",
        ip_cliente: req.ip,
        fecha_hora: new Date().toISOString(),
        usuario: correo,
      };
      logger.error(errorMessage);
      return res.status(400).json({ mensaje: "Credenciales invalidas" });
    }

    // Comparar la contraseña
    const contraseñaValida = await bcrypt.compare(password, usuario.password);
    if (!contraseñaValida) {
      const errorMessage = {
        message: "Credenciales inválidas - Contraseña incorrecta",
        level: "error",
        codigo_error: "400",
        ip_cliente: req.ip,
        fecha_hora: new Date().toISOString(),
        usuario: correo,
      };
      logger.error(errorMessage);
      return res.status(400).json({ mensaje: "Credenciales invalidas" });
    }

    // Generar token JWT
    const token = crearTokenAcceso(usuario);

    // Configurar cookie con el token
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Strict',
      maxAge: 24 * 60 * 60 * 1000,
    });

    // Respuesta exitosa
    return res.status(200).json({
      mensaje: "Inicio de sesión exitoso.",
      usuario: {
        id: usuario.id,
        nombre_usuario: usuario.nombre_usuario,
        correo: usuario.correo,
        rol: usuario.rol,
      },
      token,
    });

  } catch (error) {
    const errorMessage = {
      message: error.message,
      level: 'error',
      codigo_error: error.code || 'No especificado',
      stack: error.stack,
      ip_cliente: req.ip,
      fecha_hora: new Date().toISOString(),
    };
    logger.error(errorMessage);
    return res.status(500).json({ mensaje: "Error interno del servidor." });
  }
};

export const cerrarSesion = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0), // Expira inmediatamente
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
  });
  return res.json({ mensaje: "Sesión cerrada exitosamente." });
};

//  Función para recuperar contraseña
export const recuperarPassword = async (req, res) => {
  try {
    const { correo } = req.body;

    // Verificar si el correo existe en la base de datos
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(400).json({ mensaje: "Correo no registrado." });
    }

    // Generar un token único para la recuperación de contraseña
    const tokenRecuperacion = crearTokenAcceso(usuario);

    // Guardar el token en la base de datos
    usuario.tokenRecuperacion = tokenRecuperacion;
    await usuario.save();

    // Configurar el transporte de correo electrónico
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Crear el mensaje de correo electrónico
    const mailOptions = {
      from: `"Punto Shein" <${process.env.EMAIL_USER}>`,
      to: correo,
      subject: 'Recuperación de contraseña',
      html: `
        <p>Hola ${usuario.nombre},</p>
        <p>Hemos recibido una solicitud para restablecer tu contraseña.</p>
        <p>Haz clic en el siguiente enlace para continuar:</p>
        <p><a href="http://localhost:3000/restablecerPassword?token=${tokenRecuperacion}">Restablecer Contraseña</a></p>
        <p>Si no solicitaste este cambio, ignora este mensaje.</p>
      `,
    };

    // Enviar el correo electrónico
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return res.status(500).json({ mensaje: "Error al enviar el correo." });
      }
      res.status(200).json({ mensaje: "Se han enviado instrucciones a tu correo." });
    });

  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
};

//  Función para restablecer contraseña
export const restablecerPassword = async (req, res) => {
  try {
    const { token, nuevaContrasena } = req.body;

    // Verificar si el token es válido y encontrar al usuario
    const usuario = await Usuario.findOne({ where: { tokenRecuperacion: token } });
    if (!usuario) {
      return res.status(400).json({ mensaje: "Token inválido o expirado." });
    }

    // Validar que la nueva contraseña cumpla con los requisitos
    if (!/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(nuevaContrasena)) {
      return res.status(400).json({
        mensaje: "La contraseña debe tener mínimo 8 caracteres, una mayúscula, una minúscula, un número y un carácter especial.",
      });
    }

    // Hashear la nueva contraseña
    const contraseñaHasheada = await bcrypt.hash(nuevaContrasena, 10);

    // Actualizar la contraseña y eliminar el token de recuperación
    usuario.password = contraseñaHasheada;
    usuario.tokenRecuperacion = null;
    await usuario.save();

    res.status(200).json({ mensaje: "Contraseña restablecida exitosamente." });

  } catch (error) {
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
};

export const obtenerPerfil = async (req, res) => {
  try {
    // Obtener el token de las cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ mensaje: 'No autorizado, token no encontrado.' });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);

    // Obtener los datos del usuario usando el ID del payload del token
    const usuario = await Usuario.findByPk(decoded.id);

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    }

    // Devolver los datos del usuario
    return res.status(200).json({
      id: usuario.id,
      nombre_usuario: usuario.nombre_usuario,
      correo: usuario.correo,
      rol: usuario.rol,
      nombre: usuario.nombre,
      apellido_paterno: usuario.apellido_paterno,
      apellido_materno: usuario.apellido_materno,
      telefono: usuario.telefono,
    });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ mensaje: 'Error interno del servidor.' , error: error.message });
  }
};