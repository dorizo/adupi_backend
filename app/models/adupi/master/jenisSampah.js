import { Sequelize } from "sequelize";
import db from "../../../config/database.js"

const { DataTypes, literal } = Sequelize;
export const jenisSampah = db.define(
  "jenis_sampah",
  {
    jsCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    ksCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jenis: {
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

export default jenisSampah;