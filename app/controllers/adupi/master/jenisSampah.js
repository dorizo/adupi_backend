import { model } from "../../../models/index.js";

export const getAllJenisSampah = async (req, res, next) => {
  try {
    const jenis = await model.adupi.master.jenisSampah.findAll({
      where: {
        deleteAt: null,
      },
    });
    return res.status(200).json({
      status: 200,
      message: "Jenis sampah ditemukan",
      data: jenis,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Jenis sampah tidak ditemukan",
    });
  }
};

export const getOneJenisSampah = async (req, res, next) => {
  try {
    const jenis = await model.adupi.master.jenisSampah.findOne({
      where: {
        jsCode: req.params.jsCode,
        deleteAt: null,
      },
    });
    if(!jenis){
      return res.status(404).json({
        status: 404,
        message: "Jenis sampah tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Jenis sampah ditemukan",
      data: jenis,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Jenis sampah tidak ditemukan",
    });
  }
};

export const addJenisSampah = async (req, res, next) => {
  await model.adupi.master.jenisSampah
    .create({
      jenis: req.body.jenis,
      ksCode: req.body.ksCode,
    })
    .then(function (jenis) {
      if (jenis) {
        return res.status(200).json({
          status: 200,
          message: "Berhasil menambah jenis sampah"
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Gagal menambah jenis sampah",
        });
      }
    });
};

export const editJenisSampah = async (req, res, next) => {
  try {
    const jenis = await model.adupi.master.jenisSampah.findOne({
      where: {
        jsCode: req.params.jsCode,
        deleteAt: null,
      },
    });
    if(!jenis){
      return res.status(404).json({
        status: 404,
        message: "Jenis sampah tidak ditemukan",
      });
    }
    await model.adupi.master.jenisSampah
      .update(
        {
          jenis: req.body.jenis,
          ksCode: req.body.ksCode,
          updateAt: new Date(),
        },
        {
          where: {
            jsCode: req.params.jsCode,
            deleteAt: null,
          },
        }
      )
      .then(function (jenis) {
        if (jenis) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil mengubah jenis sampah",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal merubah jenis sampah",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Jenis sampah tidak ditemukan",
    });
  }
};

export const deleteJenisSampah = async (req, res, next) => {
  try {
    const jenis = await model.adupi.master.jenisSampah.findOne({
      where: {
        jsCode: req.params.jsCode,
        deleteAt: null,
      },
    });
    if(!jenis){
      return res.status(404).json({
        status: 404,
        message: "Jenis sampah tidak ditemukan",
      });
    }
    await model.adupi.master.jenisSampah
      .update(
        {
          deleteAt: new Date(),
        },
        {
          where: {
            jsCode: req.params.jsCode,
            deleteAt: null,
          },
        }
      )
      .then(function (jenis) {
        if (jenis) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil menghapus jenis sampah",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal menghapus jenis sampah",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Jenis sampah tidak ditemukan",
    });
  }
};
