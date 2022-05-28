import { check } from "express-validator";
import { model } from "../../../../models/index.js";

export const addRoleUserValidation = [
  check("roleCode", "Role code is required").notEmpty().trim().escape(),
  check("userCode", "User code is required").notEmpty().trim().escape(),
  check("roleCode").custom(async (value, { req }) => {
    await model.managementUser.user.findOne({
      where: {
        userCode: req.body.userCode,
        deleteAt: null,
        status:"Public"
      },
    }).then((user) => {
      if (!user) {
        return Promise.reject("User not found");
      }
    });
    await model.managementUser.role.findOne({
      where: {
        roleCode: req.body.roleCode,
        deleteAt: null,
      },
    }).then((role) => {
      if (!role) {
        return Promise.reject("Role not found");
      }
    });
    return await model.managementUser.roleUser.findOne({
      where: {
        userCode: req.body.userCode,
        roleCode: req.body.roleCode,
        deleteAt: null,
      },
    }).then((role) => {
      if (role) {
        return Promise.reject("Role has been added");
      }
    });
  })
];