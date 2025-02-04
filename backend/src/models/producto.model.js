import { DataTypes } from 'sequelize';
import { sequelize } from '../database/database.js';

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.TEXT,
  },
  precio: {
    type: DataTypes.DECIMAL(10,2),
    allowNull: false,
  },
  imagen: {
    type: DataTypes.STRING,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
  subcategoria_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'subcategorias',
      key: 'id',
    },
    onDelete: 'SET NULL',
  }
}, {
  tableName: 'productos',
  timestamps: false
});

export default Producto;
