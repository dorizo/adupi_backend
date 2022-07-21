import { check } from "express-validator";

export const addKategoriSampahValidation = [
  check("kategori", "Kategori tidak boleh kososng").notEmpty().trim().escape()
];
