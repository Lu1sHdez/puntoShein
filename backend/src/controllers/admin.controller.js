// src/controllers/admin.controller.js
import Sequelize from 'sequelize';

import Usuario from '../models/usuario.model.js';  // Asegúrate de tener el modelo de usuario correctamente importado
import Producto from '../models/producto.model.js';  // Modelo de productos
import Subcategoria from '../models/subcategoria.model.js';

// Funcion para btener los usuarios
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
      where: whereClause  // Aplicar los filtros de manera segura
    });


    res.json(usuarios);
  } catch (error) {
    console.error('Error al obtener los usuarios:', error);
    res.status(500).json({ mensaje: 'Error al obtener los usuarios.' });
  }
};
// Funcion para obtener solo empleados
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

export const crearProducto = async (req, res) => {
  const { nombre, descripcion, precio, imagen, stock, subcategoria_id } = req.body;

  try {
    const subcategoria = await Subcategoria.findByPk(subcategoria_id);
    if (!subcategoria) {
      return res.status(404).json({ mensaje: 'Subcategoría no encontrada' });
    }

    const nuevoProducto = await Producto.create({
      nombre,
      descripcion,
      precio,
      imagen,
      stock,
      subcategoria_id,
    });

    res.status(201).json(nuevoProducto);
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({
      mensaje: 'Error al crear el producto',
      detalle: error.message,  // Detalle del error para ayudar a depurar
    });
  }
};
// src/controllers/admin.controller.js

// Función para editar un producto
export const editarProducto = async (req, res) => {
  const { id } = req.params; // Obtenemos el ID del producto desde los parámetros de la URL
  const { nombre, descripcion, precio, imagen, stock, subcategoria_id } = req.body; // Obtenemos los datos del producto desde el cuerpo de la solicitud

  try {
    // Buscamos el producto por ID
    const producto = await Producto.findByPk(id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }

    // Actualizamos los campos del producto
    producto.nombre = nombre || producto.nombre;
    producto.descripcion = descripcion || producto.descripcion;
    producto.precio = precio || producto.precio;
    producto.imagen = imagen || producto.imagen;
    producto.stock = stock || producto.stock;
    producto.subcategoria_id = subcategoria_id || producto.subcategoria_id;

    // Guardamos los cambios
    await producto.save();

    res.status(200).json({ mensaje: 'Producto actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar el producto:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el producto' });
  }
};

// Obtener los roles disponibles
export const obtenerRoles = async (req, res) => {
  try {
    const roles = ['usuario', 'administrador', 'empleado']; // Lista de roles posibles
    res.json({ roles }); // Solo devolvemos los roles
  } catch (error) {
    console.error('Error al obtener los roles:', error);
    res.status(500).json({ mensaje: 'Error al obtener los roles.' });
  }
};

// Actualizar el rol de un usuario
export const actualizarRol = async (req, res) => {
  const { id } = req.params;  // Obtener el ID del usuario desde la URL
  const { rol } = req.body;   // Obtener el nuevo rol del cuerpo de la solicitud

  try {
    // Validamos que el rol sea uno de los valores permitidos
    const rolesValidos = ['usuario', 'administrador', 'empleado'];
    if (!rolesValidos.includes(rol)) {
      return res.status(400).json({ mensaje: 'Rol no válido' });
    }
    
    // Verificar si el usuario es el único administrador
    if (rol === 'usuario' || rol ==='empleado') {
      const totalAdmins = await Usuario.count({ where: { rol: 'administrador' } });
      
      if (totalAdmins === 1) {
        return res.status(400).json({ mensaje: 'No puedes cambiar el rol del único administrador. Asigna otro administrador primero.' });
      }
    }

    // Buscamos al usuario por ID
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }

    // Actualizamos el rol del usuario
    usuario.rol = rol;
    await usuario.save();

    res.status(200).json({ mensaje: 'Rol actualizado exitosamente' });
  } catch (error) {
    console.error('Error al actualizar el rol:', error);
    res.status(500).json({ mensaje: 'Error al actualizar el rol' });
  }
};

