import winston from 'winston';

// Configuración del logger
const logger = winston.createLogger({
  level: 'info',  // Nivel global de logs
  format: winston.format.combine(
    winston.format.prettyPrint()        // Formato JSON para los logs
  ),
  transports: [
    new winston.transports.Console({ // Imprime en consola
      format: winston.format.combine(
        winston.format.colorize(), // Agregar color a los logs
        winston.format.simple()    // Formato simple para consola
      ),
    }),
    new winston.transports.File({ // Registra todos los logs en combined.log
      filename: 'C:/Users/luishdez/Desktop/puntoshein/backend/src/logs/combined.log',
      format: winston.format.combine(
        winston.format.prettyPrint()        // Formato JSON
      ),
    }),
    new winston.transports.File({  // Registra solo errores en errors.log
      filename: 'C:/Users/luishdez/Desktop/puntoshein/backend/src/logs/errors.log',
      level: 'error',  // Solo los errores van a este archivo
      format: winston.format.combine(
        winston.format.prettyPrint()        // Formato JSON
      ),
    }),
  ],
});

export default logger;
