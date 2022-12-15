import { model } from "../../models/index.js";
import { saveImage } from "../../utils/saveImage.js";
import { Sequelize, where } from "sequelize";
const op = Sequelize.Op;
export const getAllwarna = async (req, res, next) => {
  try {
    if(req.query.search != null){
      var condition = {
        deleteAt: null,
        // warna: { [op.like]: `%${req.query.search}%` }
      };
    }else{
      var condition = {
        deleteAt: null,
      };
    }
    const warna = await model.adupi.warna.findAll({
      where: condition,
    });
    return res.status(200).json({
      status: 200,
      message: "warna ditemukan",
      data: warna,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "warna tidak ditemukan",
    });
  }
};

export const getAllwarnaForwarnaan = async (req, res, next) => {
  try {
    if(req.query.search != null){
      var condition = {
        deleteAt: null,
        parentCode: null,
        warna: { [op.like]: `%${req.query.search}%` }
      };
    }else{
      var condition = {
        deleteAt: null,
        parentCode: null,
      };
    }
    const warna = await model.adupi.warna.findAll({
      where: condition,
    });
    return res.status(200).json({
      status: 200,
      message: "warna ditemukan",
      data: warna,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "warna tidak ditemukan",
    });
  }
};

export const getOnewarna = async (req, res, next) => {
  try {
    const warna = await model.adupi.warna.findOne({
      where: {
        warnaCode: req.params.warnaCode,
        deleteAt: null,
      },
    });
    if (!warna) {
      return res.status(404).json({
        status: 404,
        message: "warna tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "warna ditemukan",
      data: warna,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "warna tidak ditemukan",
    });
  }
};

export const addwarna = async (req, res, next) => {
  await model.adupi.warna
    .create({
      warna: req.body.warna,
    })
    .then(function (warna) {
      if (warna) {
        return res.status(200).json({
          status: 200,
          message: "Berhasil menambah data warna",
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Gagal menambah data warna",
        });
      }
    });
};

export const addwarnaJualSampah = async (req, res, next) => {
  const name = await model.adupi.warna.findOne({
      where :{
        warna : req.body.warna
      }
    }
  )
  if(name){
  return res.status(200).json({
    status: 200,
    message: "Berhasil menambah data warna",
    data: name
  });
}
  await model.adupi.warna
    .create({
      status: "0",
      warna: req.body.warna,
      parentCode: req.userCode,
      createAt: new Date(),
    })
    .then(function (warna) {
      if (warna) {
        return res.status(200).json({
          status: 200,
          message: "Berhasil menambah data warna",
          data: warna
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Gagal menambah data warna",
        });
      }
    });
};

export const editwarna = async (req, res, next) => {
  try {
    const warna = await model.adupi.warna.findOne({
      where: {
        warnaCode: req.params.roleCode,
        deleteAt: null,
      },
    });
    if (!warna) {
      return res.status(404).json({
        status: 404,
        message: "warna tidak ditemukan",
      });
    }
    await model.adupi.warna
      .update(
        {
          warna: req.body.warna,
          updateAt: new Date(),
        },
        {
          where: {
            warnaCode: req.params.roleCode,
            deleteAt: null,
          },
        }
      )
      .then(function (warna) {
        if (warna) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil mengubah data warna",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal merubah data warna",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "warna tidak ditemukan",
    });
  }
};

export const deletewarna = async (req, res, next) => {
    console.log(req.params);
  try {
    const warna = await model.adupi.warna.findOne({
      where: {
        warnaCode: req.params.roleCode,
        deleteAt: null,
      },
    });
    if (!warna) {
      return res.status(404).json({
        status: 404,
        message: "warna tidak ditemukan",
      });
    }
    await model.adupi.warna
      .update(
        {
          deleteAt: new Date(),
        },
        {
          where: {
            warnaCode: req.params.roleCode,
            deleteAt: null,
          },
        }
      )
      .then(function (warna) {
        if (warna) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil menghapus data warna",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal menghapus data warna",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "warna tidak ditemukan",
    });
  }
};
