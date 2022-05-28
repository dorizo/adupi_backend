import { getAllProvinsi } from "./provinsi.js";
import { getAllKabupaten } from "./kabupaten.js";
import { getAllKecamatan } from "./kecamatan.js";
import { getAllDesa } from "./desa.js";

export const wilayah = {
  provinsi: {
    getAllProvinsi,
  },
  kabupaten: {
    getAllKabupaten,
  },
  kecamatan: {
    getAllKecamatan,
  },
  desa: {
    getAllDesa,
  },
};
