import { check } from "express-validator";

export const addKunjunganmitraValidation = [
  check("kunjungan_absen_name", "Judul tidak boleh kosong").notEmpty().trim().escape(),
  check("kunjungan_absen_date", "Deskripsi tidak boleh kosong").notEmpty().trim().escape(),
  check("kunjungan_absen_status", "Deskripsi tidak boleh kosong").notEmpty().trim().escape(),
  
  check("mitraCode", "Kode mitra tidak boleh kosong").notEmpty().trim().escape(),
]