import { check } from "express-validator";

export const addMasalahValidation = [
  check("jenisMasalah", "Jenis masalah tidak boleh kosong")
    .notEmpty(),
  check(
    "jenisMasalah",
    "Jenis masalah harus berisi 'Kerusakan Mesin', 'Kerusakan Kendaraan', 'Kerusakan Peralatan', 'Masalah Ketenagakerjaan', 'Masalah Suplay' atau 'Kondisi Darurat'"
  )
    .isIn(["Kerusakan Mesin", "Kerusakan Kendaraan", "Kerusakan Peralatan", "Masalah Ketenagakerjaan", "Masalah Suplay", "Kondisi Darurat","Masalah Lain Lain"])
    .trim()
    .escape(),
  check("deskripsi", "Deskripsi masalah tidak boleh kosong")
    .notEmpty(),
  check("foto", "Foto mesin tidak boleh kosong").notEmpty(),
];
