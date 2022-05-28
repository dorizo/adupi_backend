import { check } from "express-validator";
import { model } from "../../../../models/index.js";

export const addUserPermissionValidation = [
  check("userCode", "User code is required").notEmpty().trim().escape(),
  check("permissionCode", "Permission code is required").notEmpty().trim().escape(),
  check("permissionCode").custom(async (value, { req }) => {
    await model.managementUser.user.findOne({
      where: {
        userCode: req.body.userCode,
        deleteAt: null,
        status: "Public"
      },
    }).then((user) => {
      if (!user) {
        return Promise.reject("User not found");
      }
    });
    await model.managementUser.permission.findOne({
      where: {
        permissionCode: req.body.permissionCode,
        deleteAt: null,
      },
    }).then((permission) => {
      if (!permission) {
        return Promise.reject("Permission not found");
      }
    });
    return await model.managementUser.userPermission.findOne({
      where: {
        userCode: req.body.userCode,
        permissionCode: req.body.permissionCode,
        deleteAt: null,
      },
    }).then((permission) => {
      if (permission) {
        return Promise.reject("Permission has been added");
      }
    });
  })
];