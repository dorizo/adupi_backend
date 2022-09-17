import { check } from "express-validator";

export const addKunjunganformValidation = [
  check("mitraCode", "Judul tidak boleh kosong").notEmpty().trim().escape(),
  check("Kunjungan_formCapaian", "Deskripsi tidak boleh kosong").notEmpty().trim().escape(),
  check("Kunjungan_formKeterlambatan", "Deskripsi tidak boleh kosong").notEmpty().trim().escape(),
  check("Kunjungan_formHargaPembelian", "Deskripsi tidak boleh kosong").notEmpty().trim().escape(),
  check("Kunjungan_formPekerja", "Deskripsi tidak boleh kosong").notEmpty().trim().escape(),
  check("Kunjungan_formPendampingan", "Deskripsi tidak boleh kosong").notEmpty().trim().escape(),
  
  check("mitraCode", "Kode mitra tidak boleh kosong").notEmpty().trim().escape(),
]