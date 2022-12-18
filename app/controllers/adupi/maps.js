import { model } from "../../models/index.js"
import db from "../../config/database.js";
import { Sequelize } from "sequelize";
const op = Sequelize.Op;

export const getAllpembelian = async (req, res, next) => {
    // console.log("kok" ,req.body.mitraCode );
    try {
    let nilai;
    if(req.body.mitraCode !== undefined &&  req.body.mitraCode !== "" &&  req.body.mitraCode !== null ){
        nilai = model.adupi.mitra.findAll({
            attributes: [
                "mitraCode",
                "nama",
                "ktp",
                "wilayahCode",
            ],
            include:[{model : model.adupi.usaha}],
            where:{
                    fasilitatorcode:{
                        [op.ne]:null

                    },mitraCode : req.body.mitraCode 
                
            }
        });
    
    }else if(req.body.Provinsi !== undefined && req.body.Provinsi !== "" ){

        nilai = model.adupi.mitra.findAll({
            attributes: [
                "mitraCode",
                "nama",
                "ktp",
                "wilayahCode",
            ],
            include:model.adupi.usaha,
            where:Sequelize.where(
                Sequelize.fn('LEFT', db.col('mitra.wilayahCode'), 2), req.body.Provinsi //fn('left(,2)',)
            )
        });
    }else{
        nilai = model.adupi.mitra.findAll({
            attributes: [
                "mitraCode",
                "nama",
                "ktp",
                "wilayahCode",
                [Sequelize.fn('LEFT', Sequelize.col('mitra.wilayahCode') ,8), "BBBB"]
             
            ],
            include:[
                {
                model : model.adupi.usaha,
                },
                {
                attributes:[
                        "wilayah",
                        "wilayahCode"
                ],
                model:model.adupi.wilayah,
                as : 'wilayahs',
                on: {
                    col1: Sequelize.where(Sequelize.fn('LEFT',Sequelize.col("mitra.wilayahCode") ,2), "=", Sequelize.col("wilayahs.wilayahCode")),
                  }, 
                //   required: false, 
                },
                {
                attributes:[
                        "wilayah",
                        "wilayahCode"
                ],
                model:model.adupi.wilayah,
                as : 'kabupaten',
                on: {
                    col1: Sequelize.where(Sequelize.fn('LEFT',Sequelize.col("mitra.wilayahCode") ,5), "=", Sequelize.col("kabupaten.wilayahCode")),
                  }, 
                //   required: false, 
                },
                
            ],
            where:{
                    fasilitatorcode:{
                        [op.ne]:null

                    } 
                
            }
    }); 
    }
    // console.log("mem",nilai);
    let params = [];
     await nilai.then(async(result) => {
        
        for (let song of result) {
            console.log(song.mitraCode);
        }
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
                    cartItem3.nama = song;
                    // cartItem3.long = song?.usahas[0]?.lang;
                    // cartItem3.lat = song?.usahas[0]?.lat;
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
        console.log(error);
        return res.status(404).json({
            status: 404,
            message: error,
          });
         
    }
   }