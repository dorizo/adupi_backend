import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes, literal } = Sequelize;
export const role = db.define(
  "role",
  {
    roleCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createAt: {
      type: "DATETIME",
    },
    updateAt: {
      type: "DATETIME",
    },
    deleteAt: {
      type: "DATETIME",
    },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);

export default role;
