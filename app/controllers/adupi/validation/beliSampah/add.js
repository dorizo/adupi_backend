import { check } from "express-validator";
import { model } from "../../../../models/index.js";

export const addBeliSampahValidation = [
  check("anggotaCode", "Kode anggota tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check("anggotaCode").custom(async (value, { req }) => {
    return await model.adupi.anggota
      .findOne({
        where: {
          anggotaCode: value,
          mitraCode: req.mitraCode,
          deleteAt: null,
        },
      })
      .then((anggota) => {
        if (!anggota) {
          return Promise.reject("Kode anggota tidak ditemukan");
        }
      });
  }),
  check("detail.*.sumber", "Sumber tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check(
    "detail.*.sumber",
    "Sumber harus berisi 'Perkantoran', 'Perumahan', 'Kawasan Industri', 'Fasilitas Umum', 'Fasilitas Khusus'"
  )
    .isIn([
      "Perkantoran",
      "Perumahan",
      "Kawasan Industri",
      "Fasilitas Umum",
      "Fasilitas Khusus",
    ])
    .trim()
    .escape(),

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
  check("detail.*.jsCode", "Jenis sampah tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check("detail.*.jsCode").custom(async (value) => {
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
