import { QueryTypes } from "sequelize";
import db from "../../config/database.js";

export const getAllKabupaten = async (req, res, next) => {
  try {
    const kabupaten = await db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,2)=? AND CHAR_LENGTH(wilayahCode)=5 ORDER BY wilayah",
      {
        replacements: [req.params.wilayahCode],
        type: QueryTypes.SELECT,
      }
    );
    return res.status(200).json({
      status: 200,
      message: "Kabupaten ditemukan",
      data: kabupaten,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Kabupaten tidak ditemukan",
    });
  }
};
