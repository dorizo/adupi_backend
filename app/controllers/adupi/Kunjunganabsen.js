import Sequelize, { Op } from "sequelize";
import { model } from "../../models/index.js";
const { DataTypes, literal } = Sequelize;
export const addKunjunganAbsen = async (req, res, next) => {
    await model.adupi.kunjunganAbsen.create({
        kunjungan_absen_name: req.body.kunjungan_absen_name,
        kunjungan_absen_date: req.body.kunjungan_absen_date,
        kunjungan_absen_status: req.body.kunjungan_absen_status,
        mitraCode: req.body.mitraCode,
      }).then(function(hasil){
        if (hasil) {
          return res.status(200).json({
            status: 200,
            message: "Berhasil menambah data Kunjungan Mitra",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Gagal menambah data kunjungan Mitra",
          });
        }
      });
}
export const viewKunjunganAbsen = async (req , res , next) => {
 const kunjungan =  await model.adupi.kunjunganAbsen.findAll(
    {
      where:{
      //  [Op.and]:[ 
        mitraCode : req.params.mitraCode,
        kunjungan_absen_date : req.params.tanggal
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
