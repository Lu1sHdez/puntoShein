import Categoria from '../models/categoria.model.js';
import Subcategoria from '../models/subcategoria.model.js';

// Obtener todas las categorías
export const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.findAll();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener categorías' });
  }
};
// Obtener todas las subcategorías
export const obtenerSubcategorias = async (req, res) => {
  try {
    const subcategorias = await Subcategoria.findAll();
    res.json(subcategorias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener subcategorías' });
  }
};
// Crear una nueva categoría
export const crearCategoria = async (req, res) => {
  const { nombre } = req.body;

  try {
    const nuevaCategoria = await Categoria.create({ nombre });
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la categoría' });
  }
};
// Crear una nueva subcategoría
export const crearSubcategoria = async (req, res) => {
  const { nombre, categoria_id } = req.body;

  try {
    const nuevaSubcategoria = await Subcategoria.create({ nombre, categoria_id });
    res.status(201).json(nuevaSubcategoria);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la subcategoría' });
  }
};
