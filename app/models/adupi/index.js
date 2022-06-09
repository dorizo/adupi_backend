import { master } from "./master/index.js";
import { mitra } from "./mitra.js";
import { fasilitator } from "./fasilitator.js";
import { usaha } from "./usaha.js";
import { mesin } from "./mesin.js";
import { anggota } from "./anggota.js";
import { masalah } from "./masalah.js";
import { beliSampah } from "./beliSampah.js";
import { detailBeliSampah } from "./detailBeliSampah.js";

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


mitra.hasMany(masalah ,{
  foreignKey: "mitraCode",
});
masalah.belongsTo(mitra, {
  foreignKey: "mitraCode",
});

beliSampah.hasMany(detailBeliSampah ,{
  foreignKey: "bsCode",
});
detailBeliSampah.belongsTo(beliSampah, {
  foreignKey: "bsCode",
});

(master.jenisSampah).hasMany(detailBeliSampah ,{
  foreignKey: "jsCode",
});
detailBeliSampah.belongsTo((master.jenisSampah), {
  foreignKey: "jsCode",
});



export const adupi = {
  master: master,
  mitra: mitra,
  anggota: anggota,
  usaha: usaha,
  mesin: mesin,
  fasilitator: fasilitator,
  masalah: masalah,
  beliSampah: beliSampah,
  detailBeliSampah: detailBeliSampah
};
