import { Sequelize } from "sequelize";
import db from "../../config/database.js";
const { DataTypes, literal } = Sequelize;
export const kunjunganForm = db.define(
    "Kunjungan_form" , {
        Kunjungan_formCode: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Kunjungan_formCapaian:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        Kunjungan_formKeterlambatan:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        Kunjungan_formHargaPembelian:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        Kunjungan_formPekerja:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        Kunjungan_formJumlahMesin:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        Kunjungan_formPendampingan:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        mitraCode:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        createAt: {
          type: "DATETIME",
        },
    },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
);
export default kunjunganForm;
