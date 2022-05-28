import express from "express";
import { validate } from "../utils/validate.js";
import { authentication } from "../controllers/authentication/index.js";
import { managementUser } from "../controllers/managementUser/index.js";
import { wilayah } from "../controllers/wilayah/index.js";
import { adupi } from "../controllers/adupi/index.js";
import { account } from "../controllers/account/index.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post(
  "/api/v1/login",
  authentication.validation.loginValidation,
  validate,
  authentication.login
);
router.get("/api/v1/token", authentication.refreshToken);

// management user
// role
router.get(
  "/api/v1/role/all",
  verifyToken(["RROLE"]),
  managementUser.role.getAllRole
);

router.get(
  "/api/v1/role/one/:roleCode",
  verifyToken(["RROLE"]),
  managementUser.role.getOneRole
);

router.post(
  "/api/v1/role/add",
  verifyToken(["CROLE"]),
  managementUser.validation.role.addRoleValidation,
  validate,
  managementUser.role.addRole
);
router.put(
  "/api/v1/role/edit/:roleCode",
  verifyToken(["UROLE"]),
  managementUser.validation.role.editRoleValidation,
  validate,
  managementUser.role.editRole
);
router.delete(
  "/api/v1/role/delete/:roleCode",
  verifyToken(["DROLE"]),
  managementUser.role.deleteRole
);

router.get(
  "/api/v1/rolePermission/list/:roleCode",
  verifyToken(["RROLEPERMISSION"]),
  managementUser.role.listPermission
);

router.post(
  "/api/v1/rolePermission/add",
  verifyToken(["CROLEPERMISSION"]),
  managementUser.validation.role.addRolePermissionValidation,
  validate,
  managementUser.role.addPermission
);

router.delete(
  "/api/v1/rolePermission/delete/:rpCode",
  verifyToken(["DROLEPERMISSION"]),
  managementUser.role.deletePermission
);

// user
router.get(
  "/api/v1/user/all",
  verifyToken(["RUSER"]),
  managementUser.user.getAllUser
);

router.get(
  "/api/v1/user/one/:userCode",
  verifyToken(["RUSER"]),
  managementUser.user.getOneUser
);

router.post(
  "/api/v1/user/add",
  verifyToken(["CUSER"]),
  managementUser.validation.user.addUserValidation,
  validate,
  managementUser.user.addUser
);
router.put(
  "/api/v1/user/edit/:userCode",
  verifyToken(["UUSER"]),
  managementUser.validation.user.editUserValidation,
  validate,
  managementUser.user.editUser
);
router.delete(
  "/api/v1/user/delete/:userCode",
  verifyToken(["DUSER"]),
  managementUser.user.deleteUser
);

router.get(
  "/api/v1/roleUser/list/:userCode",
  verifyToken(["RROLEUSER"]),
  managementUser.user.listRole
);

router.post(
  "/api/v1/roleUser/add",
  verifyToken(["CROLEUSER"]),
  managementUser.validation.user.addRoleUserValidation,
  validate,
  managementUser.user.addRoleUser
);

router.delete(
  "/api/v1/roleUser/delete/:ruCode",
  verifyToken(["DROLEUSER"]),
  managementUser.user.deleteRoleUser
);

router.get(
  "/api/v1/userPermission/list/:userCode",
  verifyToken(["RUSERPERMISSION"]),
  managementUser.user.listPermissionUser
);

router.post(
  "/api/v1/userPermission/add",
  verifyToken(["CUSERPERMISSION"]),
  managementUser.validation.user.addUserPermissionValidation,
  validate,
  managementUser.user.addPermissionUser
);

router.delete(
  "/api/v1/userPermission/delete/:upCode",
  verifyToken(["DUSERPERMISSION"]),
  managementUser.user.deletePermissionUser
);

//permission
router.get(
  "/api/v1/permission/all",
  verifyToken(["RPERMISSION"]),
  managementUser.permission.getAllPermission
);

router.get(
  "/api/v1/permissionWithModule/list",
  verifyToken(["RPERMISSIONWITHMODULE"]),
  managementUser.permission.getAllPermissionWithModule
);

router.get(
  "/api/v1/permissionByModule/list/:moduleCode",
  verifyToken(["RPERMISSIONBYMODULE"]),
  managementUser.permission.getAllPermissionByModule
);

router.get(
  "/api/v1/permission/one/:permissionCode",
  verifyToken(["RPERMISSION"]),
  managementUser.permission.getOnePermission
);

// account
router.get(
  "/api/v1/account/self",
  account.self
);

// wilayah
router.get("/api/v1/wilayah/provinsi/all", wilayah.provinsi.getAllProvinsi);

router.get("/api/v1/wilayah/kabupaten/all/:wilayahCode", wilayah.kabupaten.getAllKabupaten);

router.get("/api/v1/wilayah/kecamatan/all/:wilayahCode", wilayah.kecamatan.getAllKecamatan);

router.get("/api/v1/wilayah/desa/all/:wilayahCode", wilayah.desa.getAllDesa);

// adupi
// master
router.get(
  "/api/v1/master/jenisSampah/all",
  verifyToken(["RJENISSAMPAH"]),
  adupi.master.jenisSampah.getAllJenisSampah
);
router.get(
  "/api/v1/master/jenisSampah/one/:jsCode",
  verifyToken(["RJENISSAMPAH"]),
  adupi.master.jenisSampah.getOneJenisSampah
);
router.post(
  "/api/v1/master/jenisSampah/add",
  verifyToken(["CJENISSAMPAH"]),
  adupi.master.jenisSampah.validation.jenisSampah.addJenisSampahValidation,
  validate,
  adupi.master.jenisSampah.addJenisSampah
);
router.put(
  "/api/v1/master/jenisSampah/edit/:jsCode",
  verifyToken(["UJENISSAMPAH"]),
  adupi.master.jenisSampah.validation.jenisSampah.editJenisSampahValidation,
  validate,
  adupi.master.jenisSampah.editJenisSampah
);
router.delete(
  "/api/v1/master/jenisSampah/delete/:jsCode",
  verifyToken(["DJENISSAMPAH"]),
  adupi.master.jenisSampah.deleteJenisSampah
);

// registrasi mitra
router.post(
  "/api/v1/registrasi/mitra",
  adupi.validation.mitra.registrasiMitraValidation,
  validate,
  adupi.mitra.registerMitra
);

// fasilitator
router.get(
  "/api/v1/fasilitator/all",
  verifyToken(["RFASILITATOR"]),
  adupi.fasilitator.getAllFasilitator
);

router.get(
  "/api/v1/fasilitator/one/:fasilitatorCode",
  verifyToken(["RFASILITATOR"]),
  adupi.fasilitator.getOneFasilitator
);

router.get(
  "/api/v1/fasilitator/getUserForAdd",
  verifyToken(["CFASILITATOR"]),
  adupi.fasilitator.getUserForAddFasilitator
);
router.post(
  "/api/v1/fasilitator/add",
  verifyToken(["CFASILITATOR"]),
  adupi.validation.fasilitator.addFasilitatorValidation,
  validate,
  adupi.fasilitator.addFasilitator
);

router.get(
  "/api/v1/fasilitator/getUserForEdit/:fasilitatorCode",
  verifyToken(["CFASILITATOR"]),
  adupi.fasilitator.getUserForEditFasilitator
);
router.put(
  "/api/v1/fasilitator/edit/:fasilitatorCode",
  verifyToken(["UFASILITATOR"]),
  adupi.validation.fasilitator.editFasilitatorValidation,
  validate,
  adupi.fasilitator.editFasilitator
);
router.delete(
  "/api/v1/fasilitator/delete/:fasilitatorCode",
  verifyToken(["DFASILITATOR"]),
  adupi.fasilitator.deleteFasilitator
);

router.get("/", () => {
  console.log("test");
});

export default router;
