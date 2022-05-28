import { user } from "./userModel.js";
import { role } from "./roleModel.js";
import { roleUser } from "./roleUserModel.js";
import { permission }  from "./permissionModel.js";
import { module } from "./moduleModel.js";
import { rolePermission } from "./rolePermissionModel.js";
import { userPermission } from "./userPermissionModel.js";

//
module.hasMany(permission ,{
  foreignKey: "moduleCode",
});
permission.belongsTo(module, {
  foreignKey: "moduleCode",
});

//
rolePermission.belongsTo(permission, {
  foreignKey: "permissionCode",
});
permission.hasMany(rolePermission ,{
  foreignKey: "permissionCode",
});

//
rolePermission.belongsTo(role, {
  foreignKey: "roleCode",
});
role.hasMany(rolePermission ,{
  foreignKey: "roleCode",
});

//
roleUser.belongsTo(user, {
  foreignKey: "userCode",
});
user.hasMany(roleUser ,{
  foreignKey: "userCode",
});

//
roleUser.belongsTo(role, {
  foreignKey: "roleCode",
});
role.hasMany(roleUser ,{
  foreignKey: "roleCode",
});


userPermission.belongsTo(permission, {
  foreignKey: "permissionCode",
});

userPermission.belongsTo(user, {
  foreignKey: "userCode",
});


export const managementUser = {
  user: user,
  role: role,
  roleUser: roleUser,
  module: module,
  permission: permission,
  rolePermission: rolePermission,
  userPermission: userPermission,
};
