import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes, literal } = Sequelize;
export const detailJualSampah = db.define(
  "detail_jual_sampah",
  {
    djsCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    jsCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jenisCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    berat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    harga: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
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

export default detailJualSampah;
