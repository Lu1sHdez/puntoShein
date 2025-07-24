import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

const DocumentoLegal = sequelize.define('DocumentoLegal', {
  tipo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  // Para asegurarse de que no haya documentos duplicados por tipo
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
    type: DataTypes.JSONB,  // Usamos JSONB para almacenar contenido estructurado (títulos, subtítulos, viñetas, etc.)
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
  timestamps: false,  // Deshabilitar los timestamps automáticos si no los necesitas
});

export default DocumentoLegal;
