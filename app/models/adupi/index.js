import { master } from "./master/index.js";
import { mitra } from "./mitra.js";
import { fasilitator } from "./fasilitator.js";
import { usaha } from "./usaha.js";
import { mesin } from "./mesin.js";
import { anggota } from "./anggota.js";

mitra.hasMany(usaha ,{
  foreignKey: "mitraCode",
});
usaha.belongsTo(mitra, {
  foreignKey: "mitraCode",
});

mitra.hasMany(mesin ,{
  foreignKey: "mitraCode",
});
mesin.belongsTo(mitra, {
  foreignKey: "mitraCode",
});

usaha.hasMany(mesin ,{
  foreignKey: "usahaCode",
});
mesin.belongsTo(usaha, {
  foreignKey: "usahaCode",
});


mitra.hasMany(anggota ,{
  foreignKey: "mitraCode",
});
anggota.belongsTo(mitra, {
  foreignKey: "mitraCode",
});



export const adupi = {
  master: master,
  mitra: mitra,
  anggota: anggota,
  usaha: usaha,
  mesin: mesin,
  fasilitator: fasilitator,
};
