import { check } from "express-validator";


export const activeAccountMitraValidation = [
  check("mitraCode", "Kode mitra tidak boleh kosong").notEmpty().trim().escape(),
  check("roleCode", "Kode role tidak boleh kosong").notEmpty().trim().escape(),
];
