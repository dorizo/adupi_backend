import { check } from "express-validator";

export const addJenisSampahValidation = [
  check("jenis", "Jenis tidak boleh kososng").notEmpty().trim().escape()
];
