import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes, literal } = Sequelize;
export const mitra = db.define(
  "mitra",
  {
    mitraCode: {
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
    jenisMitra: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tempatLahir: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tanggalLahir: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    alamat: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fasilitatorCode: {
      type: DataTypes.INTEGER,
      allowNull: true,
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

export default mitra;
