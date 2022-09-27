import { model } from "../../models/index.js";
import { saveImage } from "../../utils/saveImage.js";
import { Sequelize, where } from "sequelize";
const op = Sequelize.Op;
export const getAllPembeli = async (req, res, next) => {
  try {
    if(req.query.search != null){
      var condition = {
        deleteAt: null,
        pembeli: { [op.like]: `%${req.query.search}%` }
      };
    }else{
      var condition = {
        deleteAt: null,
      };
    }
    const pembeli = await model.adupi.pembeli.findAll({
      where: condition,
    });
    return res.status(200).json({
      status: 200,
      message: "Pembeli ditemukan",
      data: pembeli,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Pembeli tidak ditemukan",
    });
  }
};

export const getAllPembeliForPembelian = async (req, res, next) => {
  try {
    if(req.query.search != null){
      var condition = {
        deleteAt: null,
        parentCode: null,
        pembeli: { [op.like]: `%${req.query.search}%` }
      };
    }else{
      var condition = {
        deleteAt: null,
        parentCode: null,
      };
    }
    const pembeli = await model.adupi.pembeli.findAll({
      where: condition,
    });
    return res.status(200).json({
      status: 200,
      message: "Pembeli ditemukan",
      data: pembeli,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Pembeli tidak ditemukan",
    });
  }
};

export const getOnePembeli = async (req, res, next) => {
  try {
    const pembeli = await model.adupi.pembeli.findOne({
      where: {
        pembeliCode: req.params.pembeliCode,
        deleteAt: null,
      },
    });
    if (!pembeli) {
      return res.status(404).json({
        status: 404,
        message: "Pembeli tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Pembeli ditemukan",
      data: pembeli,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Pembeli tidak ditemukan",
    });
  }
};

export const addPembeli = async (req, res, next) => {
  await model.adupi.pembeli
    .create({
      status: "0",
      pembeli: req.body.pembeli,
      createAt: new Date(),
    })
    .then(function (pembeli) {
      if (pembeli) {
        return res.status(200).json({
          status: 200,
          message: "Berhasil menambah data pembeli",
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Gagal menambah data pembeli",
        });
      }
    });
};

export const addPembeliJualSampah = async (req, res, next) => {
  const name = await model.adupi.pembeli.findOne({
      where :{
        pembeli : req.body.pembeli
      }
    }
  )
  if(name){
  return res.status(200).json({
    status: 200,
    message: "Berhasil menambah data pembeli",
    data: name
  });
}
  await model.adupi.pembeli
    .create({
      status: "0",
      pembeli: req.body.pembeli,
      parentCode: req.userCode,
      createAt: new Date(),
    })
    .then(function (pembeli) {
      if (pembeli) {
        return res.status(200).json({
          status: 200,
          message: "Berhasil menambah data pembeli",
          data: pembeli
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Gagal menambah data pembeli",
        });
      }
    });
};

export const editPembeli = async (req, res, next) => {
  try {
    const pembeli = await model.adupi.pembeli.findOne({
      where: {
        pembeliCode: req.params.pembeliCode,
        status: "0",
        deleteAt: null,
      },
    });
    if (!pembeli) {
      return res.status(404).json({
        status: 404,
        message: "Pembeli tidak ditemukan",
      });
    }
    await model.adupi.pembeli
      .update(
        {
          pembeli: req.body.pembeli,
          updateAt: new Date(),
        },
        {
          where: {
            pembeliCode: req.params.pembeliCode,
            deleteAt: null,
          },
        }
      )
      .then(function (pembeli) {
        if (pembeli) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil mengubah data pembeli",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal merubah data pembeli",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Pembeli tidak ditemukan",
    });
  }
};

export const deletePembeli = async (req, res, next) => {
  try {
    const pembeli = await model.adupi.pembeli.findOne({
      where: {
        pembeliCode: req.params.pembeliCode,
        status: "0",
        deleteAt: null,
      },
    });
    if (!pembeli) {
      return res.status(404).json({
        status: 404,
        message: "Pembeli tidak ditemukan",
      });
    }
    await model.adupi.pembeli
      .update(
        {
          deleteAt: new Date(),
        },
        {
          where: {
            pembeliCode: req.params.pembeliCode,
            deleteAt: null,
          },
        }
      )
      .then(function (pembeli) {
        if (pembeli) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil menghapus data pembeli",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal menghapus data pembeli",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Pembeli tidak ditemukan",
    });
  }
};
