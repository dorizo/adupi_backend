import { Sequelize } from "sequelize";
import db from "../../config/database.js";

const { DataTypes, literal } = Sequelize;
export const wilayah = db.define(
  "wilayah",
  {
    wilayahCode: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      wilayah: {
        type: DataTypes.STRING,
        allowNull: false,
      },
  },
  {
    freezeTableName: true,
    createdAt: false,
    updatedAt: false,
  }
)


export default wilayah;