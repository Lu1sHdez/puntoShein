// src/database/sincronizaDB.js
import { sequelize } from './database.js';
import dotenv from 'dotenv';

dotenv.config();

// Importar todos los modelos antes de sincronizar
import '../models/usuario.model.js';
import '../models/producto.model.js';
import '../models/subcategoria.model.js';
// Agrega aquí los demás modelos si tienes más

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada correctamente.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
  });
