import { model } from "../../../models/index.js";

export const getAllKategoriSampah = async (req, res, next) => {
  try {
    const kategori = await model.adupi.master.kategoriSampah.findAll({
      where: {
        deleteAt: null,
      },
    });
    return res.status(200).json({
      status: 200,
      message: "Kategori sampah ditemukan",
      data: kategori,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Kategori sampah tidak ditemukan",
    });
  }
};

export const getOneKategoriSampah = async (req, res, next) => {
  try {
    const kategori = await model.adupi.master.kategoriSampah.findOne({
      where: {
        ksCode: req.params.ksCode,
        deleteAt: null,
      },
    });
    if(!kategori){
      return res.status(404).json({
        status: 404,
        message: "Kategori sampah tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Kategori sampah ditemukan",
      data: kategori,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Kategori sampah tidak ditemukan",
    });
  }
};

export const addKategoriSampah = async (req, res, next) => {
  await model.adupi.master.kategoriSampah
    .create({
      kategori: req.body.kategori,
    })
    .then(function (kategori) {
      if (kategori) {
        return res.status(200).json({
          status: 200,
          message: "Berhasil menambah kategori sampah"
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Gagal menambah kategori sampah",
        });
      }
    });
};

export const editKategoriSampah = async (req, res, next) => {
  try {
    const kategori = await model.adupi.master.kategoriSampah.findOne({
      where: {
        ksCode: req.params.ksCode,
        deleteAt: null,
      },
    });
    if(!kategori){
      return res.status(404).json({
        status: 404,
        message: "Kategori sampah tidak ditemukan",
      });
    }
    await model.adupi.master.kategoriSampah
      .update(
        {
          kategori: req.body.kategori,
          updateAt: new Date(),
        },
        {
          where: {
            ksCode: req.params.ksCode,
            deleteAt: null,
          },
        }
      )
      .then(function (kategori) {
        if (kategori) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil mengubah kategori sampah",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal merubah kategori sampah",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Kategori sampah tidak ditemukan",
    });
  }
};

export const deleteKategoriSampah = async (req, res, next) => {
  try {
    const kategori = await model.adupi.master.kategoriSampah.findOne({
      where: {
        ksCode: req.params.ksCode,
        deleteAt: null,
      },
    });
    if(!kategori){
      return res.status(404).json({
        status: 404,
        message: "Kategori sampah tidak ditemukan",
      });
    }
    await model.adupi.master.kategoriSampah
      .update(
        {
          deleteAt: new Date(),
        },
        {
          where: {
            ksCode: req.params.ksCode,
            deleteAt: null,
          },
        }
      )
      .then(function (kategori) {
        if (kategori) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil menghapus kategori sampah",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal menghapus kategori sampah",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Kategori sampah tidak ditemukan",
    });
  }
};
