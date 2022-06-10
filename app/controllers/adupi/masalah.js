import { model } from "../../models/index.js";

export const getAllMasalah = async (req, res, next) => {
  try {
    let masalah;
    if (req.mitraCode == "0") {
      if (req.params.mitraCode == null) {
        return res.status(400).json({
          status: 400,
          message: "Kode mitra dibutuhkan",
        });
      } else {
        masalah = await model.adupi.masalah.findAll({
          where: {
            mitraCode: req.params.mitraCode,
            deleteAt: null,
          },
        });
      }
    } else {
      masalah = await model.adupi.masalah.findAll({
        where: {
          mitraCode: req.mitraCode,
          deleteAt: null,
        },
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Masalah ditemukan",
      data: masalah,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Masalah tidak ditemukan",
    });
  }
};

export const getOneMasalah = async (req, res, next) => {
  try {
    const masalah = await model.adupi.masalah.findOne({
      where: {
        masalahCode: req.params.masalahCode,
        deleteAt: null,
      },
    });
    if (!masalah) {
      return res.status(404).json({
        status: 404,
        message: "Masalah tidak ditemukan",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Masalah ditemukan",
      data: masalah,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Masalah tidak ditemukan",
    });
  }
};

export const addMasalah = async (req, res, next) => {
  let uploadFoto = await saveImage({
    imageBase64: req.body.foto.replace(/^data:image\/\w+;base64,/, ""),
    extImage: req.body.foto.split(";")[0].split("/")[1],
    nameImage: (Math.random() + 1).toString(36).substring(7) + "_mesin",
    dir: "masalah",
  });

  if (uploadFoto.status == false) {
    return res.status(400).json({
      status: 400,
      message: "Foto gagal di upload",
    });
  } else {
    await model.adupi.masalah
      .create({
        jenisMasalah: req.body.jenisMasalah,
        foto: uploadFoto.url,
        deskripsi: req.body.deskripsi,
        status: "Dalam peninjauan",
        mitraCode: req.mitraCode,
      })
      .then(function (masalah) {
        if (masalah) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil menambah data masalah",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal menambah data masalah",
          });
        }
      });
  }
};

export const editMasalah = async (req, res, next) => {
  try {
    const masalah = await model.adupi.masalah.findOne({
      where: {
        masalahCode: req.params.masalahCode,
        mitraCode: req.mitraCode,
        deleteAt: null,
      },
    });
    if (!masalah) {
      return res.status(404).json({
        status: 404,
        message: "Masalah tidak ditemukan",
      });
    } else {
      if (masalah.status == "Selesai") {
        return res.status(400).json({
          status: 400,
          message: "Data tidak dapat diubah, masalah telah selesai",
        });
      }
    }
    let urlFoto = masalah.foto;
    if (masalah.foto != req.body.foto) {
      let uploadFoto = await saveImage({
        imageBase64: req.body.foto.replace(/^data:image\/\w+;base64,/, ""),
        extImage: req.body.foto.split(";")[0].split("/")[1],
        nameImage: (Math.random() + 1).toString(36).substring(7) + "_masalah",
        dir: "masalah",
      });

      if (uploadFoto.status == false) {
        return res.status(400).json({
          status: 400,
          message: "Foto gagal di upload",
        });
      } else {
        urlFoto = uploadFoto.url;
      }
    }
    await model.adupi.masalah
      .update(
        {
          jenisMasalah: req.body.jenisMasalah,
          foto: urlFoto,
          deskripsi: req.body.deskripsi,
          status: "Dalam peninjauan",
          updateAt: new Date(),
        },
        {
          where: {
            masalahCode: req.params.masalahCode,
            deleteAt: null,
          },
        }
      )
      .then(function (masalah) {
        if (masalah) {
          return res.status(200).json({
            status: 200,
            message: "Berhasilr data masalah",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal merubah data masalah",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Masalah tidak ditemukan",
    });
  }
};

export const deleteMasalah = async (req, res, next) => {
  try {
    const masalah = await model.adupi.masalah.findOne({
      where: {
        masalahCode: req.params.masalahCode,
        mitraCode: req.mitraCode,
        deleteAt: null,
      },
    });
    if (!masalah) {
      return res.status(404).json({
        status: 404,
        message: "Masalah tidak ditemukan",
      });
    } else {
      if (masalah.status == "Selesai") {
        return res.status(400).json({
          status: 400,
          message: "Data tidak dapat dihapus, masalah telah selesai",
        });
      }
    }
    await model.adupi.masalah
      .update(
        {
          deleteAt: new Date(),
        },
        {
          where: {
            masalahCode: req.params.masalahCode,
            deleteAt: null,
          },
        }
      )
      .then(function (masalah) {
        if (masalah) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil menghapus data masalah",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal menghapus data masalah",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Masalah tidak ditemukan",
    });
  }
};

export const updateStatusMasalah = async (req, res, next) => {
  try {
    const masalah = await model.adupi.masalah.findOne({
      where: {
        masalahCode: req.params.masalahCode,
        deleteAt: null,
      },
    });
    if (!masalah) {
      return res.status(404).json({
        status: 404,
        message: "Masalah tidak ditemukan",
      });
    } else {
      if (masalah.status == "Selesai") {
        return res.status(400).json({
          status: 400,
          message: "Data tidak dapat diubah, masalah telah selesai",
        });
      }
    }
    await model.adupi.masalah
      .update(
        {
          status: "Selesai",
          updateAt: new Date(),
        },
        {
          where: {
            masalahCode: req.params.masalahCode,
            deleteAt: null,
          },
        }
      )
      .then(function (masalah) {
        if (masalah) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil merubah status data masalah",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal merubah status data masalah",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Masalah tidak ditemukan",
    });
  }
};
