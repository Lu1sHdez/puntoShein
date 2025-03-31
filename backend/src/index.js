import 'dotenv/config';

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
    process.exit(1); // Salir con código de error
  }
}

main();