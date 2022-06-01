import { check } from "express-validator";
import { model } from "../../../../models/index.js";
import db from "../../../../config/database.js";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize";
const op = Sequelize.Op;

export const editAnggotaValidation = [
  check("nama", "Nama tidak boleh kosong").notEmpty().trim().escape(),
  check("nik", "NIK tidak boleh kosong").notEmpty().trim().escape(),
  check("nik", "NIK harus 16 karakter")
    .isLength({ min: 16, max: 16 })
    .trim()
    .escape(),
  check("nik", "NIK harus berisi angka").isDecimal().trim().escape(),
  check("nik").custom(async (value, {req}) => {
    const anggota = await model.adupi.anggota.findOne({
        where: {
          anggotaCode: req.params.anggotaCode,
          deleteAt: null,
        },
      });
  
      if (!anggota) {
        return Promise.reject("Data anggota tidak ditemukan");
      }
     await model.adupi.anggota
      .findOne({
        where: {
          [op.and]: [
            { nik: value },
            {
              nik: {
                [op.ne]: anggota.nik,
              },
            },
            {
              deleteAt: null,
            },
          ],
        },
      })
      .then((nik) => {
        if (nik) {
          return Promise.reject("NIK sudah digunakan");
        }
      });
  }),
  check("noHp", "No HP tidak boleh kosong").notEmpty().trim().escape(),
  check("noHp", "No HP harus berisi angka").isDecimal().trim().escape(),
  check("noHp").custom(async (value, {req}) => {
    const anggota = await model.adupi.anggota.findOne({
        where: {
          anggotaCode: req.params.anggotaCode,
          deleteAt: null,
        },
      });
  
      if (!anggota) {
        return Promise.reject("Data anggota tidak ditemukan");
      }
    await model.adupi.anggota
      .findOne({ where: {
        [op.and]: [
          { noHp: value },
          {
            noHp: {
              [op.ne]: anggota.noHp,
            },
          },
          {
            deleteAt: null,
          },
        ],
      }, })
      .then((noHp) => {
        if (noHp) {
          return Promise.reject("No HP sudah digunakan");
        }
      });
  }),
  check("jenisKelamin", "Jenis kelamin tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check("jenisKelamin", "Jenis kelamin harus berisi laki-laki atau perempuan")
    .isIn(["L", "P"])
    .trim()
    .escape(),
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
  check("ktp", "KTP tidak boleh kosong").notEmpty(),
  check("alamat", "Alamat tidak boleh kosong").notEmpty(),
];
