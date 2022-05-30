import { check } from "express-validator";

export const loginValidation = [
  check("email", "Email is required").notEmpty(),
  check("email", "Email not valid").isEmail().trim().escape().normalizeEmail(),
  check("password", "Password is required").notEmpty(), 
];
