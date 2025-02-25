import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";

const PreguntaFrecuente = sequelize.define("PreguntaFrecuente", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  pregunta: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  respuesta: {
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
  tableName: "preguntas_frecuentes",
  timestamps: false,
});

export default PreguntaFrecuente;
