import { model } from "../../models/index.js";
import db from "../../config/database.js";
import bcrypt from "bcrypt";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize";
const op = Sequelize.Op;
import { saveImage } from "../../utils/saveImage.js";

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

    const uploadKTP = await saveImage({
      imageBase64: req.body.ktp.replace(/^data:image\/\w+;base64,/, ""),
      extImage: req.body.ktp.split(";")[0].split("/")[1],
      nameImage: req.body.nik + "_ktp",
      dir: "mitra",
    });

    let urlKTP;
    if (uploadKTP.status == false) {
      if (transaction) {
        await transaction.rollback();
        return res.status(400).json({
          status: 400,
          message: "Gagal melakukan registrasi, foto KTP gagal di upload",
        });
      }
    } else {
      urlKTP = uploadKTP.url;
    }

    const mitra = await model.adupi.mitra.create(
      {
        nama: req.body.nama,
        nik: req.body.nik,
        ktp: urlKTP,
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

    const uploadFoto = await saveImage({
      imageBase64: req.body.foto.replace(/^data:image\/\w+;base64,/, ""),
      extImage: req.body.foto.split(";")[0].split("/")[1],
      nameImage: req.body.nik + "_gudang",
      dir: "gudang",
    });

    let urlFoto;
    if (uploadFoto.status == false) {
      if (transaction) {
        await transaction.rollback();
        return res.status(400).json({
          status: 400,
          message: "Gagal melakukan registrasi, Foto gudang gagal di upload",
        });
      }
    } else {
      urlFoto = uploadFoto.url;
    }

    const usaha = await model.adupi.usaha.create(
      {
        mitraCode: mitra.mitraCode,
        namaUsaha: req.body.namaUsaha,
        foto: urlFoto,
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
    await mesinData.forEach(async (item) => {
      let uploadFotoMesin = await saveImage({
        imageBase64: item.foto.replace(/^data:image\/\w+;base64,/, ""),
        extImage: item.foto.split(";")[0].split("/")[1],
        nameImage: "foto_" + mitra.mitraCode + "_" + usaha.usahaCode + "_mesin",
        dir: "mesin",
      });

      if (uploadFotoMesin.status == false) {
        if (transaction) {
          transaction.rollback();
          return res.status(400).json({
            status: 400,
            message: "Gagal melakukan registrasi, Foto mesin gagal di upload",
          });
        }
      } else {
        let tempMesin = {
          mitraCode: mitra.mitraCode,
          usahaCode: usaha.usahaCode,
          jenisMesin: item.jenisMesin,
          statusKepemilikanMesin: item.statusKepemilikanMesin,
          kapasitas: item.kapasitas,
          foto: uploadFotoMesin.url,
        };
        returnToInsert.push(tempMesin);
      }
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

export const checkNIK = async (req, res, next) => {
  try {
    const mitra = await model.adupi.mitra.findOne({
      where: {
        nik: req.body.nik,
        deleteAt: null,
      },
    });
    if (mitra) {
      return res.status(400).json({
        status: 400,
        message: "NIK telah terpakai",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "NIK belum terpakai",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "NIK telah terpakai",
    });
  }
};

export const checkEmail = async (req, res, next) => {
  try {
    const mitra = await model.managementUser.user.findOne({
      where: {
        email: req.body.email,
        deleteAt: null,
      },
    });
    if (mitra) {
      return res.status(400).json({
        status: 400,
        message: "Email telah terpakai",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Email belum terpakai",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "Email telah terpakai",
    });
  }
};

export const checkNoHP = async (req, res, next) => {
  try {
    const mitra = await model.adupi.mitra.findOne({
      where: {
        noHp: req.body.noHp,
        deleteAt: null,
      },
    });
    if (mitra) {
      return res.status(400).json({
        status: 400,
        message: "No HP telah terpakai",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "No HP belum terpakai",
    });
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: "No HP telah terpakai",
    });
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
          required: false
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

export const getAllMitraByFasilitator = async (req, res, next) => {
  try {
    const fasilitator = await model.adupi.fasilitator.findOne({
      where: {
        userCode: req.userCode,
        deleteAt: null,
      },
    });
    if (!fasilitator) {
      return res.status(404).json({
        status: 404,
        message: "Anda tidak terdaftar sebagai fasilitator",
      });
    }
    const mitra = await model.adupi.mitra.findAll({
      where: {
        fasilitatorCode: fasilitator.fasilitatorCode,
        deleteAt: null,
      },
    });
    return res.status(200).json({
      status: 200,
      message: "Mitra ditemukan",
      data: mitra,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Mitra tidak ditemukan",
    });
  }
};

export const getDetailMitraByFasilitator = async (req, res, next) => {
  try {
    let hasil;
    const fasilitator = await model.adupi.fasilitator.findOne({
      where: {
        userCode: req.userCode,
        deleteAt: null,
      },
    });
    if (!fasilitator) {
      return res.status(404).json({
        status: 404,
        message: "Anda tidak terdaftar sebagai fasilitator",
      });
    }
    const mitra = await model.adupi.mitra.findOne({
      where: {
        fasilitatorCode: fasilitator.fasilitatorCode,
        mitraCode: req.params.mitraCode,
        deleteAt: null,
      },
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
          required: false
        },
      ],
    });
    const anggota = await model.adupi.anggota.findAll({
      where: {
        mitraCode: mitra.mitraCode,
        deleteAt: null,
      },
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
      gudang: usaha,
      anggota: anggota,
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

export const addMitraByFasilitator = async (req, res, next) => {
  let transaction;
  transaction = await db.transaction();
  try {
    const fasilitator = await model.adupi.fasilitator.findOne({
      where: {
        userCode: req.userCode,
        deleteAt: null,
      },
    });
    if (!fasilitator) {
      return res.status(404).json({
        status: 404,
        message: "Anda tidak terdaftar sebagai fasilitator",
      });
    }

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
    const uploadKTP = await saveImage({
      imageBase64: req.body.ktp.replace(/^data:image\/\w+;base64,/, ""),
      extImage: req.body.ktp.split(";")[0].split("/")[1],
      nameImage: req.body.nik + "_ktp",
      dir: "mitra",
    });

    let urlKTP;
    if (uploadKTP.status == false) {
      if (transaction) {
        await transaction.rollback();
        return res.status(400).json({
          status: 400,
          message: "Gagal melakukan registrasi, foto KTP gagal di upload",
        });
      }
    } else {
      urlKTP = uploadKTP.url;
    }
    const mitra = await model.adupi.mitra.create(
      {
        nama: req.body.nama,
        nik: req.body.nik,
        ktp: urlKTP,
        noHp: req.body.noHp,
        jenisKelamin: req.body.jenisKelamin,
        wilayahCode: req.body.wilayahCode,
        jenisMitra: req.body.jenisMitra,
        tempatLahir: req.body.tempatLahir,
        tanggalLahir: req.body.tanggalLahir,
        alamat: req.body.alamat,
        userCode: user.userCode,
        fasilitatorCode: fasilitator.fasilitatorCode,
      },
      { transaction }
    );
    const uploadFoto = await saveImage({
      imageBase64: req.body.foto.replace(/^data:image\/\w+;base64,/, ""),
      extImage: req.body.foto.split(";")[0].split("/")[1],
      nameImage: req.body.nik + "_gudang",
      dir: "gudang",
    });

    let urlFoto;
    if (uploadFoto.status == false) {
      if (transaction) {
        await transaction.rollback();
        return res.status(400).json({
          status: 400,
          message: "Gagal menambah mitra, Foto gudang gagal di upload",
        });
      }
    } else {
      urlFoto = uploadFoto.url;
    }

    const usaha = await model.adupi.usaha.create(
      {
        mitraCode: mitra.mitraCode,
        namaUsaha: req.body.namaUsaha,
        foto: urlFoto,
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
    await transaction.commit();
    return res.status(200).json({
      status: 200,
      message: "Berhasil menambah mitra",
    });
  } catch (err) {
    if (transaction) {
      await transaction.rollback();
      return res.status(400).json({
        status: 400,
        message: "Gagal menambah mitra",
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Gagal menambah mitra",
      });
    }
  }
};

export const deleteMitraByFasilitator = async (req, res, next) => {
  try {
    let transaction;
    transaction = await db.transaction();
    const fasilitator = await model.adupi.fasilitator.findOne({
      where: {
        userCode: req.userCode,
        deleteAt: null,
      },
    });
    if (!fasilitator) {
      return res.status(404).json({
        status: 404,
        message: "Anda tidak terdaftar sebagai fasilitator",
      });
    }
    const mitra = await model.adupi.mitra.findOne({
      where: {
        mitraCode: req.params.mitraCode,
        deleteAt: null,
      },
    });
    if (!mitra) {
      return res.status(404).json({
        status: 404,
        message: "Data mitra tidak ditemukan",
      });
    }
    await model.adupi.mitra.update(
      {
        deleteAt: new Date(),
      },
      {
        where: {
          mitraCode: req.params.mitraCode,
          fasilitatorCode: fasilitator.fasilitatorCode,
          deleteAt: null,
        },
      },
      { transaction }
    );
    await model.managementUser.user.update(
      {
        deleteAt: new Date(),
      },
      {
        where: {
          userCode: mitra.userCode,
          deleteAt: null,
        },
      },
      { transaction }
    );
    await transaction.commit();
    return res.status(200).json({
      status: 200,
      message: "Berhasil menghapus mitra",
    });
  } catch (err) {
    if (transaction) {
      await transaction.rollback();
      return res.status(400).json({
        status: 400,
        message: "Gagal menghapus mitra",
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Gagal menghapus mitra",
      });
    }
  }
};

export const getAllMitraVerified = async (req, res, next) => {
  try {
    let verified = "0";
    if (req.params.verified == "yes") {
      verified = "1";
    } else {
      verified = "0";
    }
    const mitra = await model.adupi.mitra.findAll({
      attributes: [
        "mitraCode",
        "nama",
        "nik",
        "ktp",
        "noHp",
        "jenisKelamin",
        "wilayahCode",
        "jenisMitra",
        "tempatLahir",
        "tanggalLahir",
        "alamat",
        "fasilitatorCode",
        "userCode",
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
          where: {
            isActive: verified,
            status: "Public",
            deleteAt: null,
          },
        },
        {
          attributes:[
                  "wilayah",
                  "wilayahCode"
          ],
          model:model.adupi.wilayah,
          as : 'wilayahs',
          on: {
              col1: Sequelize.where(Sequelize.fn('LEFT',Sequelize.col("mitra.wilayahCode") ,2), "=", Sequelize.col("wilayahs.wilayahCode")),
            }, 
          //   required: false, 
          },
          {
          attributes:[
                  "wilayah",
                  "wilayahCode"
          ],
          model:model.adupi.wilayah,
          as : 'kabupaten',
          on: {
              col1: Sequelize.where(Sequelize.fn('LEFT',Sequelize.col("mitra.wilayahCode") ,5), "=", Sequelize.col("kabupaten.wilayahCode")),
            }, 
          //   required: false, 
          },
        {
          model : model.adupi.usaha
        }
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

export const getDetailMitraVerified = async (req, res, next) => {
  try {
    let hasil;
    const mitra = await model.adupi.mitra.findOne({
      where: {
        mitraCode: req.params.mitraCode,
        deleteAt: null,
      },
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
          required: false
        },
      ],
    });
    const fasilitator = await model.adupi.fasilitator.findOne({
      where: {
        fasilitatorCode: mitra.fasilitatorCode,
        deleteAt: null,
      },
    });
    const user = await model.managementUser.user.findOne({
      where: {
        userCode: mitra.userCode,
        deleteAt: null,
      },
    });
    const anggota = await model.adupi.anggota.findAll({
      attributes: [
        "anggotaCode",
        "nama",
        "nik",
        "noHp",
        "jenisKelamin",
        "long",
        "lat",
        "alamat",
        "wilayahCode",
        [
          db.literal(
            "(SELECT wilayah.wilayah FROM wilayah WHERE LEFT(wilayahCode,13)=anggota.wilayahCode AND CHAR_LENGTH(wilayahCode)=13 ORDER BY wilayah LIMIT 1)"
          ),
          "desa",
        ],
        [
          db.literal(
            "(SELECT wilayah.wilayah FROM wilayah WHERE LEFT(wilayahCode,8) = LEFT(anggota.wilayahCode,8) AND CHAR_LENGTH(wilayahCode) = 8 ORDER BY wilayah LIMIT 1)"
          ),
          "kecamatan",
        ],
        [
          db.literal(
            "(SELECT wilayah.wilayah FROM wilayah WHERE LEFT(wilayahCode,5) = LEFT(anggota.wilayahCode,5) AND CHAR_LENGTH(wilayahCode) = 5 ORDER BY wilayah LIMIT 1)"
          ),
          "kabupaten",
        ],
        [
          db.literal(
            "(SELECT wilayah.wilayah FROM wilayah WHERE LEFT(wilayahCode,2) = LEFT(anggota.wilayahCode,2) AND CHAR_LENGTH(wilayahCode) = 2 ORDER BY wilayah LIMIT 1)"
          ),
          "provinsi",
        ],
      ],
      where: {
        mitraCode: mitra.mitraCode,
        deleteAt: null,
      },
    });
    const masalah = await model.adupi.masalah.findAll({
      where: {
        mitraCode: mitra.mitraCode,
        deleteAt: null,
      },
    });
    const beliSampah = await model.adupi.beliSampah.findAll({
      where: {
        mitraCode: mitra.mitraCode,
        deleteAt: null,
      },
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
    const jualSampah = await model.adupi.jualSampah.findAll({
      where: {
        mitraCode: mitra.mitraCode,
        deleteAt: null,
      },
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

export const activeAccountMitra = async (req, res, next) => {
  let transaction;
  transaction = await db.transaction();
  try {
    const mitra = await model.adupi.mitra.findOne({
      where: {
        mitraCode: req.body.mitraCode,
        deleteAt: null,
      },
    });
    if (!mitra) {
      return res.status(404).json({
        status: 404,
        message: "Data mitra tidak ditemukan",
      });
    }
    const role = await model.managementUser.role.findOne({
      where: {
        roleCode: req.body.roleCode,
        deleteAt: null,
      },
    });
    if (!role) {
      return res.status(404).json({
        status: 404,
        message: "Data role tidak ditemukan",
      });
    }
    await model.managementUser.user.update(
      {
        isActive: "1",
        updateAt: new Date(),
      },
      {
        where: {
          userCode: mitra.userCode,
          deleteAt: null,
        },
      },
      { transaction }
    );
    await model.managementUser.roleUser.create(
      {
        userCode: mitra.userCode,
        roleCode: req.body.roleCode,
      },
      { transaction }
    );
    await transaction.commit();
    return res.status(200).json({
      status: 200,
      message: "Berhasil mengaktifkan akun mitra",
    });
  } catch (err) {
    if (transaction) {
      await transaction.rollback();
      return res.status(400).json({
        status: 400,
        message: "Gagal mengaktifkan akun mitra",
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Gagal mengaktifkan akun mitra",
      });
    }
  }
};
