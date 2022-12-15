import { master } from "./master/index.js";
import { mitra } from "./mitra.js";
import { fasilitator } from "./fasilitator.js";
import { usaha } from "./usaha.js";
import { mesin } from "./mesin.js";
import { anggota } from "./anggota.js";
import { masalah } from "./masalah.js";
import { beliSampah } from "./beliSampah.js";
import { detailBeliSampah } from "./detailBeliSampah.js";
import { pembeli } from "./pembeli.js";
import { warna } from "./warna.js";
import { jualSampah } from "./jualSampah.js";
import { detailJualSampah } from "./detailJualSampah.js";
import { kunjungan } from "./kunjungan.js";
import kunjunganimage from "./Kunjunganimage.js";
import { kunjunganAbsen } from "./KunjunganAbsen.js";
import { kunjunganForm } from "./kunjunganForm.js";
import wilayah from "./wilayah.js";

mitra.hasMany(usaha ,{
  foreignKey: "mitraCode",
});
usaha.belongsTo(mitra, {
  foreignKey: "mitraCode",
});

mitra.hasMany(wilayah ,{
  foreignKey: "wilayahCode",
});

// wilayah.belongsTo(mitra, {
//   foreignKey: "wilayahCode",
// });
mitra.hasMany(wilayah ,  { as: 'kabupaten', foreignKey: 'wilayahCode' })
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

anggota.hasMany(beliSampah ,{
  foreignKey: "anggotaCode",
});

beliSampah.belongsTo(anggota ,{
  foreignKey: "anggotaCode",
});

mitra.hasMany(beliSampah ,{
  foreignKey: "mitraCode",
});

beliSampah.belongsTo(mitra ,{
  foreignKey: "mitraCode",
});

mitra.hasMany(jualSampah ,{
  foreignKey: "mitraCode",
});

jualSampah.belongsTo(mitra ,{
  foreignKey: "mitraCode",
});

pembeli.hasMany(jualSampah ,{
  foreignKey: "pembeliCode",
});

jualSampah.belongsTo(pembeli ,{
  foreignKey: "pembeliCode",
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

jualSampah.hasMany(detailJualSampah ,{
  foreignKey: "jsCode",
});
detailJualSampah.belongsTo(jualSampah, {
  foreignKey: "jsCode",
});

pembeli.hasMany(jualSampah ,{
  foreignKey: "pembeliCode",
});
jualSampah.belongsTo(pembeli, {
  foreignKey: "pembeliCode",
});

(master.jenisSampah).hasMany(detailJualSampah ,{
  foreignKey: "jenisCode",
});
detailJualSampah.belongsTo((master.jenisSampah), {
  foreignKey: "jsCode",
});

fasilitator.hasMany(kunjungan ,{
  foreignKey: "fasilitatorCode",
});

kunjungan.belongsTo(fasilitator ,{
  foreignKey: "fasilitatorCode",
});

mitra.hasMany(kunjungan ,{
  foreignKey: "mitraCode",
});

kunjungan.belongsTo(mitra ,{
  foreignKey: "mitraCode",
});

(master.kategoriSampah).hasMany((master.jenisSampah) ,{
  foreignKey: "ksCode",
});
(master.jenisSampah).belongsTo((master.kategoriSampah), {
  foreignKey: "ksCode",
});


export const adupi = {
  master: master,
  mitra: mitra,
  anggota: anggota,
  wilayah : wilayah,
  usaha: usaha,
  mesin: mesin,
  fasilitator: fasilitator,
  masalah: masalah,
  beliSampah: beliSampah,
  detailBeliSampah: detailBeliSampah,
  jualSampah: jualSampah,
  pembeli: pembeli,
  warna:warna,
  detailJualSampah: detailJualSampah,
  kunjungan:kunjungan,
  kunjunganimage : kunjunganimage,
  kunjunganAbsen : kunjunganAbsen,
  kunjunganForm : kunjunganForm,
};
