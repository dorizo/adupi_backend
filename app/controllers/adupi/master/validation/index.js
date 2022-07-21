import { addJenisSampahValidation } from "./jenisSampah/add.js";
import { editJenisSampahValidation } from "./jenisSampah/edit.js";

import { addKategoriSampahValidation } from "./kategoriSampah/add.js";
import { editKategoriSampahValidation } from "./kategoriSampah/edit.js";

export const validation = {
    jenisSampah: {
        addJenisSampahValidation,
        editJenisSampahValidation,
    },
    kategoriSampah: {
        addKategoriSampahValidation,
        editKategoriSampahValidation,
    }
};