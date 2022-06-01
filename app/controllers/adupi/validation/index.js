import { registrasiMitraValidation } from "./mitra/registrasiMitra.js";
import { addFasilitatorValidation } from "./fasilitator/add.js";
import { editFasilitatorValidation } from "./fasilitator/edit.js";
import { addAnggotaValidation } from "./anggota/add.js";
import { editAnggotaValidation } from "./anggota/edit.js";

export const validation = {
    mitra: {
        registrasiMitraValidation,
    },
    anggota: {
        addAnggotaValidation,
        editAnggotaValidation,
    },
    fasilitator:{
        addFasilitatorValidation,
        editFasilitatorValidation,
    }
};