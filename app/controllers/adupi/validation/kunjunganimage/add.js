import { check } from "express-validator";

export const addfotoValidationimage = [
  check("image", "Judul tidak boleh kosong").notEmpty().trim().escape(),
  check("idku", "Deskripsi tidak boleh kosong").notEmpty().trim().escape(),
  check("statusfoto", "Deskripsi tidak boleh kosong").notEmpty().trim().escape(),
]