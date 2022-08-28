import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes, literal } = Sequelize;
export const kunjunganimage = db.define(
  "kunjungan_image",
  {
    kunjungan_imageCode: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    kunjunganCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status_foto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
);

export default kunjunganimage;
