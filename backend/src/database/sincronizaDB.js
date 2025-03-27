import { sequelize } from './database.js'; // Asegúrate de importar la instancia de sequelize correctamente
import dotenv from 'dotenv';

dotenv.config(); // Cargar las variables de entorno, si no lo has hecho antes

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Base de datos sincronizada correctamente.');
  })
  .catch((error) => {
    console.error('Error al sincronizar la base de datos:', error);
});
