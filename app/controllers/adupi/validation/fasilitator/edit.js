import { check } from "express-validator";
import { model } from "../../../../models/index.js";
import db from "../../../../config/database.js";
import { QueryTypes, Sequelize } from "sequelize";
const op = Sequelize.Op;

export const editFasilitatorValidation = [
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
    if (!desa) {
      return Promise.reject("Wilayah tidak ditemukan");
    }
  }),
  check("alamat", "Alamat tidak boleh kosong").notEmpty().trim().escape(),
  check("userCode", "Akun tidak boleh kosong").notEmpty().trim().escape(),
  check("userCode").custom(async (value, { req }) => {
    const fasilitator = await model.adupi.fasilitator.findOne({
      where: {
        fasilitatorCode: req.params.fasilitatorCode,
        deleteAt: null,
      },
    });

    if (!fasilitator) {
      return Promise.reject("Data fasilitator tidak ditemukan");
    }

    if (fasilitator.userCode != req.body.userCode) {
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
      await model.adupi.fasilitator
        .findOne({
          where: {
            [op.and]: [
              { userCode: value },
              {
                userCode: {
                  [op.ne]: fasilitator.userCode,
                },
              },
              {
                deleteAt: null,
              },
            ],
          },
        })
        .then((fasilitator) => {
          if (fasilitator) {
            return Promise.reject("Akun sudah digunakan sebagai fasilitator");
          }
        });
    }
  }),
];
