import {
  registrasiMitraValidation,
  checkEmailValidation,
  checkNIKValidation,
  checkNoHPValidation,
} from "./mitra/registrasiMitra.js";
import { addMitraByFasilitatorValidation } from "./mitra/addMitraByFasilitator.js";
import { addFasilitatorValidation } from "./fasilitator/add.js";
import { editFasilitatorValidation } from "./fasilitator/edit.js";
import { verifAnggotaValidation } from "./anggota/verified.js";
import { addAnggotaValidation } from "./anggota/add.js";
import { editAnggotaValidation } from "./anggota/edit.js";
import { addMesinValidation } from "./mesin/add.js";
import { editMesinValidation } from "./mesin/edit.js";

import { addBeliSampahValidation } from "./beliSampah/add.js";
import { addJualSampahValidation } from "./jualSampah/add.js";

import { addMasalahValidation } from "./masalah/add.js";
import { editMasalahValidation } from "./masalah/edit.js";

import { activeAccountMitraValidation } from "./mitra/activeAccountMitra.js";

import { addKunjunganValidation } from "./kunjungan/add.js";
import { editKunjunganValidation } from "./kunjungan/edit.js";

import { addPembeliOnJualSampahValidation } from "./pembeli/addPembeliOnJualSampah.js";
import { addPembeliValidation } from "./pembeli/add.js";
import { editPembeliValidation } from "./pembeli/edit.js";
import {addKunjunganmitraValidation} from "./kunjunganmitra/add.js"
import {addKunjunganformValidation} from "./kunjunganform/add.js"
import{addfotoValidationimage} from "./kunjunganimage/add.js"

export const validation = {
  mitra: {
    registrasiMitraValidation,
    addMitraByFasilitatorValidation,
    checkEmailValidation,
    checkNIKValidation,
    checkNoHPValidation,
    activeAccountMitraValidation,
  },
  mesin: {
    addMesinValidation,
    editMesinValidation,
  },
  masalah: {
    addMasalahValidation,
    editMasalahValidation,
  },
  anggota: {
    addAnggotaValidation,
    editAnggotaValidation,
    verifAnggotaValidation,
  },
  fasilitator: {
    addFasilitatorValidation,
    editFasilitatorValidation,
  },
  beliSampah: {
    addBeliSampahValidation,
  },
  jualSampah: {
    addJualSampahValidation,
  },
  kunjungan: {
    addKunjunganValidation,
    editKunjunganValidation,
    addfotoValidationimage
  },
  pembeli: {
    addPembeliOnJualSampahValidation,
    addPembeliValidation,
    editPembeliValidation,
  },
  kunjunganmitra : {
    addKunjunganmitraValidation
  },
  kunjunganForm : {
    addKunjunganformValidation
  }
};
