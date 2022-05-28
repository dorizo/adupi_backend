import { Sequelize } from "sequelize";
import db from "../../config/database.js";
const { DataTypes, literal } = Sequelize;

export const userPermission = db.define(
  "user_permission",
  {
    upCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    permissionCode: {
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


export default userPermission;
