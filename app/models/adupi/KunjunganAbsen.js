import { Sequelize } from "sequelize";
import db from "../../config/database.js";
const { DataTypes, literal } = Sequelize;
export const kunjunganAbsen = db.define(
    "kunjungan_absen" , {
        kunjungan_absenCode: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        kunjungan_absen_name:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        kunjungan_absen_date:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        kunjungan_absen_status:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        mitraCode:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    }
);
export default kunjunganAbsen;
