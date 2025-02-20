import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import Usuario from "./usuario.model.js";
import Producto from "./producto.model.js";

const Carrito = sequelize.define("Carrito", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  usuario_id: {
    type: DataTypes.UUID,
    references: {
      model: "usuarios",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  producto_id: {
    type: DataTypes.INTEGER,
    references: {
      model: "productos",
      key: "id",
    },
    onDelete: "CASCADE",
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
  fecha_agregado: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "carrito",
  timestamps: false,
});

// Definir relaciones
Carrito.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" });
Carrito.belongsTo(Producto, { foreignKey: "producto_id", as: "producto" });

export default Carrito;
