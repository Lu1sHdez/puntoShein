import Categoria from '../models/categoria.model.js';
import Subcategoria from '../models/subcategoria.model.js';

// Obtener todas las categorías
export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll({
      order: [['nombre', 'ASC']]
    });
    res.json(categorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener categorías' });
  }
};

// Obtener subcategorías por categoría
export const obtenerSubcategoriasPorCategoria = async (req, res) => {
  const { categoria_id } = req.query;
  
  if (!categoria_id) {
    return res.status(400).json({ mensaje: 'Se requiere categoria_id' });
  }

  try {
    const subcategorias = await Subcategoria.findAll({
      where: { categoria_id },
      order: [['nombre', 'ASC']]
    });
    res.json(subcategorias);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener subcategorías' });
  }
};

// Crear una nueva categoría
export const crearCategoria = async (req, res) => {
  const { nombre } = req.body;

  if (!nombre) {
    return res.status(400).json({ mensaje: 'El nombre es requerido' });
  }

  try {
    // Verificar si ya existe
    const existeCategoria = await Categoria.findOne({ where: { nombre } });
    if (existeCategoria) {
      return res.status(400).json({ mensaje: 'Esta categoría ya existe' });
    }

    const nuevaCategoria = await Categoria.create({ nombre });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
  }
};

// Crear una nueva subcategoría
export const crearSubcategoria = async (req, res) => {
  const { nombre, categoria_id } = req.body;

  if (!nombre || !categoria_id) {
    return res.status(400).json({ mensaje: 'Nombre y categoría son requeridos' });
  }

  try {
    // Verificar si la categoría existe
    const categoria = await Categoria.findByPk(categoria_id);
    if (!categoria) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    // Verificar si la subcategoría ya existe
    const existeSubcategoria = await Subcategoria.findOne({ 
      where: { nombre, categoria_id } 
    });
    if (existeSubcategoria) {
      return res.status(400).json({ mensaje: 'Esta subcategoría ya existe para esta categoría' });
    }

    const nuevaSubcategoria = await Subcategoria.create({ nombre, categoria_id });
    res.status(201).json(nuevaSubcategoria);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la subcategoría' });
  }
};