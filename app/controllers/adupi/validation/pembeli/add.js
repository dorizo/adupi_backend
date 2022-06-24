import { check } from "express-validator";
import { model } from "../../../../models/index.js";

export const addPembeliValidation = [
  check("pembeliCode", "Pembeli tidak boleh kosong")
    .notEmpty(),
];
