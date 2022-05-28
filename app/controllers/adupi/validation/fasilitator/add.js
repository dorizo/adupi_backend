import { check } from "express-validator";
import { model } from "../../../../models/index.js";
import db from "../../../../config/database.js";
import { QueryTypes } from "sequelize";


export const addFasilitatorValidation = [
  check("nama", "Nama tidak boleh kosong").notEmpty().trim().escape(),
  check("wilayahCode", "Wilayah tidak boleh kosong").notEmpty().trim().escape(),
  check("wilayahCode").custom(async (value) => {
    const desa = await db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,8)=? AND CHAR_LENGTH(wilayahCode)=13 ORDER BY wilayah",
      {
        replacements: [value],
        type: QueryTypes.SELECT,
      }
    );
    if(!desa){
        return Promise.reject("Wilayah tidak ditemukan");
    }
  }),
  check("alamat", "Alamat tidak boleh kosong").notEmpty().trim().escape(),
  check("userCode", "Akun tidak boleh kosong").notEmpty().trim().escape(),
  check("userCode").custom(async (value, { req }) => {
    await model.managementUser.user
      .findOne({
        where: {
          userCode: req.body.userCode,
          deleteAt: null,
        },
      })
      .then((user) => {
        if (!user) {
          return Promise.reject("Akun tidak ditemukan");
        }
      });
    await model.adupi.fasilitator
      .findOne({
        where: {
          userCode: req.body.userCode,
          deleteAt: null,
        },
      })
      .then((fasilitator) => {
        if (fasilitator) {
          return Promise.reject("Akun sudah digunakan sebagai fasilitator");
        }
      });
    await model.adupi.mitra
      .findOne({
        where: {
          userCode: req.body.userCode,
          deleteAt: null,
        },
      })
      .then((mitra) => {
        if (mitra) {
          return Promise.reject("Akun sudah digunakan sebagai mitra");
        }
      });
  }),
];
