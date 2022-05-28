import { check } from "express-validator";
import { model } from "../../../../models/index.js";

import { Sequelize } from "sequelize";
const op = Sequelize.Op;
export const editUserValidation = [
  check("isActive", "Status is required").notEmpty().trim().escape(),
  check("email", "Email is required").notEmpty().trim().escape(),
  check("email", "Email not valid").isEmail().trim().escape().normalizeEmail(),
  check("email").custom(async (value, { req }) => {
    const user = await model.managementUser.user.findOne({
      where: {
        userCode: req.params.userCode,
        deleteAt: null,
      },
    });
    return model.managementUser.user
      .findOne({
        where: {
          [op.and]: [
            { email: value },
            {
              email: {
                [op.ne]: user.email,
              },
            },
            { deleteAt: null },
          ],
        },
      })
      .then((email) => {
        if (email) {
          return Promise.reject("Email has been used");
        }
      });
  }),
];
