import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

const DocumentoLegal = sequelize.define("DocumentoLegal", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  tipo: {
    type: DataTypes.STRING,
    allowNull: false, // Ejemplo: 'Política de Privacidad', 'Términos y Condiciones'
  },
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  empresa_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'empresa',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: "documentos_legales",
  timestamps: false,
});

export default DocumentoLegal;
