import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes, literal } = Sequelize;
export const jualSampah = db.define(
  "jual_sampah",
  {
    jsCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    mitraCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalBerat: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    totalHarga: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    pembeliCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nota: {
      type: DataTypes.STRING,
      allowNull: true,
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

export default jualSampah;
