//backend\src\models\preguntaSecreta.model.js
import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';
import Usuario from './usuario.model.js'; // Asegúrate de importar el modelo Usuario

const PreguntaSecreta = sequelize.define('PreguntaSecreta', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  pregunta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  respuesta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  usuario_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Usuario, // Relaciona con el modelo Usuario
      key: 'id', // Hace referencia al campo id de la tabla usuarios
    },
    onDelete: 'CASCADE', // Elimina las preguntas secretas cuando se elimine el usuario
  },
}, {
  tableName: 'preguntas_secretas',
  timestamps: true, // Agrega automáticamente los campos createdAt y updatedAt
});

PreguntaSecreta.belongsTo(Usuario, { foreignKey: 'usuario_id' }); // Relación de uno a muchos
Usuario.hasMany(PreguntaSecreta, { foreignKey: 'usuario_id' }); // Relación inversa

export default PreguntaSecreta;
