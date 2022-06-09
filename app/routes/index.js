import express from "express";
import { validate } from "../utils/validate.js"
import { authentication } from "../controllers/authentication/index.js";
import { managementUser } from "../controllers/managementUser/index.js";
import { wilayah } from "../controllers/wilayah/index.js";
import { adupi } from "../controllers/adupi/index.js";
import { account } from "../controllers/account/index.js";
import { verifyToken } from "../middleware/verifyToken.js";
import pkg from "node-geocoder";
const { NodeGeocoder } = pkg;

import request from "request";

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
router.get("/api/v1/account/self", account.self);

// wilayah
router.get("/api/v1/wilayah/provinsi/all", wilayah.provinsi.getAllProvinsi);

router.get(
  "/api/v1/wilayah/kabupaten/all/:wilayahCode",
  wilayah.kabupaten.getAllKabupaten
);

router.get(
  "/api/v1/wilayah/kecamatan/all/:wilayahCode",
  wilayah.kecamatan.getAllKecamatan
);

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

router.post(
  "/api/v1/registrasi/mitra/checkEmail",
  adupi.validation.mitra.checkEmailValidation,
  validate,
  adupi.mitra.checkEmail
);

router.post(
  "/api/v1/registrasi/mitra/checkNIK",
  adupi.validation.mitra.checkNIKValidation,
  validate,
  adupi.mitra.checkNIK
);

router.post(
  "/api/v1/registrasi/mitra/checkNoHP",
  adupi.validation.mitra.checkNoHPValidation,
  validate,
  adupi.mitra.checkNoHP
);

// detail self mitra
router.get(
  "/api/v1/mitra/self",
  verifyToken(["RDETAILSELFMITRA"]),
  adupi.mitra.detailSelf
);

// get semua data mitra yang belum terverifikasi oleh fasilitator
router.get(
  "/api/v1/fasilitator/allMitra/notYetVerifByFasilitator",
  verifyToken(["RMITRANOTYETVERIFBYFASILITATOR"]),
  adupi.fasilitator.getMitraNotYetVerifByFasilitator
);

// verifikasi mitra oleh fasilitator
router.get(
  "/api/v1/fasilitator/verifMitra/:mitraCode",
  verifyToken(["VERIFMITRABYFASILITATOR"]),
  adupi.fasilitator.verifMitraByFasilitator
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

router.get(
  "/api/v1/fasilitator/allMitra",
  verifyToken(["RALLMITRAINFASILITATOR"]),
  adupi.mitra.getAllMitraByFasilitator
);

router.get(
  "/api/v1/fasilitator/detailMitra/:mitraCode",
  verifyToken(["RDETAILMITRAINFASILITATOR"]),
  adupi.mitra.getDetailMitraByFasilitator
);

router.get(
  "/api/v1/koordinat/:address",
  // verifyToken(["KOORDINAT"]),
  async (req, res) => {
    var API_KEY = "AIzaSyDttiQFKmTxsGE1Nb5tW6cq2c-rwVELAas";
    var BASE_URL = "https://maps.googleapis.com/maps/api/geocode/json?address=";

    var address = req.params.address;

    var url = BASE_URL + address + "&key=" + API_KEY;

    request(url, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        return res.status(200).json({
          status: 200,
          message: "",
          data: JSON.parse(body)
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Gagal menemukan koordinat",
        });
      }
    });
  }
);

router.post(
  "/api/v1/fasilitator/addMitra",
  verifyToken(["CMITRABYFASILITATOR"]),
  adupi.validation.mitra.addMitraByFasilitatorValidation,
  validate,
  adupi.mitra.addMitraByFasilitator
);

router.delete(
  "/api/v1/fasilitator/deleteMitra/:mitraCode",
  verifyToken(["DMITRABYFASILITATOR"]),
  adupi.mitra.deleteMitraByFasilitator
);

// beli sampah
router.post(
  "/api/v1/beli/sampah",
  verifyToken(["BSAMPAH"]),
  adupi.anggota.checkMitraOrNot,
  adupi.validation.beliSampah.addBeliSampahValidation,
  validate,
  adupi.beliSampah.addBeliSampah
);

// anggota
router.get(
  "/api/v1/anggota/all",
  verifyToken(["RANGGOTA"]),
  adupi.anggota.checkMitraOrNot,
  adupi.anggota.getAllAnggota
);

router.get(
  "/api/v1/anggota/one/:anggotaCode",
  verifyToken(["RANGGOTA"]),
  adupi.anggota.checkMitraOrNot,
  adupi.anggota.getOneAnggota
);

router.post(
  "/api/v1/anggota/add",
  verifyToken(["CANGGOTA"]),
  adupi.anggota.checkMitraOrNot,
  adupi.validation.anggota.addAnggotaValidation,
  validate,
  adupi.anggota.addAnggota
);

router.put(
  "/api/v1/anggota/edit/:anggotaCode",
  verifyToken(["UANGGOTA"]),
  adupi.anggota.checkMitraOrNot,
  adupi.validation.anggota.editAnggotaValidation,
  validate,
  adupi.anggota.editAnggota
);
router.delete(
  "/api/v1/anggota/delete/:anggotaCode",
  verifyToken(["DANGGOTA"]),
  adupi.anggota.checkMitraOrNot,
  adupi.anggota.deleteAnggota
);

// mesin
router.get(
  "/api/v1/mesin/all/:usahaCode",
  verifyToken(["RMESIN"]),
  adupi.anggota.checkMitraOrNot,
  adupi.mesin.getAllMesin
);

router.get(
  "/api/v1/mesin/one/:mesinCode",
  verifyToken(["RMESIN"]),
  adupi.anggota.checkMitraOrNot,
  adupi.mesin.getOneMesin
);

router.post(
  "/api/v1/mesin/add",
  verifyToken(["CMESIN"]),
  adupi.anggota.checkMitraOrNot,
  adupi.validation.mesin.addMesinValidation,
  validate,
  adupi.mesin.addMesin
);

router.put(
  "/api/v1/mesin/edit/:mesinCode",
  verifyToken(["UMESIN"]),
  adupi.anggota.checkMitraOrNot,
  adupi.validation.mesin.editMesinValidation,
  validate,
  adupi.mesin.editMesin
);
router.delete(
  "/api/v1/mesin/delete/:mesinCode",
  verifyToken(["DMESIN"]),
  adupi.anggota.checkMitraOrNot,
  adupi.mesin.deleteMesin
);

//masalah
router.get(
  "/api/v1/masalah/all",
  verifyToken(["RMASALAH"]),
  adupi.anggota.checkMitraOrNot,
  adupi.masalah.getAllMasalah
);

router.get(
  "/api/v1/masalah/one/:masalahCode",
  verifyToken(["RMASALAH"]),
  adupi.anggota.checkMitraOrNot,
  adupi.masalah.getOneMasalah
);

router.post(
  "/api/v1/masalah/add",
  verifyToken(["CMASALAH"]),
  adupi.anggota.checkMitraOrNot,
  adupi.validation.masalah.addMasalahValidation,
  validate,
  adupi.masalah.addMasalah
);

router.put(
  "/api/v1/masalah/edit/:masalahCode",
  verifyToken(["UMASALAH"]),
  adupi.anggota.checkMitraOrNot,
  adupi.validation.masalah.editMasalahValidation,
  validate,
  adupi.masalah.editMasalah
);
router.delete(
  "/api/v1/masalah/delete/:masalahCode",
  verifyToken(["DMASALAH"]),
  adupi.anggota.checkMitraOrNot,
  adupi.masalah.deleteMasalah
);
router.get(
  "/api/v1/masalah/changeStatus/:masalahCode",
  verifyToken(["CHANGESTATUSMASALAH"]),
  adupi.masalah.updateStatusMasalah
);

//super admin
router.get(
  "/api/v1/su/allMitra/:verified?",
  verifyToken(["RMITRA"]),
  adupi.mitra.getAllMitraVerified
);

router.get(
  "/api/v1/su/detailMitra/:mitraCode",
  verifyToken(["RDETAILMITRA"]),
  adupi.mitra.getDetailMitraVerified
);

router.post(
  "/api/v1/su/activeAccountMitra",
  verifyToken(["ACTIVEACCOUNTMITRA"]),
  adupi.validation.mitra.activeAccountMitraValidation,
  validate,
  adupi.mitra.activeAccountMitra
);

router.get("/", async () => {
  const options = {
    provider: "google",

    // Optional depending on the providers
    fetch: customFetchImplementation,
    apiKey: "AIzaSyDttiQFKmTxsGE1Nb5tW6cq2c-rwVELAas", // for Mapquest, OpenCage, Google Premier
    formatter: null, // 'gpx', 'string', ...
  };

  const geocoder = NodeGeocoder(options);

  // Using callback
  const res = await geocoder.geocode("29 champs elysée paris");
});

export default router;
