import app from './app.js';
import { sequelize } from './database/database.js';

async function main() {
  try {
    await sequelize.authenticate(); // Se asegura de que la conexión a la base de datos sea exitosa.
    await sequelize.sync({ alter: true }); // Sincroniza la base de datos sin eliminar datos.
    app.listen(4000);
    console.log('Servidor escuchando en el puerto 4000');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }
}
main();
