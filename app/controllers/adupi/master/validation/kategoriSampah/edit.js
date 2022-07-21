import { check } from "express-validator";

export const editKategoriSampahValidation = [
  check("kategori", "Kategori tidak boleh kososng").notEmpty().trim().escape()
];
