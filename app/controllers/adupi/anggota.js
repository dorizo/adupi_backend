import { model } from "../../models/index.js";

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
    const anggota = await model.adupi.anggota.findAll({
      where: {
        mitraCode: req.mitraCode,
        deleteAt: null,
      },
    });
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

export const getOneAnggota = async (req, res, next) => {
  try {
    const anggota = await model.adupi.anggota.findAll({
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
  await model.adupi.anggota
    .create({
      nama: req.body.nama,
      nik: req.body.nik,
      ktp: req.body.ktp,
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
    await model.adupi.anggota
      .update(
        {
          nama: req.body.nama,
          nik: req.body.nik,
          ktp: req.body.ktp,
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
            message: "Berhasil mengubah data anggota",
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
