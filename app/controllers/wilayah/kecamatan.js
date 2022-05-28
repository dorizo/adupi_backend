import { QueryTypes } from "sequelize";
import db from "../../config/database.js";

export const getAllKecamatan = async (req, res, next) => {
  try {
    const kecamatan = await db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,5)=? AND CHAR_LENGTH(wilayahCode)=8 ORDER BY wilayah",
      {
        replacements: [req.params.wilayahCode],
        type: QueryTypes.SELECT,
      }
    );
    return res.status(200).json({
      status: 200,
      message: "Kecamatan ditemukan",
      data: kecamatan,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Kecamatan tidak ditemukan",
    });
  }
};
