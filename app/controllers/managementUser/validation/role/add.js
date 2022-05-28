import { check } from "express-validator";

export const addRoleValidation = [
  check("role", "Role is required").notEmpty().trim().escape()
];
