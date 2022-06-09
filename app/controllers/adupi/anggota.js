import { model } from "../../models/index.js";
import { uploads3 } from "../../utils/aws_bucket.js";

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
  let uploadFoto = uploads3({
    imageBase64: req.body.ktp.replace(/^data:image\/\w+;base64,/, ""),
    typeImage: req.body.ktp.split(";")[0].split(":")[1],
    extImage: req.body.ktp.split(";")[0].split("/")[1],
    nameImage: req.body.nik + "_ktp_anggota",
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
    if(anggota.ktp != req.body.ktp){
      let uploadFoto = uploads3({
        imageBase64: req.body.ktp.replace(/^data:image\/\w+;base64,/, ""),
        typeImage: req.body.ktp.split(";")[0].split(":")[1],
        extImage: req.body.ktp.split(";")[0].split("/")[1],
        nameImage: req.body.nik + "_ktp_anggota",
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
