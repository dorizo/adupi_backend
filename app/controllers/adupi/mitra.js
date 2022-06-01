import { model } from "../../models/index.js";
import db from "../../config/database.js";
import bcrypt from "bcrypt";
import { QueryTypes } from "sequelize";

export const registerMitra = async (req, res, next) => {
  let transaction;
  try {
    transaction = await db.transaction();
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = await model.managementUser.user.create(
      {
        email: req.body.email,
        password: passwordHash,
        isActive: 0,
        status: "Public",
      },
      { transaction }
    );

    const mitra = await model.adupi.mitra.create(
      {
        nama: req.body.nama,
        nik: req.body.nik,
        ktp: req.body.ktp,
        noHp: req.body.noHp,
        jenisKelamin: req.body.jenisKelamin,
        wilayahCode: req.body.wilayahCode,
        jenisMitra: req.body.jenisMitra,
        tempatLahir: req.body.tempatLahir,
        tanggalLahir: req.body.tanggalLahir,
        alamat: req.body.alamat,
        userCode: user.userCode,
      },
      { transaction }
    );

    const usaha = await model.adupi.usaha.create(
      {
        mitraCode: mitra.mitraCode,
        namaUsaha: req.body.namaUsaha,
        foto: req.body.foto,
        noSuratIzinUsaha: req.body.noSuratIzinUsaha,
        luasGudang: req.body.luasGudang,
        lamaOperasional: req.body.lamaOperasional,
        jumlahPekerja: req.body.jumlahPekerja,
        luasGudang: req.body.luasGudang,
        statusKepemilikanGudang: req.body.statusKepemilikanGudang,
        wilayahCode: req.body.wilayahCodeUsaha,
        lang: req.body.lang,
        lat: req.body.lat,
        alamat: req.body.alamatUsaha,
      },
      { transaction }
    );

    const mesinData = req.body.mesin;
    let returnToInsert = [];
    mesinData.forEach((item) => {
      let tempMesin = {
        mitraCode: mitra.mitraCode,
        usahaCode: usaha.usahaCode,
        jenisMesin: item.jenisMesin,
        statusKepemilikanMesin: item.statusKepemilikanMesin,
        kapasitas: item.kapasitas,
        foto: item.foto,
      };
      returnToInsert.push(tempMesin);
    });
    const mesin = await model.adupi.mesin.bulkCreate(returnToInsert, {
      transaction,
    });

    await transaction.commit();
    return res.status(200).json({
      status: 200,
      message: "Berhasil melakukan registrasi",
    });
  } catch (err) {
    if (transaction) {
      await transaction.rollback();
      return res.status(400).json({
        status: 400,
        message: "Gagal melakukan registrasi",
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Gagal melakukan registrasi",
      });
    }
  }
};

export const detailSelf = async (req, res, next) => {
  try {
    let hasil;
    const mitra = await model.adupi.mitra.findOne({
      where: {
        userCode: req.userCode,
        deleteAt: null,
      },
    });
    if (!mitra) {
      return res.status(404).json({
        status: 404,
        message: "Anda tidak terdaftar sebagai mitra",
      });
    }
    const fasilitator = await model.adupi.fasilitator.findOne({
      where: {
        fasilitatorCode: mitra.fasilitatorCode,
        deleteAt: null,
      },
    });
    if (!fasilitator) {
      return res.status(404).json({
        status: 404,
        message: "Anda belum terverifikasi oleh fasilitator",
      });
    }
    const desa = await db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,8)=? AND CHAR_LENGTH(wilayahCode)=13 ORDER BY wilayah",
      {
        replacements: [mitra.wilayahCode],
        type: QueryTypes.SELECT,
      }
    );
    const kabupaten = await db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,2)=? AND CHAR_LENGTH(wilayahCode)=5 ORDER BY wilayah",
      {
        replacements: [req.params.wilayahCode],
        type: QueryTypes.SELECT,
      }
    );
    const kecamatan = await db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,5)=? AND CHAR_LENGTH(wilayahCode)=8 ORDER BY wilayah",
      {
        replacements: [req.params.wilayahCode],
        type: QueryTypes.SELECT,
      }
    );
    const provinsi = await db.query(
      "SELECT wilayahCode,wilayah FROM wilayah WHERE CHAR_LENGTH(wilayahCode)=2 ORDER BY wilayah",
      { type: QueryTypes.SELECT }
    );

    if (!desa || !kecamatan || !kabupaten || !provinsi) {
      return res.status(404).json({
        status: 404,
        message: "Wilayah tidak ditemukan",
      });
    }

    const usaha = await model.adupi.usaha.findAll({
      where: {
        mitraCode: mitra.mitraCode,
        deleteAt: null,
      },
      include: [
        {
          model: model.adupi.mesin,
          where: {
            deleteAt: null,
            mitraCode: mitra.mitraCode,
          },
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
        desa: desa.wilayah,
        kecamatan: kecamatan.wilayah,
        kabupaten: kabupaten.wilayah,
        provinsi: provinsi.wilayah,
      },
      jenisMitra: mitra.jenisMitra,
      tempatLahir: mitra.tempatLahir,
      tanggalLahir: mitra.tanggalLahir,
      alamat: mitra.alamat,
      fasilitator: fasilitator,
      gudang: usaha,
    };
    return res.status(200).json({
      status: 200,
      message: "",
      data: hasil,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Data anda tidak ditemukan",
    });
  }
};
