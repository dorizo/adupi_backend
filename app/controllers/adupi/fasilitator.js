import { model } from "../../models/index.js";
import { Sequelize } from "sequelize";
const op = Sequelize.Op;

export const getAllFasilitator = async (req, res, next) => {
  try {
    const fasilitator = await model.adupi.fasilitator.findAll({
      where: {
        deleteAt: null,
      },
    });
    return res.status(200).json({
      status: 200,
      message: "Fasilitator ditemukan",
      data: fasilitator,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Fasilitator tidak ditemukan",
    });
  }
};

export const getOneFasilitator = async (req, res, next) => {
  try {
    const fasilitator = await model.adupi.fasilitator.findOne({
      where: {
        fasilitatorCode: req.params.fasilitatorCode,
        deleteAt: null,
      },
    });
    if(!fasilitator){
      return res.status(404).json({
        status: 404,
        message: "Fasilitator tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Fasilitator ditemukan",
      data: fasilitator,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Fasilitator tidak ditemukan",
    });
  }
};

export const addFasilitator = async (req, res, next) => {
  await model.adupi.fasilitator
    .create({
      nama: req.body.nama,
      alamat: req.body.alamat,
      wilayahCode: req.body.wilayahCode,
      userCode: req.body.userCode,
    })
    .then(function (fasilitator) {
      if (fasilitator) {
        return res.status(200).json({
          status: 200,
          message: "Berhasil menambah fasilitator",
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Gagal menambah fasilitator",
        });
      }
    });
};

export const editFasilitator = async (req, res, next) => {
  try {
    const fasilitator = await model.adupi.fasilitator.findOne({
      where: {
        fasilitatorCode: req.params.fasilitatorCode,
        deleteAt: null,
      },
    });
    if(!fasilitator){
      return res.status(404).json({
        status: 404,
        message: "Fasilitator tidak ditemukan",
      });
    }
    await model.adupi.fasilitator
      .update(
        {
          nama: req.body.nama,
          alamat: req.body.alamat,
          wilayahCode: req.body.wilayahCode,
          userCode: req.body.userCode,
          updateAt: new Date(),
        },
        {
          where: {
            fasilitatorCode: req.params.fasilitatorCode,
            deleteAt: null,
          },
        }
      )
      .then(function (fasilitator) {
        if (fasilitator) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil mengubah fasilitator",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal mengubah fasilitator",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Fasilitator tidak ditemukan",
    });
  }
};

export const deleteFasilitator = async (req, res, next) => {
  try {
    const fasilitator = await model.adupi.fasilitator.findOne({
      where: {
        fasilitatorCode: req.params.fasilitatorCode,
        deleteAt: null,
      },
    });
    await model.adupi.fasilitator
      .update(
        {
          deleteAt: new Date(),
        },
        {
          where: {
            fasilitatorCode: req.params.fasilitatorCode,
            deleteAt: null,
          },
        }
      )
      .then(function (fasilitator) {
        if (fasilitator) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil menghapus fasilitator",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal menghapus fasilitator",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Fasilitator tidak ditemukan",
    });
  }
};

export const getUserForAddFasilitator = async (req, res, next) => {
  const fasilitator = await model.adupi.fasilitator.findAll({
    attributes: ["userCode"],
    where: {
      deleteAt: null,
    },
  });
  const mitra = await model.adupi.mitra.findAll({
    attributes: ["userCode"],
    where: {
      deleteAt: null,
    },
  });

  const usedKey = [];
  await fasilitator.forEach((item) => {
    usedKey.push(item.userCode);
  });
  await mitra.forEach((item) => {
    usedKey.push(item.userCode);
  });
  const user = await model.managementUser.user.findAll({
    attributes: ["userCode", "email"],
    where: {
      userCode: {
        [op.notIn]: usedKey,
      },
      status: "Public",
      deleteAt: null,
    },
  });
  return res.status(200).json({
    status: 200,
    message: "",
    data: user,
  });
};

export const getUserForEditFasilitator = async (req, res, next) => {
  const re = await model.adupi.fasilitator.findOne({
    where: {
      fasilitatorCode: req.params.fasilitatorCode,
      deleteAt: null,
    },
  });
  if (!re) {
    return res.status(404).json({
      status: 404,
      message: "Fasilitator tidak ditemukan",
    });
  }
  const fasilitator = await model.adupi.fasilitator.findAll({
    attributes: ["userCode"],
    where: {
      deleteAt: null,
    },
  });
  const mitra = await model.adupi.mitra.findAll({
    attributes: ["userCode"],
    where: {
      deleteAt: null,
    },
  });

  const usedKey = [];
  await fasilitator.forEach((item) => {
    if (item.userCode != re.userCode) {
      usedKey.push(item.userCode);
    }
  });
  await mitra.forEach((item) => {
    usedKey.push(item.userCode);
  });
  const user = await model.managementUser.user.findAll({
    attributes: ["userCode", "email"],
    where: {
      userCode: {
        [op.notIn]: usedKey,
      },
      status: "Public",
      deleteAt: null,
    },
  });
  return res.status(200).json({
    status: 200,
    message: "",
    data: user,
  });
};
