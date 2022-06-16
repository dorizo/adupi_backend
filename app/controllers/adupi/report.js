import { model } from "../../models/index.js";
import db from "../../config/database.js";
import bcrypt from "bcrypt";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize";
const op = Sequelize.Op;

export const getAllMitraReport = async (req, res, next) => {
  try {
    let conditionDate;
    let literalMesin;
    let literalMasalahSelesai;
    let literalMasalahProses;
    let literalJualSampah;
    let literalBeliSampah;
    if (req.params.startDate == null || req.params.endDate == null) {
      conditionDate = {
        deleteAt: null,
      };
      literalMesin =
        "SELECT count(`mesin`.`mesinCode`) FROM `mesin` AS `mesin` WHERE `mesin`.`mitraCode` = `mitra`.`mitraCode` AND `mesin`.`deleteAt` IS NULL";
      literalMasalahSelesai =
        "SELECT count(`masalah`.`masalahCode`) FROM `masalah` AS `masalah` WHERE `masalah`.`mitraCode` = `mitra`.`mitraCode` AND `masalah`.`status` = 'Selesai' AND `masalah`.`deleteAt` IS NULL";
      literalMasalahProses =
        "SELECT count(`masalah`.`masalahCode`) FROM `masalah` AS `masalah` WHERE `masalah`.`mitraCode` = `mitra`.`mitraCode` AND `masalah`.`status` = 'Dalam peninjauan' AND `masalah`.`deleteAt` IS NULL";
      literalJualSampah =
        "SELECT count(`jual_sampah`.`jsCode`) FROM `jual_sampah` AS `jual_sampah` WHERE `jual_sampah`.`mitraCode` = `mitra`.`mitraCode` AND `jual_sampah`.`deleteAt` IS NULL";
      literalBeliSampah =
        "SELECT count(`beli_sampah`.`bsCode`) FROM `beli_sampah` AS `beli_sampah` WHERE `beli_sampah`.`mitraCode` = `mitra`.`mitraCode` AND `beli_sampah`.`deleteAt` IS NULL";
    } else {
      conditionDate = {
        createAt: {
          [op.between]: [req.params.startDate, req.params.endDate],
        },
        deleteAt: null,
      };
      literalMesin =
        "SELECT count(*) FROM `mesin` AS `mesin` WHERE `mesin`.`mitraCode` = `mitra`.`mitraCode` AND `mesin`.`createAt` BETWEEN ('" +
        req.params.startDate +
        "' AND '" +
        req.params.endDate +
        "') AND `mesin`.`deleteAt` IS NULL";
      literalMasalahSelesai =
        "SELECT count(*) FROM `masalah` AS `masalah` WHERE `masalah`.`mitraCode` = `mitra`.`mitraCode` AND `masalah`.`status` = 'Selesai' AND `masalah`.`createAt` BETWEEN ('" +
        req.params.startDate +
        "' AND '" +
        req.params.endDate +
        "') AND `masalah`.`deleteAt` IS NULL";
      literalMasalahProses =
        "SELECT count(*) FROM `masalah` AS `masalah` WHERE `masalah`.`mitraCode` = `mitra`.`mitraCode` AND `masalah`.`status` = 'Dalam peninjauan' AND `masalah`.`createAt` BETWEEN ('" +
        req.params.startDate +
        "' AND '" +
        req.params.endDate +
        "') AND `masalah`.`deleteAt` IS NULL";
      literalJualSampah =
        "SELECT count(*) FROM `jual_sampah` AS `jual_sampah` WHERE `jual_sampah`.`mitraCode` = `mitra`.`mitraCode` AND `jual_sampah`.`createAt` BETWEEN ('" +
        req.params.startDate +
        "' AND '" +
        req.params.endDate +
        "') AND `jual_sampah`.`deleteAt` IS NULL";
      literalBeliSampah =
        "SELECT count(*) FROM `beli_sampah` AS `beli_sampah` WHERE `beli_sampah`.`mitraCode` = `mitra`.`mitraCode` AND `beli_sampah`.`createAt` BETWEEN ('" +
        req.params.startDate +
        "' AND '" +
        req.params.endDate +
        "') AND `beli_sampah`.`deleteAt` IS NULL";
    }

    const mitra = await model.adupi.mitra.findAll({
      attributes: [
        "mitraCode",
        "nama",
        "nik",
        "noHp",
        "jenisKelamin",
        "wilayahCode",
        "jenisMitra",
        "tempatLahir",
        "tanggalLahir",
        "alamat",
        "fasilitatorCode",
        "userCode",
        [db.literal("(" + literalMesin + ")"), "totalMesin"],
        [db.literal("(" + literalMasalahSelesai + ")"), "totalMasalahSelesai"],
        [db.literal("(" + literalMasalahProses + ")"), "totalMasalahProses"],
        [db.literal("(" + literalJualSampah + ")"), "totalJualSampah"],
        [db.literal("(" + literalBeliSampah + ")"), "totalBeliSampah"],
      ],
      where: {
        [op.and]: [
          {
            fasilitatorCode: {
              [op.ne]: null,
            },
          },
          {
            deleteAt: null,
          },
        ],
      },
      include: [
        {
          model: model.managementUser.user,
          attributes: ["userCode", "email"],
          where: {
            isActive: "1",
            status: "Public",
            deleteAt: null,
          },
        },
      ],
    });
    return res.status(200).json({
      status: 200,
      message: "Data mitra ditemukan",
      data: mitra,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Data mitra tidak ditemukan",
    });
  }
};

export const getDetailMitraReport = async (req, res, next) => {
  try {
    let hasil;
    let conditionDate;
    if (req.params.startDate == null || req.params.endDate == null) {
      conditionDate = {
        deleteAt: null,
      };
    } else {
      conditionDate = {
        createAt: {
          [op.between]: [req.params.startDate, req.params.endDate],
        },
        deleteAt: null,
      };
    }
    const mitra = await model.adupi.mitra.findOne({
      where: {
        [op.and]: [
          {
            fasilitatorCode: {
              [op.ne]: null,
            },
          },
          {
            deleteAt: null,
          },
        ],
        mitraCode: req.params.mitraCode,
        deleteAt: null,
      },
      include: [
        {
          model: model.managementUser.user,
          where: {
            isActive: "1",
            status: "Public",
            deleteAt: null,
          },
        },
      ],
    });
    if (!mitra) {
      return res.status(404).json({
        status: 404,
        message: "Data mitra tidak ditemukan",
      });
    }
    const desa = await db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,13)=? AND CHAR_LENGTH(wilayahCode)=13 LIMIT 1",
      {
        replacements: [mitra.wilayahCode],
        type: QueryTypes.SELECT,
      }
    );
    const kabupaten = await db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,5)=? AND CHAR_LENGTH(wilayahCode)=5 LIMIT 1",
      {
        replacements: [mitra.wilayahCode.substr(0, 5)],
        type: QueryTypes.SELECT,
      }
    );
    const kecamatan = await db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,8)=? AND CHAR_LENGTH(wilayahCode)=8 LIMIT 1",
      {
        replacements: [mitra.wilayahCode.substr(0, 8)],
        type: QueryTypes.SELECT,
      }
    );
    const provinsi = await db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,2)=? AND CHAR_LENGTH(wilayahCode)=2 LIMIT 1",
      {
        replacements: [mitra.wilayahCode.substr(0, 2)],
        type: QueryTypes.SELECT,
      }
    );

    if (!desa || !kecamatan || !kabupaten || !provinsi) {
      return res.status(404).json({
        status: 404,
        message: "Wilayah tidak ditemukan",
      });
    }

    let whereMesin = {
      deleteAt: null,
      mitraCode: mitra.mitraCode,
    };
    const usaha = await model.adupi.usaha.findAll({
      where: {
        mitraCode: mitra.mitraCode,
        deleteAt: null,
      },
      include: [
        {
          model: model.adupi.mesin,
          where: whereMesin,
        },
      ],
    });

    let whereFasilitator = {
      deleteAt: null,
      fasilitatorCode: mitra.fasilitatorCode,
    };
    const fasilitator = await model.adupi.fasilitator.findOne({
      where: whereFasilitator,
    });
    let whereUser = {
      deleteAt: null,
      userCode: mitra.userCode,
    };
    const user = await model.managementUser.user.findOne({
      attributes: ["userCode", "email"],
      where: whereUser,
    });
    let whereAnggota = {
      deleteAt: null,
      mitraCode: mitra.mitraCode,
    };
    const anggota = await model.adupi.anggota.findAll({
      where: whereAnggota,
    });
    let whereMasalah = {
      ...conditionDate,
      deleteAt: null,
      mitraCode: mitra.mitraCode,
    };
    const masalah = await model.adupi.masalah.findAll({
      where: whereMasalah,
    });
    let whereBeliSampah = {
      ...conditionDate,
      deleteAt: null,
      mitraCode: mitra.mitraCode,
    };
    const beliSampah = await model.adupi.beliSampah.findAll({
      where: whereBeliSampah,
      include: [
        {
          model: model.adupi.detailBeliSampah,
          where: {
            deleteAt: null,
          },
          include: [
            {
              model: model.adupi.master.jenisSampah,
            },
          ],
        },
      ],
    });
    let whereJualSampah = {
      ...conditionDate,
      deleteAt: null,
      mitraCode: mitra.mitraCode,
    };
    const jualSampah = await model.adupi.jualSampah.findAll({
      where: whereJualSampah,
      include: [
        {
          model: model.adupi.detailJualSampah,
          where: {
            deleteAt: null,
          },
          include: [
            {
              model: model.adupi.master.jenisSampah,
            },
          ],
        },
      ],
    });
    hasil = {
      mitraCode: mitra.mitraCode,
      nama: mitra.nama,
      nik: mitra.nik,
      ktp: mitra.ktp,
      noHp: mitra.noHp,
      jenisKelamin: mitra.jenisKelamin,
      wilayahCode: mitra.wilayahCode,
      wilayah: {
        desa: desa[0],
        kecamatan: kecamatan[0],
        kabupaten: kabupaten[0],
        provinsi: provinsi[0],
      },
      jenisMitra: mitra.jenisMitra,
      tempatLahir: mitra.tempatLahir,
      tanggalLahir: mitra.tanggalLahir,
      alamat: mitra.alamat,
      fasilitator: fasilitator,
      user: user,
      gudang: usaha,
      anggota: anggota,
      masalah: masalah,
      transaksi: {
        beliSampah: beliSampah,
        jualSampah: jualSampah,
      },
    };
    return res.status(200).json({
      status: 200,
      message: "",
      data: hasil,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Data mitra tidak ditemukan",
    });
  }
};
