import app from './app.js';
import { sequelize } from './database/database.js';

async function main() {
  try {
    console.log("Conectando a la base de datos...");
    await sequelize.authenticate();
    console.log("Conexión establecida con Neon PostgreSQL");

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Servidor corriendo en el puerto ${port}`);
    });
  } catch (error) {
    console.error("Error al conectar con la base de datos:", error);
  }
}

main();
