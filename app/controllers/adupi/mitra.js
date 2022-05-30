import { model } from "../../models/index.js";
import db from "../../config/database.js";
import bcrypt from "bcrypt";

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

