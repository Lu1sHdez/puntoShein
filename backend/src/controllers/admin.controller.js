// src/controllers/admin.controller.js
import Sequelize from 'sequelize';
import Usuario from '../models/usuario.model.js';  // Asegúrate de tener el modelo de usuario correctamente importado
import Producto from '../models/producto.model.js';  // Modelo de productos

export const obtenerUsuarios = async (req, res) => {
  try {
    const { rol, search } = req.query;  // Obtener el rol y la búsqueda desde la query string
    const whereClause = {};

    if (rol) {
      whereClause.rol = rol;  // Filtrar por rol si se pasa
    }

    if (search) {
      // Filtrar por nombre o correo si se pasa el término de búsqueda
      whereClause[Sequelize.Op.or] = [
        { nombre: { [Sequelize.Op.like]: `%${search}%` } },
        { correo: { [Sequelize.Op.like]: `%${search}%` } }
      ];
    }

    const usuarios = await Usuario.findAll({
      where: whereClause  // Aplicar los filtros
    });
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ mensaje: 'Error al obtener los usuarios.' });
  }
};

// Obtener solo empleados
export const obtenerEmpleados = async (req, res) => {
  try {
    const empleados = await Usuario.findAll({
      where: { rol: 'empleado' }  // Filtramos por empleados
    });
    res.json(empleados);
  } catch (error) {
    console.error('Error al obtener los empleados:', error);
    res.status(500).json({ mensaje: 'Error al obtener los empleados.' });
  }
};

// Obtener solo usuarios (no empleados ni administradores)
export const obtenerSoloUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      where: { rol: 'usuario' }  // Filtramos solo los usuarios
    });
    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ mensaje: 'Error al obtener los usuarios.' });
  }
};

// Obtener solo administradores
export const obtenerAdmins = async (req, res) => {
  try {
    const admins = await Usuario.findAll({
      where: { rol: 'administrador' }  // Filtramos solo los administradores
    });
    res.json(admins);
  } catch (error) {
    console.error('Error al obtener los administradores:', error);
    res.status(500).json({ mensaje: 'Error al obtener los administradores.' });
  }
};

// Eliminar un usuario
export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    await Usuario.destroy({
      where: { id }
    });
    res.status(200).json({ mensaje: 'Usuario eliminado correctamente.' });
  } catch (error) {
    console.error('Error al eliminar el usuario:', error);
    res.status(500).json({ mensaje: 'Error al eliminar el usuario.' });
  }
};
// Obtener detalles de un usuario por su ID
export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;  // Obtener el ID del usuario desde los parámetros de la URL
    const usuario = await Usuario.findByPk(id);  // Buscar el usuario por su ID

    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    res.json(usuario);  // Devolver los detalles del usuario
  } catch (error) {
    console.error('Error al obtener los detalles del usuario:', error);
    res.status(500).json({ mensaje: 'Error al obtener los detalles del usuario.' });
  }
};

// Obtener todos los productos
export const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.findAll();  // Asumiendo que usas Sequelize para el modelo de productos
    res.json(productos);
  } catch (error) {
    console.error('Error al obtener los productos:', error);
    res.status(500).json({ mensaje: 'Error al obtener los productos.' });
  }
};
