import {
  getOneRole,
  getAllRole,
  addRole,
  editRole,
  deleteRole,
  addPermission,
  deletePermission,
  listPermission,
} from "./role.js";
import {
  getOneUser,
  getAllUser,
  addUser,
  editUser,
  deleteUser,
  addRoleUser,
  deleteRoleUser,
  listRole,
  addPermission as addPermissionUser,
  deletePermission as deletePermissionUser,
  listPermission as listPermissionUser,
} from "./user.js";
import { validation } from "../managementUser/validation/index.js";

import {
  getAllPermission,
  getAllPermissionWithModule,
  getAllPermissionByModule,
  getOnePermission,
} from "./permission.js";
export const managementUser = {
  role: {
    getOneRole,
    getAllRole,
    addRole,
    editRole,
    deleteRole,
    addPermission,
    deletePermission,
    listPermission,
  },
  user: {
    getOneUser,
    getAllUser,
    addUser,
    editUser,
    deleteUser,
    addRoleUser,
    deleteRoleUser,
    listRole,
    addPermissionUser,
    deletePermissionUser,
    listPermissionUser,
  },
  permission: {
    getAllPermission,
    getAllPermissionWithModule,
    getAllPermissionByModule,
    getOnePermission,
  },
  validation: validation,
};
