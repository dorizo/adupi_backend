import { check } from "express-validator";

export const editJenisSampahValidation = [
  check("jenis", "Jenis tidak boleh kososng").notEmpty().trim().escape(),
  check("ksCode", "Kategori tidak boleh kososng").notEmpty().trim().escape(),
];
