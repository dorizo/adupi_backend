import { model } from "../../models/index.js";
import { Sequelize } from "sequelize";
const op = Sequelize.Op;
import { QueryTypes } from "sequelize";
import db from "../../config/database.js";

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
    if (!fasilitator) {
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
    if (!fasilitator) {
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
  let transaction;
  transaction = await db.transaction();
  try {
    const fasilitator = await model.adupi.fasilitator.findOne(
      {
        where: {
          fasilitatorCode: req.params.fasilitatorCode,
          deleteAt: null,
        },
      },
      {
        transaction,
      }
    );
    await model.adupi.fasilitator.update(
      {
        deleteAt: new Date(),
      },
      {
        where: {
          fasilitatorCode: req.params.fasilitatorCode,
          deleteAt: null,
        },
      },
      {
        transaction,
      }
    );

    await model.managementUser.user.update(
      {
        deleteAt: new Date(),
      },
      {
        where: {
          userCode: fasilitator.userCode,
          deleteAt: null,
        },
      },
      { transaction }
    );
    await transaction.commit();
    return res.status(200).json({
      status: 200,
      message: "Berhasil menghapus fasilitator",
    });
  } catch (error) {
    if (transaction) {
      await transaction.rollback();
      return res.status(400).json({
        status: 400,
        message: "Gagal menghapus fasilitator",
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Gagal menghapus fasilitator",
      });
    }
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

export const getMitraNotYetVerifByFasilitator = async (req, res, next) => {
  try {
    const mitra = await model.adupi.mitra.findAll({
      where: {
        fasilitatorCode: null,
        deleteAt: null,
      },
      include: [
        {
          model: model.adupi.usaha,
          where: {
            deleteAt: null,
          },
          include: [
            {
              model: model.adupi.mesin,
              where: {
                deleteAt: null,
              },
            },
          ],
        },
      ],
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

export const verifMitraByFasilitator = async (req, res, next) => {
  try {
    const mitra = await model.adupi.mitra.findOne({
      where: {
        mitraCode: req.params.mitraCode,
        deleteAt: null,
      },
    });
    if (!mitra) {
      return res.status(404).json({
        status: 404,
        message: "Mitra tidak ditemukan",
      });
    }
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
    await model.adupi.mitra
      .update(
        {
          fasilitatorCode: fasilitator.fasilitatorCode,
          updateAt: new Date(),
        },
        {
          where: {
            mitraCode: req.params.mitraCode,
            deleteAt: null,
          },
        }
      )
      .then(function (mitra) {
        if (mitra) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil memverifikasi mitra",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal memverifikasi mitra",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Mitra tidak ditemukan",
    });
  }
};
