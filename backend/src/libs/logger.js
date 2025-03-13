// src/libs/logger.js
import winston from 'winston';

// Configuración del logger
const logger = winston.createLogger({
  level: 'info', 
  format: winston.format.combine(
    winston.format.prettyPrint()  // Formato de los logs
  ),
  transports: [
    new winston.transports.Console({ 
      format: winston.format.combine(
        winston.format.colorize(),  // Coloriza el nivel del log
        winston.format.simple()     // Formato simple en consola
      ),
    }),
    new winston.transports.File({ 
      filename: 'src/logs/combined.log',
      format: winston.format.combine(
        winston.format.prettyPrint()  // Formato JSON para los logs
      ),
    }),
    new winston.transports.File({  
      filename: 'src/logs/errors.log',
      level: 'error',  // Registra solo los errores en este archivo
      format: winston.format.combine(
        winston.format.prettyPrint()  // Formato JSON para los logs de errores
      ),
    }),
  ],
});

export default logger;
