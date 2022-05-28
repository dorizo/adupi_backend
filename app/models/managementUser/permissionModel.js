import { Sequelize } from "sequelize";
import db from "../../config/database.js";
import { module } from "./moduleModel.js";

const { DataTypes, literal } = Sequelize;
export const permission = db.define(
  "permission",
  {
    permissionCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    permission: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    moduleCode: {
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



export default permission;
