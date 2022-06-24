import { check } from "express-validator";
import { model } from "../../../../models/index.js";

export const addPembeliValidation = [
  check("pembeli", "Pembeli tidak boleh kosong")
    .notEmpty(),
];
