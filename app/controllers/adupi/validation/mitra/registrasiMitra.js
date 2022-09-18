import { check } from "express-validator";
import { model } from "../../../../models/index.js";
import db from "../../../../config/database.js";
import { QueryTypes } from "sequelize";

export const registrasiMitraValidation = [
  check("nama", "Nama tidak boleh kosong").notEmpty().trim().escape(),
  check("nik", "NIK tidak boleh kosong").notEmpty().trim().escape(),
  check("nik", "NIK harus 16 karakter")
    .isLength({ min: 16, max: 16 })
    .trim()
    .escape(),
  check("nik", "NIK harus berisi angka").isDecimal().trim().escape(),
  check("nik").custom((value) => {
    return model.adupi.mitra
      .findOne({ where: { nik: value, deleteAt: null } })
      .then((nik) => {
        if (nik) {
          return Promise.reject("NIK sudah digunakan");
        }
      });
  }),
  check("noHp", "No HP tidak boleh kosong").notEmpty().trim().escape(),
  check("noHp", "No HP harus berisi angka").isDecimal().trim().escape(),
  check("noHp").custom((value) => {
    return model.adupi.mitra
      .findOne({ where: { noHp: value, deleteAt: null } })
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
  check("jenisMitra", "Jenis mitra tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check(
    "jenisMitra",
    "Jenis mitra harus berisi 'PT', 'CV', 'UD', 'KOPERASI', 'BANK SAMPAH INDUK'"
  )
    .isIn(["PT", "CV", "UD", "KOPERASI", "BANK SAMPAH INDUK"])
    .trim()
    .escape(),
  check("tempatLahir", "Tempat lahir tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check("tanggalLahir", "Tanggal lahir tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check("ktp", "KTP tidak boleh kosong").notEmpty(),
  check("alamat", "Alamat tidak boleh kosong").notEmpty(),
  check("email", "Email tidak boleh kosong").notEmpty().trim().escape(),
  check("email", "Email tidak valid")
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  check("email").custom((value) => {
    return model.managementUser.user
      .findOne({ where: { email: value, deleteAt: null } })
      .then((email) => {
        if (email) {
          return Promise.reject("Email sudah digunakan");
        }
      });
  }),
  check("password", "Password tidak boleh kosong").notEmpty().trim().escape(),

  // data usaha
  check("namaUsaha", "Nama usaha tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check(
    "noSuratIzinUsaha",
    "No surat izin usaha tidak boleh kosong"
  ).notEmpty(),
  check("noSuratIzinUsaha").custom((value) => {
    return model.adupi.usaha
      .findOne({ where: { noSuratIzinUsaha: value, deleteAt: null } })
      .then((noSuratIzinUsaha) => {
        if (noSuratIzinUsaha) {
          return Promise.reject("No surat izin usaha sudah digunakan");
        }
      });
  }),
  check("luasGudang", "Luas gudang tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check("luasGudang", "Luas gudang harus berisi angka")
    .isDecimal()
    .trim()
    .escape(),

  check(
    "statusKepemilikanGudang",
    "Status kepemilikan gudang tidak boleh kosong"
  )
    .notEmpty()
    .trim()
    .escape(),
  check(
    "statusKepemilikanGudang",
    "Status kepemilikan gudang harus berisi 'Milik Pribadi', 'Milik Negara', 'Sewa' atau 'Hak Guna Pakai'"
  )
    .isIn(["Milik Pribadi", "Milik Negara", "Sewa", "Hak Guna Pakai"])
    .trim()
    .escape(),

  check("lamaOperasional", "Lama operasional tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check("lamaOperasional", "Lama operasional harus berisi angka")
    .isDecimal()
    .trim()
    .escape(),

  check("jumlahPekerja", "Jumlah pekerja tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check("jumlahPekerja", "Jumlah pekerja harus berisi angka")
    .isDecimal()
    .trim()
    .escape(),
  check("wilayahCodeUsaha", "Wilayah usaha tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check("wilayahCodeUsaha").custom(async (value) => {
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
  check("alamatUsaha", "Alamat usaha tidak boleh kosong").notEmpty(),
  check("foto", "Foto gudang tidak boleh kosong").notEmpty(),
  check("lang", "Posisi gudang tidak boleh kosong").notEmpty(),
  check("lat", "Posisi gudang tidak boleh kosong").notEmpty(),

  // daftar mesin
  check("mesin.*.jenisMesin", "Jenis mesin tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check(
    "mesin.*.statusKepemilikanMesin",
    "Status kepemilikan mesin tidak boleh kosong"
  )
    .notEmpty()
    .trim()
    .escape(),
  check("mesin.*.kapasitas", "Kapasitas tidak boleh kosong")
    .notEmpty()
    .trim()
    .escape(),
  check("mesin.*.kapasitas", "Kapasitas harus berisi angka")
    .isDecimal()
    .trim()
    .escape(),
  check("mesin.*.foto", "Foto mesin tidak boleh kosong").notEmpty(),
];

export const checkEmailValidation = [
  check("email", "Email tidak boleh kosong").notEmpty().trim().escape(),
  check("email", "Email tidak valid")
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
];

export const checkNIKValidation = [
  check("nik", "NIK tidak boleh kosong").notEmpty().trim().escape(),
  check("nik", "NIK harus berisi angka").isDecimal().trim().escape(),
];

export const checkNoHPValidation = [
  check("noHp", "No HP tidak boleh kosong").notEmpty().trim().escape(),
  check("noHp", "No HP harus berisi angka").isDecimal().trim().escape(),
];
