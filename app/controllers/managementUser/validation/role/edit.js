import { check } from "express-validator";

export const editRoleValidation = [
  check("role", "Role is required").notEmpty().trim().escape()
];
