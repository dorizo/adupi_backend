import { Sequelize } from "sequelize";
import db from "../../../config/database.js"

const { DataTypes, literal } = Sequelize;
export const kategoriSampah = db.define(
  "kategori_sampah",
  {
    ksCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    kategori: {
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

export default kategoriSampah;