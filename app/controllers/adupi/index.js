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
  activeAccountMitra
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

import {
  checkMitraOrNot,
  getAllAnggota,
  getOneAnggota,
  addAnggota,
  editAnggota,
  deleteAnggota,
} from "./anggota.js";

import {
  getAllMesin,
  getOneMesin,
  addMesin,
  editMesin,
  deleteMesin,
} from "./mesin.js";

export const adupi = {
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
    activeAccountMitra
  },
  anggota: {
    checkMitraOrNot,
    getAllAnggota,
    getOneAnggota,
    addAnggota,
    editAnggota,
    deleteAnggota,
  },
  mesin: {
    getAllMesin,
    getOneMesin,
    addMesin,
    editMesin,
    deleteMesin,
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
  validation: validation,
};
