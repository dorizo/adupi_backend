import express from "express";
import { validate } from "../utils/validate.js";
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
  verifyToken(["RJENISSAMPAH","BSAMPAH"]),
  adupi.master.jenisSampah.getAllJenisSampah
);
router.get(
  "/api/v1/master/jenisSampah/one/:jsCode",
  verifyToken(["RJENISSAMPAH","BSAMPAH"]),
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

//kategoriSampah
router.get(
  "/api/v1/master/kategoriSampah/all",
  verifyToken(["RKATEGORISAMPAH","BSAMPAH"]),
  adupi.master.kategoriSampah.getAllKategoriSampah
);
router.get(
  "/api/v1/master/kategoriSampah/one/:ksCode",
  verifyToken(["RKATEGORISAMPAH","BSAMPAH"]),
  adupi.master.kategoriSampah.getOneKategoriSampah
);
router.post(
  "/api/v1/master/kategoriSampah/add",
  verifyToken(["CKATEGORISAMPAH"]),
  adupi.master.kategoriSampah.validation.kategoriSampah.addKategoriSampahValidation,
  validate,
  adupi.master.kategoriSampah.addKategoriSampah
);
router.put(
  "/api/v1/master/kategoriSampah/edit/:ksCode",
  verifyToken(["UKATEGORISAMPAH"]),
  adupi.master.kategoriSampah.validation.kategoriSampah.editKategoriSampahValidation,
  validate,
  adupi.master.kategoriSampah.editKategoriSampah
);
router.delete(
  "/api/v1/master/kategoriSampah/delete/:ksCode",
  verifyToken(["DKATEGORISAMPAH"]),
  adupi.master.kategoriSampah.deleteKategoriSampah
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
  "/api/v1/fasilitator/ceklokasi/:mitraCode",
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
          data: JSON.parse(body),
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
router.get(
  "/api/v1/beli/sampah/:mitraCode?",
  verifyToken(["RBELISAMPAH"]),
  adupi.beliSampah.checkMitraOrNotBeliSampah,
  adupi.beliSampah.getBeliSampah
);

//admin beli sampah

router.get(
  "/api/v1/su/beli/sampah",
  adupi.beliSampah.getSuperAdminBeliSampah
);


router.post(
  "/api/v1/beli/sampah",
  verifyToken(["BSAMPAH"]),
  adupi.anggota.checkMitraOrNot,
  adupi.validation.beliSampah.addBeliSampahValidation,
  validate,
  adupi.beliSampah.addBeliSampah
);

router.post(
  "/api/v1/beli/editsampah",
  verifyToken(["BSAMPAH"]),
  adupi.anggota.checkMitraOrNot,
  // adupi.validation.beliSampah.addBeliSampahValidation,
  validate,
  adupi.beliSampah.editBeliSampah
);
// jual sampah
router.post(
  "/api/v1/jual/sampah/add/pembeli",
  verifyToken(["RJUALSAMPAH"]),
  adupi.validation.pembeli.addPembeliOnJualSampahValidation,
  adupi.pembeli.addPembeliJualSampah
);

router.get(
  "/api/v1/jual/sampah/:mitraCode?",
  verifyToken(["RJUALSAMPAH"]),
  adupi.beliSampah.checkMitraOrNotBeliSampah,
  adupi.jualSampah.getJualSampah
);

router.get(
  "/api/v1/su/jual/sampah",
  verifyToken(["RJUALSAMPAH"]),
  // adupi.beliSampah.checkMitraOrNotBeliSampah,
  adupi.jualSampah.getsuJualSampah
);
router.get(
  "/api/v1/jual/getPembeli",
  verifyToken(["RJUALSAMPAH"]),
  adupi.pembeli.getAllPembeliForPembelian
);

router.post(
  "/api/v1/jual/sampah",
  verifyToken(["JSAMPAH"]),
  adupi.anggota.checkMitraOrNot,
  adupi.validation.jualSampah.addJualSampahValidation,
  validate,
  adupi.jualSampah.addJualSampah
);

router.post(
  "/api/v1/jual/editsampah",
  verifyToken(["JSAMPAH"]),
  adupi.anggota.checkMitraOrNot,
  adupi.validation.jualSampah.addJualSampahValidation,
  validate,
  adupi.jualSampah.editjualsampah
);

// anggota
router.get(
  "/api/v1/anggota/all/:mitraCode?/:status?",
  verifyToken(["RANGGOTA"]),
  adupi.beliSampah.checkMitraOrNotBeliSampah,
  adupi.anggota.getAllAnggota
);

router.get(
  "/api/v1/anggota/one/:anggotaCode/:mitraCode?",
  verifyToken(["RANGGOTA"]),
  adupi.beliSampah.checkMitraOrNotBeliSampah,
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
  "/api/v1/masalah/allstatus/:status?",
  adupi.masalah.getAllMasalahstatus
);

router.get(
  "/api/v1/masalah/allstatuscount",
  adupi.masalah.getAllMasalahstatuscount
);
router.get(
  "/api/v1/logfasilitator",
  adupi.masalah.getalllogfasilitator
);
router.get(
  "/api/v1/masalah/all/:mitraCode?",
  verifyToken(["RMASALAH"]),
  adupi.beliSampah.checkMitraOrNotBeliSampah,
  adupi.masalah.getAllMasalah
);

router.get(
  "/api/v1/masalah/one/:masalahCode",
  verifyToken(["RMASALAH"]),
  adupi.masalah.getOneMasalah
);

router.get(
  "/api/v1/cekkunjungan/:kunjungan_absenCode",
  adupi.kunjunganForm.cekkunjungan
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

router.post(
  "/api/v1/masalah/rubahfasilitatormasalah",
  // verifyToken(["CHANGESTATUSMASALAH"]),
  adupi.masalah.updateStatusMasalahtanggal
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

router.post(
  "/api/v1/fasilitator/masalahnote",
  adupi.masalah.fasilitatoreditmasalah
)

router.post(
  "/api/v1/su/activeAnggota/:anggotaCode",
  verifyToken(["ACTIVEANGGOTA"]),
  adupi.validation.anggota.verifAnggotaValidation,
  validate,
  adupi.anggota.verifAnggota
);

router.get("/", async () => {
  console.log("asd");
});
import fs from "fs";

router.get("/api/v1/assets/:dir/:file", (req, res) => {
  fs.readFile(
    "./assets/" + req.params.dir + "/" + req.params.file,
    function (err, data) {
      if (err) {
        return res.status(404).json({
          status: 404,
          message: "Gambar tidak ditemukan",
        });
      }
      res.writeHead(200, { "Content-Type": "image/jpeg" });
      res.end(data);
    }
  );
});

//report
router.get(
  "/api/v1/report/all/:startDate?/:endDate?",
  verifyToken(["REPORT"]),
  adupi.report.getAllMitraReport
);

router.get(
  "/api/v1/report/detail/:mitraCode/:startDate?/:endDate?",
  verifyToken(["REPORT"]),
  adupi.report.getDetailMitraReport
);

router.get(
  "/api/v1/report/jumlahMitraPerbulanPerkabupaten",
  verifyToken(["REPORT"]),
  adupi.report.getJumlahMitraPerbulanPerkabupaten
);

router.get(
  "/api/v1/report/jumlahLuasGudangPerbulan",
  verifyToken(["REPORT"]),
  adupi.report.getJumlahLuasGudangPerbulan
);

router.get(
  "/api/v1/report/jumlahPekerjaPerbulan",
  verifyToken(["REPORT"]),
  adupi.report.getJumlahPekerjaPerbulan
);

router.get(
  "/api/v1/report/pembelian/semuaMitraPerbulan",
  verifyToken(["REPORT"]),
  adupi.report.getPembelianSemuaMitraPerbulan
);

router.get(
  "/api/v1/report/penjualan/semuaMitraPerbulan",
  verifyToken(["REPORT"]),
  adupi.report.getPenjualanSemuaMitraPerbulan
);

router.get(
  "/api/v1/report/pembelian/permitraPerbulan",
  verifyToken(["REPORT"]),
  adupi.report.getPembelianPermitraPerbulan
);

router.get(
  "/api/v1/report/pembelian/permitraPerbulanline",
  verifyToken(["REPORT"]),
  adupi.report.getPembelianPermitraPerbulanline
);
router.get(
  "/api/v1/report/pembelian/permitraPerbulanlinevsmitra",
  verifyToken(["REPORT"]),
  adupi.report.getPembelianPermitraPerbulanlinevsmitra
);
router.get(
  "/api/v1/report/pembelian/totalmitravspembelian",
  verifyToken(["REPORT"]),
  adupi.report.getpembeliantotalmitravspembelian
);
router.get(
  "/api/v1/report/penjualan/permitraPerbulan",
  verifyToken(["REPORT"]),
  adupi.report.getPenjualanPermitraPerbulan
);

router.get(
  "/api/v1/report/penjualan/permitraPerbulanline",
  verifyToken(["REPORT"]),
  adupi.report.getPenjualanPermitraPerbulanline
);

router.get(
  "/api/v1/report/penjualan/semuaMitraPerbulanPerpabrik",
  verifyToken(["REPORT"]),
  adupi.report.getPenjualanSemuaMitraPerbulanPerpabrik
);

router.get(
  "/api/v1/report/penjualan/permitraPerbulanPerpabrik",
  verifyToken(["REPORT"]),
  adupi.report.getPenjualanPermitraPerbulanPerpabrik
);

router.get(
  "/api/v1/report/masalah/semuaMitraPerbulanPerjenisPerstatus",
  verifyToken(["REPORT"]),
  adupi.report.getMasalahSemuaMitraPerbulanPerjenisPerstatus
);

router.get(
  "/api/v1/report/masalah/permitraPerbulanPerjenisPerstatus",
  verifyToken(["REPORT"]),
  adupi.report.getMasalahPermitraPerbulanPerjenisPerstatus
);

router.get(
  "/api/v1/report/pembelian/semuaMitraPerkategori",
  verifyToken(["REPORT"]),
  adupi.report.getPembelianPerkategori
);

router.get(
  "/api/v1/report/penjualan/semuaMitraPerkategori",
  verifyToken(["REPORT"]),
  adupi.report.getPenjualanPerkategori
);

router.get(
  "/api/v1/report/pembelian/newSemuaMitraPerkategori",
  verifyToken(["REPORT"]),
  adupi.report.getNewPembelianPerkategori
);

router.get(
  "/api/v1/report/penjualan/newSemuaMitraPerkategori",
  verifyToken(["REPORT"]),
  adupi.report.getNewPenjualanPerkategori
);


router.get(
  "/api/v1/report/analisis/pembelianDenganMitraPerbulan",
  verifyToken(["REPORT"]),
  adupi.report.getAnalisisPembelianDenganMitraPerbulan
);
router.get(
  "/api/v1/report/analisis/pembelianDenganPekerjaPerbulan",
  verifyToken(["REPORT"]),
  adupi.report.getAnalisisPembelianDenganPekerjaPerbulan
);
router.get(
  "/api/v1/report/analisis/pembelianDenganLuasGudangPerbulan",
  verifyToken(["REPORT"]),
  adupi.report.getAnalisisPembelianDenganLuasGudangPerbulan
);


router.get(
  "/api/v1/export/beliSampah/:mitraCode?",
  verifyToken(["EXPORT"]),
  adupi.beliSampah.checkMitraOrNotBeliSampah,
  adupi.export.getDocBeliSampah
);

router.get(
  "/api/v1/export/jualSampah/:mitraCode?",
  // verifyToken(["EXPORT"]),
  // adupi.beliSampah.checkMitraOrNotBeliSampah,
  adupi.export.getDocJualSampah
);

//kunjungan
router.get(
  "/api/v1/kunjungan/all",
  verifyToken(["RKUNJUNGAN"]),
  adupi.kunjungan.checkFasilitatorOrNotForAll,
  adupi.kunjungan.getAllKunjungan
);

router.get(
  "/api/v1/kunjungan/one/:kunjunganCode",
  verifyToken(["RKUNJUNGAN"]),
  adupi.kunjungan.checkFasilitatorOrNotForAll,
  adupi.kunjungan.getOneKunjungan
);

router.post(
  "/api/v1/kunjungan/add",
  verifyToken(["CKUNJUNGAN"]),
  adupi.kunjungan.checkFasilitatorOrNot,
  adupi.validation.kunjungan.addKunjunganValidation,
  validate,
  adupi.kunjungan.addKunjungan
);


router.post(
  "/api/v1/kunjungan/addfoto",
  verifyToken(["CKUNJUNGAN"]),
  adupi.validation.kunjungan.addfotoValidationimage,
  validate,
  adupi.kunjungan.addKunjunganimage
);

router.put(
  "/api/v1/kunjungan/edit/:kunjunganCode",
  verifyToken(["UKUNJUNGAN"]),
  adupi.kunjungan.checkFasilitatorOrNot,
  adupi.validation.kunjungan.editKunjunganValidation,
  validate,
  adupi.kunjungan.editKunjungan
);
router.delete(
  "/api/v1/kunjungan/delete/:kunjunganCode",
  verifyToken(["DKUNJUNGAN"]),
  adupi.kunjungan.checkFasilitatorOrNot,
  adupi.kunjungan.deleteKunjungan
);

//dashboard
router.get(
  "/api/v1/dashboard/getAllAnggota",
  verifyToken(["RDASHBOARDMAP"]),
  adupi.dashboard.getAllAnggotaForDashboard
);

router.get(
  "/api/v1/dashboard/getAllAnggotaByWilayah/:wilayahCode",
  verifyToken(["RDASHBOARDMAP"]),
  adupi.dashboard.getAllAnggotaByWilayah
);

router.get(
  "/api/v1/dashboard/getDetailTransaksi/:anggotaCode",
  verifyToken(["RDASHBOARDMAP"]),
  adupi.dashboard.getDetailTransaksi
);

// pembeli
router.get(
  "/api/v1/pembeli/all",
  verifyToken(["RPEMBELI"]),
  adupi.pembeli.getAllPembeli
);

router.get(
  "/api/v1/pembeli/one/:pembeliCode",
  verifyToken(["RPEMBELI"]),
  adupi.pembeli.getOnePembeli
);

router.post(
  "/api/v1/pembeli/add",
  verifyToken(["CPEMBELI"]),
  adupi.validation.pembeli.addPembeliValidation,
  validate,
  adupi.pembeli.addPembeli
);

router.put(
  "/api/v1/pembeli/edit/:pembeliCode",
  verifyToken(["UPEMBELI"]),
  adupi.validation.pembeli.editPembeliValidation,
  validate,
  adupi.pembeli.editPembeli
);
router.delete(
  "/api/v1/pembeli/delete/:pembeliCode",
  verifyToken(["DPEMBELI"]),
  adupi.pembeli.deletePembeli
);

router.post(
  "/api/v1/maps/pembelian",
  adupi.map.getAllpembelian
);

router.post(
  "/api/v1/kunjunganmitrav2/tambah",
  adupi.validation.kunjunganmitra.addKunjunganmitraValidation,
  validate,
  adupi.kunjunganmitra.addKunjunganAbsen
);
router.get(
  "/api/v1/kunjunganmitra/view/:mitraCode/:tanggal" , 
  adupi.kunjunganmitra.viewKunjunganAbsen
)

router.post(
  "/api/v1/kunjunganmitraformv2/tambah",
  adupi.validation.kunjunganForm.addKunjunganformValidation,
  validate,
  adupi.kunjunganForm.addkunjunganForm
);
router.get(
  "/api/v1/kunjunganmitraform/view/:mitraCode/:tanggal" , 
  adupi.kunjunganForm.viewkunjunganForm
);
router.get(
  "/api/v1/kunjunganmitraimage/view/:mitraCode/:status" , 
  adupi.kunjunganForm.viewkunjunganimagev2
);

router.post(
  "/api/v1/report/allpembelian",
  adupi.export.reportpembeliansampah
);

router.post(
  "/api/v1/report/allpenjualan",
  adupi.export.reportpenjualansampah
);

router.post(
  "/api/v1/report/kunjunganmitraall",
  adupi.export.kunjunganmitraall
);
router.post(
  "/api/v1/alltarget",
  adupi.target.viewalltarget
);
router.post(
  "/api/v1/singletarget",
  adupi.target.viewsingle
);

router.post(
  "/api/v1/savetarget",
  adupi.target.savetarget
);

router.post(
  "/api/v1/getsinglemitra",
  adupi.target.getsinglemitra
);

router.post(
  "/api/v1/updatetarget",
  adupi.target.updatetarget
);


router.post(
  "/api/v1/viewtargetpermitra",
  adupi.target.viewtargetpermitra
);

router.post(
  "/api/v1/hapustarget",
  adupi.target.deletetarget
);


router.get(
  "/api/v1/lampiran/:MitraCode",
  adupi.target.lampiran
);

router.post(
  "/api/v1/savelampiran",
  adupi.target.lampiransave
);

router.post(
  "/api/v1/deletelampiran",
  adupi.target.lampirandelete
);

router.post(
  "/api/v1/qc/editmitra",
  verifyToken(["CROLEUSER"]),
  adupi.hasilqc.editMitra
);

router.post(
  "/api/v1/qc/editusaha",
  verifyToken(["CROLEUSER"]),
  adupi.hasilqc.editusaha
);

router.post(
  "/api/v1/qc/editnonkunjungan",
  verifyToken(["CROLEUSER"]),
  adupi.hasilqc.editnonmitra
);


router.post(
  "/api/v1/qc/editkunjunganmitra",
  verifyToken(["CROLEUSER"]),
  adupi.hasilqc.editkunjunganmitra
);



// role
router.get(
  "/api/v1/warna/all",
  verifyToken(["RROLE"]),
  adupi.warna.getAllwarna
);

router.get(
  "/api/v1/warna/one/:roleCode",
  verifyToken(["RROLE"]),
  managementUser.role.getOneRole
);

router.post(
  "/api/v1/warna/add",
  verifyToken(["CROLE"]),
  // managementUser.validation.role.addRoleValidation,
  // validate,
  adupi.warna.addwarna
);
router.put(
  "/api/v1/warna/edit/:roleCode",
  verifyToken(["UROLE"]),
  // managementUser.validation.role.editRoleValidation,
  // validate,
  adupi.warna.editwarna
);
router.delete(
  "/api/v1/warna/delete/:roleCode",
  verifyToken(["DROLE"]),
  adupi.warna.deletewarna
);


export default router;
