import { QueryTypes } from "sequelize";
import db from "../../config/database.js";

export const getAllDesa = async (req, res, next) => {
  try {
    const desa = await db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,8)=? AND CHAR_LENGTH(wilayahCode)=13 ORDER BY wilayah",
      {
        replacements: [req.params.wilayahCode],
        type: QueryTypes.SELECT,
      }
    );
    return res.status(200).json({
      status: 200,
      message: "Desa ditemukan",
      data: desa,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Desa tidak ditemukan",
    });
  }
};
