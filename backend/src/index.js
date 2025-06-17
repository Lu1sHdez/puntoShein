import 'dotenv/config';
import registrarEventoCritico from './utils/eventoCriticos.js';

import app from './app.js';
import { sequelize } from './database/database.js';

async function main() {
  try {
    // Configuración del puerto
    const PORT = process.env.PORT || 4000;
    
    // Verificar conexión a la base de datos
    await sequelize.authenticate();
    
    // Sincronizar modelos con la base de datos
    if (process.env.NODE_ENV !== 'production') {
      await sequelize.sync({ alter: true });
      console.log('Modelos sincronizados (modo desarrollo)');
    } else {
      await sequelize.sync();
      console.log('Modelos sincronizados (modo producción)');
    }
    
    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`Servidor escuchando en el puerto ${PORT}`);
      console.log(`URL Frontend: ${process.env.FRONTEND_URL}`);
    });
    
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
    registrarEventoCritico({
      mensaje: 'Fallo al iniciar el servidor o conectar a la base de datos',
      codigo_error: 'SERVER_START_FAIL',
      extra: {
        stack: error.stack,
        db: process.env.DB_NAME,
        ip_servidor: process.env.HOST || 'localhost',
      },
    });
    process.exit(1); // Salir con código de error
  }
}

main();