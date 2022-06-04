import {
  registrasiMitraValidation,
  checkEmailValidation,
  checkNIKValidation,
  checkNoHPValidation,
} from "./mitra/registrasiMitra.js";
import { addMitraByFasilitatorValidation } from "./mitra/addMitraByFasilitator.js";
import { addFasilitatorValidation } from "./fasilitator/add.js";
import { editFasilitatorValidation } from "./fasilitator/edit.js";
import { addAnggotaValidation } from "./anggota/add.js";
import { editAnggotaValidation } from "./anggota/edit.js";
import { addMesinValidation } from "./mesin/add.js";
import { editMesinValidation } from "./mesin/edit.js";


import { activeAccountMitraValidation } from "./mitra/activeAccountMitra.js";

export const validation = {
  mitra: {
    registrasiMitraValidation,
    addMitraByFasilitatorValidation,
    checkEmailValidation,
    checkNIKValidation,
    checkNoHPValidation,
    activeAccountMitraValidation
  },
  mesin: {
    addMesinValidation,
    editMesinValidation,
  },
  anggota: {
    addAnggotaValidation,
    editAnggotaValidation,
  },
  fasilitator: {
    addFasilitatorValidation,
    editFasilitatorValidation,
  },
};
