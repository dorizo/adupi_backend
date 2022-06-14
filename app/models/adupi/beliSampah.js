import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes, literal } = Sequelize;
export const beliSampah = db.define(
  "beli_sampah",
  {
    bsCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    anggotaCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
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

export default beliSampah;
