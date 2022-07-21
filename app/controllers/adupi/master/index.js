import {
  getAllJenisSampah,
  getOneJenisSampah,
  addJenisSampah,
  editJenisSampah,
  deleteJenisSampah,
} from "./jenisSampah.js";
import {
  getAllKategoriSampah,
  getOneKategoriSampah,
  addKategoriSampah,
  editKategoriSampah,
  deleteKategoriSampah,
} from "./kategoriSampah.js";
import { validation } from "./validation/index.js";

export const master = {
  jenisSampah: {
    getAllJenisSampah,
    getOneJenisSampah,
    addJenisSampah,
    editJenisSampah,
    deleteJenisSampah,
    validation: validation,
  },
  kategoriSampah: {
    getAllKategoriSampah,
    getOneKategoriSampah,
    addKategoriSampah,
    editKategoriSampah,
    deleteKategoriSampah,
    validation: validation,
  },
};
