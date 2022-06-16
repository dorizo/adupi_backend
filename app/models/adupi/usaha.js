import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes, literal } = Sequelize;
export const usaha = db.define(
  "usaha",
  {
    usahaCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    namaUsaha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    mitraCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noSuratIzinUsaha: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    luasGudang: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    statusKepemilikanGudang: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lamaOperasional: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    jumlahPekerja: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    wilayahCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lang: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lat: {
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

export default usaha;
