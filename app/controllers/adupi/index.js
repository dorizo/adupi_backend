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

import {
  getAllMitraReport,
  getDetailMitraReport,
  getJumlahMitraPerbulanPerkabupaten,
  getJumlahLuasGudangPerbulan,
  getJumlahPekerjaPerbulan,
  getPembelianSemuaMitraPerbulan,
  getPembelianPermitraPerbulan,
  getPenjualanPermitraPerbulan,
  getPenjualanSemuaMitraPerbulan,
  getPenjualanSemuaMitraPerbulanPerpabrik,
  getPenjualanPermitraPerbulanPerpabrik,
  getMasalahSemuaMitraPerbulanPerjenisPerstatus,
  getMasalahPermitraPerbulanPerjenisPerstatus,
  getPenjualanPerkategori,
  getPembelianPerkategori,
  getAnalisisPembelianDenganMitraPerbulan,
  getAnalisisPembelianDenganPekerjaPerbulan,
  getAnalisisPembelianDenganLuasGudangPerbulan,
  getNewPenjualanPerkategori,
  getNewPembelianPerkategori,
} from "./report.js";

import {
  getDocBeliSampah,
  getDocJualSampah,
  reportpembeliansampah,
  reportpenjualansampah,
  kunjunganmitraall,
} from "./export.js"

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
  addKunjunganimage,
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
  getAllMasalahstatus,
  getAllMasalahstatuscount,
} from "./masalah.js";

import {
  addBeliSampah,
  getBeliSampah,
  checkMitraOrNot as checkMitraOrNotBeliSampah,
} from "./beliSampah.js";
import { addJualSampah, getJualSampah } from "./jualSampah.js";

import {
  addPembeli,
  addPembeliJualSampah,
  getAllPembeli,
  getAllPembeliForPembelian,
  getOnePembeli,
  editPembeli,
  deletePembeli,
} from "./pembeli.js";

import {
  getAllAnggota as getAllAnggotaForDashboard,
  getAllAnggotaByWilayah,
  getDetailTransaksi,
} from "./dashboard.js";
import{getAllpembelian} from "./maps.js"
import{
addKunjunganAbsen , 
viewKunjunganAbsen,
addKunjunganAbsenupdate,
} from "./Kunjunganabsen.js";
import{addkunjunganForm , viewkunjunganForm , addkunjunganFormupdate , viewkunjunganimagev2} from "./Kunjunganform.js";
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
    addKunjunganimage,
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
  report: {
    getAllMitraReport,
    getDetailMitraReport,
    getJumlahMitraPerbulanPerkabupaten,
    getJumlahLuasGudangPerbulan,
    getJumlahPekerjaPerbulan,
    getPembelianSemuaMitraPerbulan,
    getPembelianPermitraPerbulan,
    getPenjualanPermitraPerbulan,
    getPenjualanSemuaMitraPerbulan,
    getPenjualanSemuaMitraPerbulanPerpabrik,
    getPenjualanPermitraPerbulanPerpabrik,
    getMasalahSemuaMitraPerbulanPerjenisPerstatus,
    getMasalahPermitraPerbulanPerjenisPerstatus,
    getPenjualanPerkategori,
    getPembelianPerkategori,
    getAnalisisPembelianDenganMitraPerbulan,
    getAnalisisPembelianDenganPekerjaPerbulan,
    getAnalisisPembelianDenganLuasGudangPerbulan,
    getNewPenjualanPerkategori,
    getNewPembelianPerkategori,
  },
  export: {
    getDocBeliSampah,
    getDocJualSampah,
    reportpembeliansampah,
    reportpenjualansampah,
    kunjunganmitraall,
  },
  masalah: {
    getAllMasalah,
    getOneMasalah,
    addMasalah,
    editMasalah,
    deleteMasalah,
    updateStatusMasalah,
    getAllMasalahstatus,
    getAllMasalahstatuscount
  },

  pembeli: {
    addPembeli,
    addPembeliJualSampah,
    getAllPembeli,
    getAllPembeliForPembelian,
    getOnePembeli,
    editPembeli,
    deletePembeli,
  },
  map : {
    getAllpembelian
  },
  kunjunganmitra :{
    addKunjunganAbsen ,
    viewKunjunganAbsen ,
    addKunjunganAbsenupdate,
  },
  kunjunganForm :{
    addkunjunganForm ,
    viewkunjunganForm ,
    addkunjunganFormupdate,
    viewkunjunganimagev2,
  },
  validation: validation,
};
