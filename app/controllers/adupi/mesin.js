import { model } from "../../models/index.js";

export const getAllMesin = async (req, res, next) => {
  try {
    const mesin = await model.adupi.mesin.findAll({
      where: {
        mitraCode: req.mitraCode,
        deleteAt: null,
      },
    });
    return res.status(200).json({
      status: 200,
      message: "Mesin ditemukan",
      data: mesin,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Mesin tidak ditemukan",
    });
  }
};

export const getOneMesin = async (req, res, next) => {
  try {
    const mesin = await model.adupi.mesin.findOne({
      where: {
        mesinCode: req.params.mesinCode,
        mitraCode: req.mitraCode,
        deleteAt: null,
      },
    });
    if (!mesin) {
      return res.status(404).json({
        status: 404,
        message: "Mesin tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Mesin ditemukan",
      data: mesin,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Mesin tidak ditemukan",
    });
  }
};

export const addMesin = async (req, res, next) => {
  await model.adupi.mesin
    .create({
      usahaCode: req.body.usahaCode,
      jenisMesin: req.body.jenisMesin,
      statusKepemilikanMesin: req.body.statusKepemilikanMesin,
      kapasitas: req.body.kapasitas,
      foto: req.body.foto,
      mitraCode: req.mitraCode,
    })
    .then(function (mesin) {
      if (mesin) {
        return res.status(200).json({
          status: 200,
          message: "Berhasil menambah data mesin",
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Gagal menambah data mesin",
        });
      }
    });
};

export const editMesin = async (req, res, next) => {
  try {
    const mesin = await model.adupi.mesin.findOne({
      where: {
        mesinCode: req.params.mesinCode,
        usahaCode: req.body.usahaCode,
        mitraCode: req.mitraCode,
        deleteAt: null,
      },
    });
    if (!mesin) {
      return res.status(404).json({
        status: 404,
        message: "Mesin tidak ditemukan",
      });
    }
    await model.adupi.mesin
      .update(
        {
          jenisMesin: req.body.jenisMesin,
          statusKepemilikanMesin: req.body.statusKepemilikanMesin,
          kapasitas: req.body.kapasitas,
          foto: req.body.foto,
          updateAt: new Date(),
        },
        {
          where: {
            mesinCode: req.params.mesinCode,
            deleteAt: null,
          },
        }
      )
      .then(function (mesin) {
        if (mesin) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil mengubah data mesin",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal merubah data mesin",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Mesin tidak ditemukan",
    });
  }
};

export const deleteMesin = async (req, res, next) => {
  try {
    const mesin = await model.adupi.mesin.findOne({
      where: {
        mesinCode: req.params.mesinCode,
        mitraCode: req.mitraCode,
        deleteAt: null,
      },
    });
    if (!mesin) {
      return res.status(404).json({
        status: 404,
        message: "Mesin tidak ditemukan",
      });
    }
    await model.adupi.mesin
      .update(
        {
          deleteAt: new Date(),
        },
        {
          where: {
            mesinCode: req.params.mesinCode,
            deleteAt: null,
          },
        }
      )
      .then(function (mesin) {
        if (mesin) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil menghapus data mesin",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal menghapus data mesin",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Mesin tidak ditemukan",
    });
  }
};
