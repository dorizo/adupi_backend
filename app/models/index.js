import { managementUser } from "./managementUser/index.js";
import { adupi } from "./adupi/index.js";

(adupi.mitra).belongsTo(managementUser.user ,{
  foreignKey: "userCode",
});
(managementUser.user).hasOne(adupi.mitra, {
  foreignKey: "userCode",
});

export const model = {
  managementUser: managementUser,
  adupi: adupi
};
