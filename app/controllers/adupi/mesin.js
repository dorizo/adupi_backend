import { model } from "../../models/index.js";
import { saveImage } from "../../utils/saveImage.js";

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
  let uploadFoto = await saveImage({
    imageBase64: req.body.foto.replace(/^data:image\/\w+;base64,/, ""),
    extImage: req.body.foto.split(";")[0].split("/")[1],
    nameImage: (Math.random() + 1).toString(36).substring(7) + "_mesin",
    dir: "mesin",
  });

  if (uploadFoto.status == false) {
    return res.status(400).json({
      status: 400,
      message: "Foto gagal di upload",
    });
  } else {
    await model.adupi.mesin
      .create({
        usahaCode: req.body.usahaCode,
        jenisMesin: req.body.jenisMesin,
        statusKepemilikanMesin: req.body.statusKepemilikanMesin,
        kapasitas: req.body.kapasitas,
        foto: uploadFoto.url,
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
  }
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
    let urlFoto = mesin.foto;
    if (mesin.foto != req.body.foto) {
      let uploadFoto = await saveImage({
        imageBase64: req.body.foto.replace(/^data:image\/\w+;base64,/, ""),
        extImage: req.body.foto.split(";")[0].split("/")[1],
        nameImage: (Math.random() + 1).toString(36).substring(7) + "_mesin",
        dir: "mesin",
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
    await model.adupi.mesin
      .update(
        {
          jenisMesin: req.body.jenisMesin,
          statusKepemilikanMesin: req.body.statusKepemilikanMesin,
          kapasitas: req.body.kapasitas,
          foto: urlFoto,
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
