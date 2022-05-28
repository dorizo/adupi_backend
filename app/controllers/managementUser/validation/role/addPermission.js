import { check } from "express-validator";
import { model } from "../../../../models/index.js";

export const addRolePermissionValidation = [
  check("roleCode", "Role code is required").notEmpty().trim().escape(),
  check("permissionCode", "Permission code is required").notEmpty().trim().escape(),
  check("permissionCode").custom(async (value, { req }) => {
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
    return await model.managementUser.rolePermission.findOne({
      where: {
        permissionCode: req.body.permissionCode,
        roleCode: req.body.roleCode,
        deleteAt: null,
      },
    }).then((permission) => {
      if (permission) {
        return Promise.reject("Permission has been added");
      }
    });
  })
];