import { model } from "../../models/index.js";
import { saveImage } from "../../utils/saveImage.js";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize";
const op = Sequelize.Op;

export const checkFasilitatorOrNot = async (req, res, next) => {
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
    req.fasilitatorCode = fasilitator.fasilitatorCode;
    next();
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Anda tidak terdaftar sebagai fasilitator",
    });
  }
};

export const checkFasilitatorOrNotForAll = async (req, res, next) => {
  try {
    const fasilitator = await model.adupi.fasilitator.findOne({
      where: {
        userCode: req.userCode,
        deleteAt: null,
      },
    });
    if (!fasilitator) {
      req.fasilitatorCode = "0";
      next();
    } else {
      req.fasilitatorCode = fasilitator.fasilitatorCode;
      next();
    }
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Anda tidak terdaftar sebagai fasilitator",
    });
  }
};

export const getAllKunjungan = async (req, res, next) => {
  // try {
    let condition;
    if (req.fasilitatorCode == "0") {
      condition = { deleteAt: null };
    } else {
      condition = { deleteAt: null, fasilitatorCode: req.fasilitatorCode };
    }
    const kunjungan = await model.adupi.kunjungan.findAll({
      where: condition,
      order: [
        ['kunjunganCode', 'DESC'],
      ],
      include: [
        {
          model: model.adupi.fasilitator,
        },
        {
          model: model.adupi.mitra,
        },
      ],
    });
    return res.status(200).json({
      status: 200,
      message: "Kunjungan ditemukan",
      data: kunjungan,
    });
  // } catch (error) {
  //   return res.status(404).json({
  //     status: 404,
  //     message: "Kunjungan tidak ditemukan",
  //   });
  // }
};

export const getOneKunjungan = async (req, res, next) => {
  try {
    let condition;
    if (req.fasilitatorCode == "0") {
      condition = {
        deleteAt: null,
        kunjunganCode: req.params.kunjunganCode,
      };
    } else {
      condition = {
        deleteAt: null,
        fasilitatorCode: req.fasilitatorCode,
        kunjunganCode: req.params.kunjunganCode,
      };
    }
    const kunjungan = await model.adupi.kunjungan.findOne({
      where: condition,
      include: [
        {
          model: model.adupi.fasilitator,
        },
        {
          model: model.adupi.mitra,
        },
      ],
    });
    if (!kunjungan) {
      return res.status(404).json({
        status: 404,
        message: "Kunjungan tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Kunjungan ditemukan",
      data: kunjungan,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Kunjungan tidak ditemukan",
    });
  }
};

export const addKunjungan = async (req, res, next) => {
 
  await model.adupi.kunjungan
    .create({
      judul: req.body.judul,
      deskripsi: req.body.deskripsi,
      mitraCode: req.body.mitraCode,
      latitude: req.body.latitude,
      longitude: req.body.longitude,
      fasilitatorCode: req.fasilitatorCode,
    })
    .then(function (kunjungan) {
      if (kunjungan) {
        return res.status(200).json({
          status: 200,
          message: "Berhasil menambah data kunjungan",
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Gagal menambah data kunjungan",
        });
      }
    });
};

export const addKunjunganimage = async (req, res, next) => {

  let uploadFoto = await saveImage({
    imageBase64: req.body.image.replace(/^data:image\/\w+;base64,/, ""),
    extImage: req.body.image.split(";")[0].split("/")[1],
    nameImage: (Math.random() + 1).toString(36).substring(7) + "_kunjungan",
    dir: "kunjungan",
  });
  await model.adupi.kunjunganimage.create({
      kunjunganCode :req.body.idku,
      status_foto : req.body.statusfoto,
      foto : uploadFoto.url

  }).then(function (kunjungan) {
      if (kunjungan) {
        return res.status(200).json({
          status: 200,
          message: "Berhasil menambah data kunjungan",
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Gagal menambah data kunjungan",
        });
      }
    });
}
export const editKunjungan = async (req, res, next) => {
  try {
    const kunjungan = await model.adupi.kunjungan.findOne({
      where: {
        kunjunganCode: req.params.kunjunganCode,
        fasilitatorCode: req.fasilitatorCode,
        deleteAt: null,
      },
    });
    if (!kunjungan) {
      return res.status(404).json({
        status: 404,
        message: "Kunjungan tidak ditemukan",
      });
    }
    await model.adupi.kunjungan
      .update(
        {
          judul: req.body.judul,
          deskripsi: req.body.deskripsi,
          fasilitatorCode: req.fasilitatorCode,
          updateAt: new Date(),
        },
        {
          where: {
            kunjunganCode: req.params.kunjunganCode,
            deleteAt: null,
          },
        }
      )
      .then(function (kunjungan) {
        if (kunjungan) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil merubah data kunjungan",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal merubah data kunjungan",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Kunjungan tidak ditemukan",
    });
  }
};

export const deleteKunjungan = async (req, res, next) => {
  try {
    const kunjungan = await model.adupi.kunjungan.findOne({
      where: {
        kunjunganCode: req.params.kunjunganCode,
        fasilitatorCode: req.fasilitatorCode,
        deleteAt: null,
      },
    });
    if (!kunjungan) {
      return res.status(404).json({
        status: 404,
        message: "Kunjungan tidak ditemukan",
      });
    }
    await model.adupi.kunjungan
      .update(
        {
          deleteAt: new Date(),
        },
        {
          where: {
            kunjunganCode: req.params.kunjunganCode,
            deleteAt: null,
          },
        }
      )
      .then(function (kunjungan) {
        if (kunjungan) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil menghapus data kunjungan",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal menghapus data kunjungan",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Kunjungan tidak ditemukan",
    });
  }
};
