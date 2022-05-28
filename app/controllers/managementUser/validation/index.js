import { addRoleValidation } from "./role/add.js";
import { editRoleValidation } from "./role/edit.js";
import { addRolePermissionValidation } from "./role/addPermission.js";

import { addUserValidation } from "./user/add.js";
import { editUserValidation } from "./user/edit.js";
import { addRoleUserValidation } from "./user/addRole.js";
import { addUserPermissionValidation } from "./user/addPermission.js";

export const validation = {
  role: {
    addRoleValidation,
    editRoleValidation,
    addRolePermissionValidation
  },
  user: {
    addUserValidation,
    editUserValidation,
    addRoleUserValidation,
    addUserPermissionValidation,
  }
};
