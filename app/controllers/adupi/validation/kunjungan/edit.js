import { check } from "express-validator";

export const editKunjunganValidation = [
  check("judul", "Judul tidak boleh kosong").notEmpty().trim().escape(),
  check("deskripsi", "Deskripsi tidak boleh kosong").notEmpty().trim().escape(),
]