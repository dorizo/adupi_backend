import { check } from "express-validator";

export const addKunjunganValidation = [
  check("judul", "Judul tidak boleh kosong").notEmpty().trim().escape(),
  check("deskripsi", "Deskripsi tidak boleh kosong").notEmpty().trim().escape(),
  check("mitraCode", "Kode mitra tidak boleh kosong").notEmpty().trim().escape(),
]