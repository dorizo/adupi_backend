import { model } from "../../models/index.js";
import { saveImage } from "../../utils/saveImage.js";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize";
import db from "../../config/database.js";
import { literal } from "sequelize";
const op = Sequelize.Op;

export const checkMitraOrNot = async (req, res, next) => {
  try {
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
    req.mitraCode = mitra.mitraCode;
    next();
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Anda tidak terdaftar sebagai mitra",
    });
  }
};

export const getAllAnggota = async (req, res, next) => {
  try {
    let condition;
    if (req.params.mitraCode) {
      if (req.params.mitraCode == null || req.params.status == null) {
        return res.status(400).json({
          status: 400,
          message: "Kode mitra atau status dibutuhkan",
        });
      } else {
        console.log(req.params.status);
        if (req.params.status == "verified") {
          condition = {
            ...condition,
            deleteAt: null,
            mitraCode: req.params.mitraCode,
            [op.and]: [
              {
                long: {
                  [op.ne]: null,
                },
              },
              {
                lat: {
                  [op.ne]: null,
                },
              },
            ],
          };
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
              "mitraCode",
              "createAt",
              "updateAt",
              "wilayahCode",
              "deleteAt",
              "ktp",
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
            where: condition,
            order: [["anggotaCode", "DESC"]],
          });
          return res.status(200).json({
            status: 200,
            message: "Anggota ditemukan",
            data: anggota,
          });
        } else {
          condition = {
            ...condition,
            deleteAt: null,
            mitraCode: req.params.mitraCode,
            long: null,
            lat: null,
          };
          const anggota = await model.adupi.anggota.findAll({attributes: [
            "anggotaCode",
            "nama",
            "nik",
            "noHp",
            "jenisKelamin",
            "long",
            "lat",
            "alamat",
            "mitraCode",
            "createAt",
            "updateAt",
            "wilayahCode",
            "deleteAt",
            "ktp",
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
            where: condition,
            order: [["anggotaCode", "DESC"]],
          });
          return res.status(200).json({
            status: 200,
            message: "Anggota ditemukan",
            data: anggota,
          });
        }
      }
    } else {
      condition = { ...condition, deleteAt: null, mitraCode: req.mitraCode };
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
          "ktp",
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
        where: condition,
        order: [["anggotaCode", "DESC"]],
      });
      return res.status(200).json({
        status: 200,
        message: "Anggota ditemukan",
        data: anggota,
      });
    }
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Anggota tidak ditemukan",
    });
  }
};

export const getOneAnggota = async (req, res, next) => {
  try {
    let condition = {
      anggotaCode: req.params.anggotaCode,
    };
    if (req.mitraCode == "0") {
      if (req.params.mitraCode == null) {
        return res.status(400).json({
          status: 400,
          message: "Kode mitra dibutuhkan",
        });
      } else {
        condition = {
          ...condition,
          deleteAt: null,
          mitraCode: req.params.mitraCode,
        };
      }
    } else {
      condition = { ...condition, deleteAt: null, mitraCode: req.mitraCode };
    }
    const anggota = await model.adupi.anggota.findOne({
      where: condition,
    });
    if (!anggota) {
      return res.status(404).json({
        status: 404,
        message: "Anggota tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Anggota ditemukan",
      data: anggota,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Anggota tidak ditemukan",
    });
  }
};

export const addAnggota = async (req, res, next) => {
  let uploadFoto = await saveImage({
    imageBase64: req.body.ktp.replace(/^data:image\/\w+;base64,/, ""),
    extImage: req.body.ktp.split(";")[0].split("/")[1],
    nameImage: req.body.nik + "_ktp_anggota",
    dir: "anggota",
  });

  if (uploadFoto.status == false) {
    return res.status(400).json({
      status: 400,
      message: "Foto gagal di upload",
    });
  } else {
    await model.adupi.anggota
      .create({
        nama: req.body.nama,
        nik: req.body.nik,
        ktp: uploadFoto.url,
        noHp: req.body.noHp,
        jenisKelamin: req.body.jenisKelamin,
        wilayahCode: req.body.wilayahCode,
        alamat: req.body.alamat,
        mitraCode: req.mitraCode,
      })
      .then(function (anggota) {
        if (anggota) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil menambah data anggota",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal menambah data anggota",
          });
        }
      });
  }
};

export const editAnggota = async (req, res, next) => {
  try {
    const anggota = await model.adupi.anggota.findOne({
      where: {
        anggotaCode: req.params.anggotaCode,
        mitraCode: req.mitraCode,
        deleteAt: null,
      },
    });
    if (!anggota) {
      return res.status(404).json({
        status: 404,
        message: "Anggota tidak ditemukan",
      });
    }
    let urlKTP = anggota.ktp;
    if (anggota.ktp != req.body.ktp) {
      let uploadFoto = await saveImage({
        imageBase64: req.body.ktp.replace(/^data:image\/\w+;base64,/, ""),
        extImage: req.body.ktp.split(";")[0].split("/")[1],
        nameImage: req.body.nik + "_ktp_anggota",
        dir: "anggota",
      });

      if (uploadFoto.status == false) {
        return res.status(400).json({
          status: 400,
          message: "Foto gagal di upload",
        });
      } else {
        urlKTP = uploadFoto.url;
      }
    }
    await model.adupi.anggota
      .update(
        {
          nama: req.body.nama,
          nik: req.body.nik,
          ktp: urlKTP,
          noHp: req.body.noHp,
          jenisKelamin: req.body.jenisKelamin,
          wilayahCode: req.body.wilayahCode,
          alamat: req.body.alamat,
          updateAt: new Date(),
        },
        {
          where: {
            anggotaCode: req.params.anggotaCode,
            deleteAt: null,
          },
        }
      )
      .then(function (anggota) {
        if (anggota) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil memverif data anggota",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal merubah data anggota",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Anggota tidak ditemukan",
    });
  }
};

export const deleteAnggota = async (req, res, next) => {
  try {
    const anggota = await model.adupi.anggota.findOne({
      where: {
        anggotaCode: req.params.anggotaCode,
        mitraCode: req.mitraCode,
        deleteAt: null,
      },
    });
    if (!anggota) {
      return res.status(404).json({
        status: 404,
        message: "Anggota tidak ditemukan",
      });
    }
    await model.adupi.anggota
      .update(
        {
          deleteAt: new Date(),
        },
        {
          where: {
            anggotaCode: req.params.anggotaCode,
            deleteAt: null,
          },
        }
      )
      .then(function (anggota) {
        if (anggota) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil menghapus data anggota",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal menghapus data anggota",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Anggota tidak ditemukan",
    });
  }
};

export const verifAnggota = async (req, res, next) => {
  try {
    const anggota = await model.adupi.anggota.findOne({
      where: {
        anggotaCode: req.params.anggotaCode,
        deleteAt: null,
      },
    });
    if (!anggota) {
      return res.status(404).json({
        status: 404,
        message: "Anggota tidak ditemukan",
      });
    }

    await model.adupi.anggota
      .update(
        {
          long: req.body.long,
          lat: req.body.lat,
          updateAt: new Date(),
        },
        {
          where: {
            anggotaCode: req.params.anggotaCode,
            deleteAt: null,
          },
        }
      )
      .then(function (anggota) {
        if (anggota) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil memverif data anggota",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal memverif data anggota",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Anggota tidak ditemukan",
    });
  }
};
