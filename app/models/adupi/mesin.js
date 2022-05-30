import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes, literal } = Sequelize;
export const mesin = db.define(
  "mesin",
  {
    mesinCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    usahaCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    mitraCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jenisMesin: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    statusKepemilikanMesin: {
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

export default mesin;
