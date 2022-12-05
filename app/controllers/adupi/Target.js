import { QueryTypes } from "sequelize";
import db from "../../config/database.js"
import { saveImage } from "../../utils/saveImage.js";
export const viewalltarget = async (req,res) => {

    // Sequelize.query("select ") 
    const targetmitra = await db.query(
      'Select a.*, mt.* , ush.namaUsaha , DATE_FORMAT(MitraTargetTanggal,"%Y-%M") as targettangal ,(SELECT COALESCE(sum(b.totalBerat),0) FROM beli_sampah b WHERE b.mitraCode=a.mitraCode AND DATE_FORMAT(b.createAt,"%Y-%m") = DATE_FORMAT(a.MitraTargetTanggal,"%Y-%m")) x  FROM MitraTarget a JOIN mitra mt ON mt.mitraCode=a.mitraCode JOIN usaha ush ON ush.mitraCode=mt.mitraCode  order by MitraTargetTanggal desc',
      {
        replacements: { tanggal: req.body.tanggal },
        type: QueryTypes.SELECT,
        // plain: true
      }
    );
    return res.status(200).json({
      status: 200,
      message: "Target ALL",
      data: targetmitra,
    });
  };
  
export const viewtargetpermitra = async (req,res) => {

  console.log(req.body);
  if(req.body.mitraCode){
    const targetmitra = await db.query(
        'SELECT * , (MitraTargetName - total_berat) as selisih FROM (Select a.MitraTargetName ,  DATE_FORMAT(a.MitraTargetTanggal , "%M") as tanggal FROM MitraTarget a JOIN mitra b ON b.mitraCode=a.mitraCode WHERE DATE_FORMAT(MitraTargetTanggal , "%Y-%M") = DATE_FORMAT(:tanggal , "%Y-%M") AND a.mitraCode=:mitraCode) mit , (SELECT COALESCE(sum(a.totalBerat),0) as total_berat FROM `beli_sampah` a WHERE a.mitraCode=:mitraCode AND DATE_FORMAT(a.createAt,"%Y-%m") = DATE_FORMAT(:tanggal,"%Y-%m")) beratbeli ',
          {
            replacements: { tanggal: req.body.tanggal , mitraCode : req.body.mitraCode  },
            type: QueryTypes.SELECT,
            plain: true
          }
    );
  return res.status(200).json({
    status: 200,
    message: "Target Singgle",
    data: targetmitra,
  });

  }
  };
  export const viewdashbordtarget = async (req,res) => {

    console.log(req.body);
    if(req.body.mitraCode){
      const targetmitra = await db.query(
          'SELECT * , (MitraTargetName - total_berat) as selisih FROM (Select a.MitraTargetName ,  DATE_FORMAT(a.MitraTargetTanggal , "%M") as tanggal FROM MitraTarget a JOIN mitra b ON b.mitraCode=a.mitraCode WHERE DATE_FORMAT(MitraTargetTanggal , "%Y-%M") = DATE_FORMAT(:tanggal , "%Y-%M") AND a.mitraCode=:mitraCode) mit , (SELECT COALESCE(sum(a.totalBerat),0) as total_berat FROM `beli_sampah` a WHERE DATE_FORMAT(a.createAt,"%Y-%m") = DATE_FORMAT(:tanggal,"%Y-%m")) beratbeli ',
            {
              replacements: { tanggal: req.body.tanggal},
              type: QueryTypes.SELECT,
              plain: true
            }
      );
    return res.status(200).json({
      status: 200,
      message: "Target Singgle",
      data: targetmitra,
    });
  
    }
    };
  

  export const savetarget = async (req,res) => {

    try {
      const targetmitra = await db.query(
        'INSERT INTO `MitraTarget`( `MitraCode`, `MitraTargetName`, `MitraTargetTanggal`) VALUES ( ?, ?, LEFT(?,10))',
        {
          type: QueryTypes.INSERT,
          replacements: [ req.body.mitraCode ,  req.body.MitraTargetName ,  req.body.MitraTargetTanggal  ],
          // plain: true
        }
      );
      return res.status(200).json({
        status: 200,
        message: "Insert target",
        data: targetmitra,
      });
      
    } catch (error) {
    
      return res.status(400).json({
        status: 400,
        message: "Insert gagal",
      });
    }
    // Sequelize.query("select ") 
   
  };
  
  export const updatetarget = async (req,res) => {

    try {
      const targetmitra = await db.query(
        'UPDATE `MitraTarget` SET `MitraCode` = ?, `MitraTargetName` = ?, `MitraTargetTanggal` = LEFT(? , 10) WHERE `MitraTargetCode` = ?',
        {
          type: QueryTypes.INSERT,
          replacements: [ req.body.mitraCode ,  req.body.MitraTargetName ,  req.body.MitraTargetTanggal , req.body.MitraTargetCode ],
          // plain: true
        }
      );
      return res.status(200).json({
        status: 200,
        message: "Update target Berhasil",
        data: targetmitra,
      });
      
    } catch (error) {
    
      return res.status(400).json({
        status: 400,
        message: "Update Target gagal",
      });
    }
    // Sequelize.query("select ") 
   
  };
  


  export const getsinglemitra = async (req,res) => {

    // Sequelize.query("select ") 
    const targetmitra = await db.query(
      'Select * FROM MitraTarget a JOIN mitra b ON b.mitraCode=a.mitraCode WHERE DATE_FORMAT(MitraTargetTanggal , "%Y-%M") = DATE_FORMAT(:tanggal , "%Y-%M") AND a.mitraCode=:mitraCode ',
      {
        replacements: { tanggal: req.body.tanggal , mitraCode : req.body.mitraCode  },
        type: QueryTypes.SELECT,
        plain: true
      }
    );
    return res.status(200).json({
      status: 200,
      message: "Target Singgle",
      data: targetmitra,
    });
  };
export const viewsingle = async (req,res) => {

    // Sequelize.query("select ") 
    const targetmitra = await db.query(
      'Select * FROM MitraTarget a JOIN mitra b ON b.mitraCode=a.mitraCode WHERE DATE_FORMAT(MitraTargetTanggal , "%Y-%M") = DATE_FORMAT(:tanggal , "%Y-%M") ',
      {
        replacements: { tanggal: req.body.tanggal },
        type: QueryTypes.SELECT,
        plain: true
      }
    );
    return res.status(200).json({
      status: 200,
      message: "Target Singgle",
      data: targetmitra,
    });
  };
  export const deletetarget = async(req,res) => {
    const targetmitra = await db.query(
      'delete from MitraTarget where MitraTargetCode=:id ',
      {
        replacements: { id: req.body.id },
        type: QueryTypes.DELETE,
      }
    );
    return res.status(200).json({
      status: 200,
      message: "Target Singgle",
      data: targetmitra,
    });
  }
  export const lampiran = async(req,res) => {
    const array = [];
    const targetmitra = await db.query(
      'Select * FROM mitraLampiran',
      {
        type: QueryTypes.SELECT,
      }
    );
    const targetmitrac = await db.query(
      'Select * FROM MitraLampiranImage where MitraCode=:MitraCode',
      {
        
        replacements: { MitraCode: req.params.MitraCode },
        type: QueryTypes.SELECT,
      }
    );
    targetmitra.forEach((element,key) => {
    array[key] = element;
    array[key]["mitra"]  = targetmitrac.filter(o => o.MitraLampiranCode === element.mitraLampiranCode);
    });
    
    return res.status(200).json({
      status: 200,
      message: "Target Singgle",
      data: array,
    });
  }
  
  export const lampiransave = async (req,res) => {


    let uploadFoto = await saveImage({
      imageBase64: req.body.MitraLampiranImageFoto.replace(/^data:image\/\w+;base64,/, ""),
      extImage: req.body.MitraLampiranImageFoto.split(";")[0].split("/")[1],
      nameImage: (Math.random() + 1).toString(36).substring(7) + "_mesin",
      dir: "mesin",
    });
    try {
      const targetmitra = await db.query(
        'INSERT INTO `MitraLampiranImage`( `MitraLampiranImageKeterangan`, `MitraLampiranImageFoto`, `MitraLampiranCode`, `MitraCode`) VALUES ( ?, ?, ?,?)',
        {
          type: QueryTypes.INSERT,
          replacements: [ req.body.MitraLampiranImageKeterangan ,  uploadFoto.url ,  req.body.MitraLampiranCode ,  req.body.MitraCode  ],
          // plain: true
        }
      );
      return res.status(200).json({
        status: 200,
        message: "Insert target",
        data: targetmitra,
      });
      
    } catch (error) {
    
      return res.status(400).json({
        status: 400,
        message: "Insert gagal kenapa",
      });
    }
  };
  export const lampirandelete = async(req,res) => {
    const targetmitra = await db.query(
      'delete from MitraLampiranImage where MitraLampiranImageCode=:id ',
      {
        replacements: { id: req.body.id },
        type: QueryTypes.DELETE,
      }
    );
    return res.status(200).json({
      status: 200,
      message: "Target Singgle",
      data: targetmitra,
    });
  }