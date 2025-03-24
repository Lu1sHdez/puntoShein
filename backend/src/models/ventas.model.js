import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import Producto from "./producto.model.js";
import Usuario from "./usuario.model.js"; // 👈 asegúrate de importar tu modelo


const Venta = sequelize.define("Venta", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  producto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "productos",
      key: "id",
    },
  },
  usuario_id: {
    type: DataTypes.UUID, // 👈 CAMBIA esto
    allowNull: false,
    references: {
      model: "usuarios",
      key: "id",
    },
  },
  
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  fecha_venta: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "ventas",
  timestamps: false,
});

Venta.belongsTo(Producto, { foreignKey: "producto_id", as: "producto" });
Venta.belongsTo(Usuario, { foreignKey: "usuario_id", as: "usuario" }); // 👈 relación


export default Venta;
