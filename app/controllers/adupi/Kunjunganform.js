import Sequelize, { Op } from "sequelize";
const { DataTypes, literal } = Sequelize;
import {model } from "../../models/index.js"
export const addkunjunganForm = async (req, res, next) => {
    await model.adupi.kunjunganForm.create({
        Kunjungan_formCode: req.body.Kunjungan_formCode,
        Kunjungan_formCapaian: req.body.Kunjungan_formCapaian,
        Kunjungan_formKeterlambatan: req.body.Kunjungan_formKeterlambatan,
        Kunjungan_formHargaPembelian: req.body.Kunjungan_formHargaPembelian,
        Kunjungan_formPekerja: req.body.Kunjungan_formPekerja,
        Kunjungan_formJumlahMesin: 0,
        Kunjungan_formPendampingan: req.body.Kunjungan_formPendampingan,
        mitraCode: req.body.mitraCode,
      }).then(function(hasil){
        if (hasil) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil menambah data Kunjungan Form",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal menambah data kunjungan Form",
          });
        }
      });
}

export const cekkunjungan = async (req, res, next) => {
  const masalahselesai = await model.adupi.kunjunganForm.count({
    where: {
      mitraCode : req.params.kunjungan_absenCode,
    },
  });
  const image = await model.adupi.kunjunganimage.count({
    where: {
      kunjunganCode : req.params.kunjungan_absenCode,
      status_foto : "mitra"
    },
  })
  
  return res.status(200).json({
    status: 200,
    message: "Masalah ditemukan",
    data: {"masalahform":masalahselesai , "masalahfoto": image },
  });

}


export const addkunjunganFormupdate = async (req, res, next) => {
  await model.adupi.kunjunganForm.update({
    Kunjungan_formCode: req.body.Kunjungan_formCode,
    Kunjungan_formCapaian: req.body.Kunjungan_formCapaian,
    Kunjungan_formKeterlambatan: req.body.Kunjungan_formKeterlambatan,
    Kunjungan_formHargaPembelian: req.body.Kunjungan_formHargaPembelian,
    Kunjungan_formPekerja: req.body.Kunjungan_formPekerja,
    Kunjungan_formJumlahMesin: req.body.Kunjungan_formJumlahMesin,
    Kunjungan_formPendampingan: req.body.Kunjungan_formPendampingan,
      mitraCode: req.body.mitraCode,
    } , 
    {
      where : {
        kunjungan_absenCode: req.params.kunjungan_absenCode,
        deleteAt: null,
      }
    }).then(function(hasil){
      if (hasil) {
        return res.status(200).json({
          status: 200,
          message: "Berhasil menambah data Kunjungan Form",
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Gagal menambah data kunjungan Form",
        });
      }
    });
}


export const viewkunjunganForm = async (req , res , next) => {
 const kunjungan =  await model.adupi.kunjunganForm.findAll(
    {
      where:{
      //  [Op.and]:[ 
        mitraCode : req.params.mitraCode,
        createAt : req.params.tanggal
      // ]
      },
      order: [
        ['kunjungan_absenCode', 'DESC'],
      ],
    }
  );
  console.log(Sequelize.fn(Date()));
  if (kunjungan.length === 0) {
    return res.status(404).json({
      status: 404,
      message: "Kunjungan Data Tidak Ada",
    });
  }else{
    return res.status(200).json({
      status: 200,
      message: "Kunjungan ditemukan",
      data: kunjungan,
    });
  }

}


export const viewkunjunganimagev2 = async (req , res , next) => {
  const kunjungan =  await model.adupi.kunjunganimage.findAll(
     {
       where:{
       //  [Op.and]:[ 
         kunjunganCode : req.params.mitraCode,
         status_foto : req.params.status
       // ]
       },
       order: [
         ['kunjungan_imageCode', 'DESC'],
       ],
     }
   );
   console.log(Sequelize.fn(Date()));
   if (kunjungan.length === 0) {
     return res.status(404).json({
       status: 404,
       message: "Kunjungan Data Tidak Ada",
     });
   }else{
     return res.status(200).json({
       status: 200,
       message: "Kunjungan ditemukan",
       data: kunjungan,
     });
   }
   
 }
