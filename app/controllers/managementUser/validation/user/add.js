import { check } from "express-validator";
import { model } from "../../../../models/index.js";

export const addUserValidation = [
  check("isActive", "Status is required").notEmpty().trim().escape(),
  check("email", "Email is required").notEmpty().trim().escape(),
  check("email", "Email not valid")
    .isEmail()
    .trim()
    .escape()
    .normalizeEmail(),
  check("email").custom((value) => {
    return model.managementUser.user
      .findOne({ where: { email: value,deleteAt: null, } })
      .then((email) => {
        if (email) {
          return Promise.reject("Email has been used");
        }
      });
  }),
  check("password", "Password is required").notEmpty().trim().escape(),
];
