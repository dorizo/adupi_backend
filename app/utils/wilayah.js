import db from "../config/database.js";
import { QueryTypes } from "sequelize";

export const wilayah = (wilayahCode) => {
  try {
    const desa = db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,13)=? AND CHAR_LENGTH(wilayahCode)=13 ORDER BY wilayah LIMIT 1",
      {
        replacements: [wilayahCode],
        type: QueryTypes.SELECT,
      }
    );
    const kabupaten = db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,5)=? AND CHAR_LENGTH(wilayahCode)=5 LIMIT 1",
      {
        replacements: [wilayahCode.substr(0, 5)],
        type: QueryTypes.SELECT,
      }
    );
    const kecamatan = db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,8)=? AND CHAR_LENGTH(wilayahCode)=8 LIMIT 1",
      {
        replacements: [wilayahCode.substr(0, 8)],
        type: QueryTypes.SELECT,
      }
    );
    const provinsi = db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,2)=? AND CHAR_LENGTH(wilayahCode)=2 LIMIT 1",
      {
        replacements: [wilayahCode.substr(0, 2)],
        type: QueryTypes.SELECT,
      }
    );
    return {
      desa: desa,
      kecamatan: kecamatan,
      kabupaten: kabupaten,
      provinsi: provinsi,
    };
  } catch (e) {
    return res.status(404).json({
      status: 404,
      message: "Wilayah tidak ditemukan",
    });
  }
};
