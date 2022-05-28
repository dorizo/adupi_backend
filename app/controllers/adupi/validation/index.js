import { registrasiMitraValidation } from "./mitra/registrasiMitra.js";
import { addFasilitatorValidation } from "./fasilitator/add.js";
import { editFasilitatorValidation } from "./fasilitator/edit.js";

export const validation = {
    mitra: {
        registrasiMitraValidation,
    },
    fasilitator:{
        addFasilitatorValidation,
        editFasilitatorValidation,
    }
};