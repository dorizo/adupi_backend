import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes, literal } = Sequelize;
export const fasilitator = db.define(
  "fasilitator",
  {
    fasilitatorCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    wilayahCode: {
      type: DataTypes.STRING,
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

export default fasilitator;
