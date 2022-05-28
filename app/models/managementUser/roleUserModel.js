import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes, literal } = Sequelize;

export const roleUser = db.define(
  "role_user",
  {
    ruCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roleCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userCode: {
      type: DataTypes.INTEGER,
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

export default roleUser;
