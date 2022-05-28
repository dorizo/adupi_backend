import { QueryTypes } from "sequelize";
import db from "../../config/database.js";

export const getAllProvinsi = async (req, res, next) => {
  try {
    const provinsi = await db.query("SELECT wilayahCode,wilayah FROM wilayah WHERE CHAR_LENGTH(wilayahCode)=2 ORDER BY wilayah",{ type: QueryTypes.SELECT });
    return res.status(200).json({
      status: 200,
      message: "Provinsi ditemukan",
      data: provinsi,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Provinsi tidak ditemukan",
    });
  }
};
