import { master } from "./master/index.js";
import {
  registerMitra,
  checkEmail,
  checkNIK,
  checkNoHP,
  detailSelf,
  getAllMitraByFasilitator,
  getDetailMitraByFasilitator,
  addMitraByFasilitator,
  deleteMitraByFasilitator,
  getAllMitraVerified,
  getDetailMitraVerified,
  activeAccountMitra,
} from "./mitra.js";
import { validation } from "./validation/index.js";
import {
  getAllFasilitator,
  getOneFasilitator,
  addFasilitator,
  editFasilitator,
  deleteFasilitator,
  getUserForAddFasilitator,
  getUserForEditFasilitator,
  getMitraNotYetVerifByFasilitator,
  verifMitraByFasilitator,
} from "./fasilitator.js";

import { getAllMitraReport, getDetailMitraReport } from "./report.js";

import {
  checkMitraOrNot,
  getAllAnggota,
  getOneAnggota,
  addAnggota,
  editAnggota,
  deleteAnggota,
  verifAnggota,
} from "./anggota.js";

import {
  checkFasilitatorOrNot,
  checkFasilitatorOrNotForAll,
  getAllKunjungan,
  getOneKunjungan,
  addKunjungan,
  editKunjungan,
  deleteKunjungan,
} from "./kunjungan.js";

import {
  getAllMesin,
  getOneMesin,
  addMesin,
  editMesin,
  deleteMesin,
} from "./mesin.js";

import {
  getAllMasalah,
  getOneMasalah,
  addMasalah,
  editMasalah,
  deleteMasalah,
  updateStatusMasalah,
} from "./masalah.js";

import {
  addBeliSampah,
  getBeliSampah,
  checkMitraOrNot as checkMitraOrNotBeliSampah,
} from "./beliSampah.js";
import { addJualSampah, getJualSampah } from "./jualSampah.js";

import {
  getAllAnggota as getAllAnggotaForDashboard,
  getAllAnggotaByWilayah,
  getDetailTransaksi,
} from "./dashboard.js";

export const adupi = {
  dashboard: {
    getAllAnggotaForDashboard,
    getAllAnggotaByWilayah,
    getDetailTransaksi,
  },
  master: master,
  mitra: {
    registerMitra,
    checkEmail,
    checkNIK,
    checkNoHP,
    detailSelf,
    getAllMitraByFasilitator,
    getDetailMitraByFasilitator,
    addMitraByFasilitator,
    deleteMitraByFasilitator,
    getAllMitraVerified,
    getDetailMitraVerified,
    activeAccountMitra,
  },
  anggota: {
    checkMitraOrNot,
    getAllAnggota,
    getOneAnggota,
    addAnggota,
    editAnggota,
    deleteAnggota,
    verifAnggota,
  },
  kunjungan: {
    checkFasilitatorOrNot,
    checkFasilitatorOrNotForAll,
    getAllKunjungan,
    getOneKunjungan,
    addKunjungan,
    editKunjungan,
    deleteKunjungan,
  },
  mesin: {
    getAllMesin,
    getOneMesin,
    addMesin,
    editMesin,
    deleteMesin,
  },
  beliSampah: {
    checkMitraOrNotBeliSampah,
    getBeliSampah,
    addBeliSampah,
  },
  jualSampah: {
    getJualSampah,
    addJualSampah,
  },
  fasilitator: {
    getAllFasilitator,
    getOneFasilitator,
    getUserForAddFasilitator,
    addFasilitator,
    getUserForEditFasilitator,
    editFasilitator,
    deleteFasilitator,
    getMitraNotYetVerifByFasilitator,
    verifMitraByFasilitator,
  },
  report: { getAllMitraReport, getDetailMitraReport },
  masalah: {
    getAllMasalah,
    getOneMasalah,
    addMasalah,
    editMasalah,
    deleteMasalah,
    updateStatusMasalah,
  },
  validation: validation,
};
