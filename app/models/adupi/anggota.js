import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes, literal } = Sequelize;
export const anggota = db.define(
  "anggota",
  {
    anggotaCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nik: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ktp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    noHp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    jenisKelamin: {
      type: DataTypes.STRING,
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
    mitraCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    long: {
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

export default anggota;
