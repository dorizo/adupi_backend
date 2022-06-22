import { check } from "express-validator";
import { model } from "../../../../models/index.js";

export const addPembeliOnJualSampahValidation = [
  check("pembeli", "Pembeli tidak boleh kosong")
    .notEmpty(),
];
