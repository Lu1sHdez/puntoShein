import Usuario from '../models/usuario.model.js';
import bcrypt from 'bcryptjs';
import { crearTokenAcceso } from '../libs/crearTokenAcceso.js';


export const registro = async (req, res) => {
  try {
    console.log("📩 Datos recibidos:", req.body); // Depuración

    const { correo, password, nombre_usuario, nombre, apellido_materno, apellido_paterno, telefono, rol } = req.body;

    // Validación de datos obligatorios
    if (!correo || !password || !nombre_usuario || !nombre || !apellido_paterno || !telefono) {
      return res.status(400).json({ mensaje: "Todos los campos son obligatorios excepto el rol." });
    }

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ where: { correo } });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: "El correo ya está registrado." });
    }

    // Hashear la contraseña
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
      rol: rol || 'usuario',
    });

    res.status(201).json({
      mensaje: "Usuario registrado exitosamente.",
      usuario: {
        id: nuevoUsuario.id,
        nombre_usuario: nuevoUsuario.nombre_usuario,
        correo: nuevoUsuario.correo,
        rol: nuevoUsuario.rol,
        creado_en: nuevoUsuario.createdAt,
      }
    });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
};

export const login = async (req, res) => {
  try {
    console.log("Datos recibidos en login:", req.body); // Depuración

    const { correo, password } = req.body;

    // Validar que los datos no estén vacíos
    if (!correo || !password) {
      return res.status(400).json({ mensaje: "El correo y la contraseña son obligatorios." });
    }

    // Buscar al usuario en la base de datos
    const usuario = await Usuario.findOne({ where: { correo } });
    if (!usuario) {
      return res.status(400).json({ mensaje: "Correo o contraseña incorrectos." });
    }

    // Comparar la contraseña ingresada con la almacenada en la base de datos
    const contraseñaValida = await bcrypt.compare(password, usuario.password);
    if (!contraseñaValida) {
      return res.status(400).json({ mensaje: "Correo o contraseña incorrectos." });
    }

    // Generar token JWT
    const token = crearTokenAcceso(usuario);

    // Configurar cookie con el token
    res.cookie('token', token, {
      httpOnly: true, // Mayor seguridad
      secure: process.env.NODE_ENV === 'production', // Solo en producción
      sameSite: 'Strict', // Protección CSRF
    });

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso.",
      usuario: {
        id: usuario.id,
        nombre_usuario: usuario.nombre_usuario,
        correo: usuario.correo,
        rol: usuario.rol,
      },
      token, // Enviar el token en la respuesta
    });

  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ mensaje: "Error interno del servidor." });
  }
};

export const cerrarSesion = (req, res) => {
  res.cookie('token', '', {
    expires: new Date(0), // Expira inmediatamente
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
  });
  return res.json({ mensaje: "Sesión cerrada exitosamente." });
};
