import { check } from "express-validator";

export const verifAnggotaValidation = [
  check("long", "Longitude tidak boleh kosong").notEmpty().trim().escape(),
  check("lat", "Latitude tidak boleh kosong").notEmpty().trim().escape(),
]