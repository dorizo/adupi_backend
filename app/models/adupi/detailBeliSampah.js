import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes, literal } = Sequelize;
export const detailBeliSampah = db.define(
  "detail_beli_sampah",
  {
    dbsCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    bsCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jsCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sumber: {
      type: DataTypes.STRING,
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

export default detailBeliSampah;
