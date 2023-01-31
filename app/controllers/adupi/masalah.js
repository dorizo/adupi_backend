import { QueryTypes } from "sequelize";
import db from "../../config/database.js";
import { model } from "../../models/index.js";
import { saveImage } from  "../../utils/saveImage.js"

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
          order: [["masalahCode", "DESC"]],
        });
      }
    } else {
      masalah = await model.adupi.masalah.findAll({
        where: {
          mitraCode: req.mitraCode,
          deleteAt: null,
        },
        order: [["masalahCode", "DESC"]],
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


export const getAllMasalahAdmin = async (req, res, next) => {
  try {
    let masalah;
    masalah = await model.adupi.masalah.findAll({
          where: {
            mitraCode: req.params.mitraCode,
            deleteAt: null,
          },
          order: [["masalahCode", "DESC"]],
        });
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

export const getAllMasalahstatuscount = async (req, res, next) => {
  const masalah = await model.adupi.masalah.count({
    where: {
      status: "dalam peninjauan",
      deleteAt: null,
    },
    include :model.adupi.mitra
  });
  const masalahselesai = await db.query("select count(*) as x from masalah where status='selesai' AND MONTH(updateAt) = DATE_FORMAT(NOW() ,'%m') AND YEAR(updateAt) = DATE_FORMAT(NOW() ,'%Y') ",{
    type: QueryTypes.SELECT
   });
  //  model.adupi.masalah.count({
  //   where: {
  //     status: "selesai",
  //     deleteAt: null,
  //     // [
  //     //   Sequelize.where(Sequelize.fn('MONTH', Sequelize.col('updateAt')), 1),
  //     // ]
  //   },
  //   include :model.adupi.mitra
  // }); WHERE fasilitator_logsDate = DATE_FORMAT(NOW() ,'%Y-%m-%d')
  const faslitatorkunjungan = await db.query("SELECT count(*) as total FROM (select * from fasilitator_logs WHERE fasilitator_logsDate = DATE_FORMAT(NOW() ,'%Y-%m-%d') GROUP BY fasilitator_logsDate , fasilitatorCode desc) x");
  
  return res.status(200).json({
    status: 200,
    message: "Masalah ditemukan",
    data: {"selesai":masalahselesai[0]?masalahselesai[0]?.x:0 , "belum": masalah,  "faslilitator" :faslitatorkunjungan[0][0]?faslitatorkunjungan[0][0]?.total:0  },
  });
}
export const getalllogfasilitator = async (req,res,next) => {
  const faslitatorkunjungan = await db.query("select a.* , b.nama  from fasilitator_logs a JOIN fasilitator b ON b.fasilitatorCode=a.fasilitatorCode  WHERE fasilitator_logsDate = DATE_FORMAT(NOW() ,'%Y-%m-%d')  GROUP BY b.nama");
  
  return res.status(200).json({
    status: 200,
    message: "Masalah ditemukan",
    data: faslitatorkunjungan[0],
  });
}
export const getAllMasalahstatus = async (req, res, next) => {
  console.log(req.params.status);
  try {
    let masalah;
    if (req.params.status == "0") {
      if (req.params.status == null) {
        return res.status(400).json({
          status: 400,
          message: "Kode mitra dibutuhkan",
        });
      } else {
        masalah = await model.adupi.masalah.findAll({
          where: {
            status: req.params.status,
            deleteAt: null,
          },
          include :model.adupi.mitra
        });
      }
    } else {
      masalah = await model.adupi.masalah.findAll({
        where: {
          status: req.params.status,
          deleteAt: null,
        },order: [
          ["createAt", "DESC"],
        ],
        include :model.adupi.mitra
      });
    }
    const allmasalahku = Array();
    masalah.forEach((element,index) => {
     
      // allmasalahku[index] = element;
      allmasalahku[index] = ( {
        "masalahCode": element.masalahCode,
        "jenisMasalah": element.jenisMasalah,
        "foto": element.foto,
        "deskripsi": element.deskripsi,
        "status": element.status,
        "note": element.note,
        "mitraCode": element.mitraCode,
        "createAt": element.createAt,
        "updateAt": element.updateAt,
        "deleteAt": element.deleteAt,
        "nama" : element.mitra.nama,
        "mitra" : element.mitra,
      });
    });
    console.log(allmasalahku);
    return res.status(200).json({
      status: 200,
      message: "Masalah ditemukanss",
      data: allmasalahku,
    });
  } catch (error) {
    console.log(error);
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

export const fasilitatoreditmasalah = async (req,res,next) =>{
  console.log(req.body);
  await model.adupi.masalah
      .update(
        {
          note: req.body.note,
          status: req.body.status,
          updateAt: req.body.status=="selesai"?new Date():null,
        },
        {
          where: {
            masalahCode: req.body.masalahCode,
            deleteAt: null,
          },
        }
      )
      .then(function (masalah) {
        console.log(masalah);
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
}

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

export const updateStatusMasalahtanggal =async (req, res, next) => {
  try {
    await model.adupi.masalah
    .update(
      req.body,
      {
        where: {
          masalahCode: req.body.masalahCode,
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
    console.log(error)
  }

}
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
