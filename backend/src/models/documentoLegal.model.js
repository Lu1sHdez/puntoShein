import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

const DocumentoLegal = sequelize.define('DocumentoLegal', {
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  contenido: {
    type: DataTypes.JSON,  
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  fecha_actualizacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  timestamps: false, 
});

export default DocumentoLegal;
