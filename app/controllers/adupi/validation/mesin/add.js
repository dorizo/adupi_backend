import { check } from "express-validator";
import { model } from "../../../../models/index.js";

export const addMesinValidation = [
  check("usahaCode", "Kode gudang tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check("usahaCode").custom((value) => {
    return model.adupi.usaha
      .findOne({ where: { usahaCode: value, deleteAt: null } })
      .then((usaha) => {
        if (!usaha) {
          return Promise.reject("Kode gudang tidak ditemukan");
        }
      });
  }),
  check("jenisMesin", "Jenis mesin tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),

  check("statusKepemilikanMesin", "Status kepemilikan mesin tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check(
    "statusKepemilikanMesin",
    "Status kepemilikan mesin harus berisi 'Milik Sendiri','Program GESN', 'Sewa' atau 'Hak Pakai'"
  )
    .isIn(["Milik Sendiri", "Program GESN", "Hak Pakai","Sewa"])
    .trim()
    .escape(),
  check("kapasitas", "Kapasitas tidak boleh kosong").notEmpty().trim().escape(),
  check("kapasitas", "Kapasitas harus berisi angka")
    .isDecimal()
    .trim()
    .escape(),
  check("foto", "Foto mesin tidak boleh kosong").notEmpty(),
];
