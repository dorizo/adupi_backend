import { check } from "express-validator";
import { model } from "../../../../models/index.js";

export const addJualSampahValidation = [
  check("pembeliCode", "Pembeli tidak boleh kosong").notEmpty(),
  check("nota", "Nota tidak boleh kosong").notEmpty(),
  check("detail.*.berat", "Sumber tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check("detail.*.berat", "Berat harus berisi angka")
    .isDecimal()
    .trim()
    .escape(),

  check("detail.*.harga", "Sumber tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check("detail.*.harga", "Harga harus berisi angka")
    .isDecimal()
    .trim()
    .escape(),
  check("detail.*.jenisCode", "Jenis sampah tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check("detail.*.jenisCode").custom(async (value) => {
    return await model.adupi.master.jenisSampah
      .findOne({
        where: {
          jsCode: value,
          deleteAt: null,
        },
      })
      .then((js) => {
        if (!js) {
          return Promise.reject("Jenis sampah tidak ditemukan");
        }
      });
  }),
];
