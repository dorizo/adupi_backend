import { model } from "../../models/index.js"
import db from "../../config/database.js";
import { Sequelize } from "sequelize";
const op = Sequelize.Op;
export const getAllpembelian = async (req, res, next) => {

    try {
    let params = [];
     await model.adupi.mitra.findAll({
            attributes: [
                "mitraCode",
                "nama",
                "ktp",
            ],
            where:{
                    fasilitatorcode:{
                        [op.ne]:null

                    } 
                
            }
    }).then(async(result) => {
            for (let song of result) {
                try {
                    let cartItem3 = {}
                    const as = await model.adupi.anggota.findAll({
                        attributes: {                            
                                  include: [[Sequelize.fn("SUM", Sequelize.col("beli_sampahs.totalBerat")), "totalBerat"]] 
                        },
                        where:{
                            mitraCode : song.mitraCode  
                        },
                        group: "anggotaCode",
                        include:[{model:model.adupi.beliSampah,
                            attributes: [] 
                            , 
                            where:{
                                createAt : {
                                    [op.between]:[req.body.tanggalawal ,req.body.tanggalakhir+ ' 23:59:59' ]
                                }

                             }
                    }]
                    }
                    );
                    cartItem3.nama = song.nama;
                    cartItem3.anggota = as;
                    params.push(cartItem3);
                } catch (error) {
                    console.error(error);    
                }
                
            }    
        return res.status(200).json({
            status: 200,
            message: 'berhasil',
            data: params,
          });
    });
    
    
        
    } catch (error) {
        return res.status(404).json({
            status: 404,
            message: error,
          });
         
    }
   }