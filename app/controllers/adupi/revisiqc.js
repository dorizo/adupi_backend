import { QueryTypes } from "sequelize";
import db from "../../config/database.js"
import { model } from "../../models/index.js";
import { saveImage } from "../../utils/saveImage.js";

export const editMitra = async (req, res, next) => {
    console.log(req.body);
    await model.adupi.mitra.update(
        req.body,
        {
            where: {
                mitraCode: req.body.mitraCode,
                deleteAt: null,
            },
        },    
    ) .then(function (pembeli) {
        if (pembeli) {
        return res.status(200).json({
            status: 200,
            message: "Berhasil mengubah data Mitra",
        });
        } else {
        return res.status(400).json({
            status: 400,
            message: "Gagal merubah data Mitra",
        });
        }
    });
}


export const editusaha = async (req, res, next) => {
    console.log(req.body);
    await model.adupi.usaha.update(
        req.body,
        {
            where: {
                usahaCode: req.body.usahaCode,
                deleteAt: null,
            },
        },    
    ) .then(function (pembeli) {
        if (pembeli) {
        return res.status(200).json({
            status: 200,
            message: "Berhasil mengubah data Usaha",
        });
        } else {
        return res.status(400).json({
            status: 400,
            message: "Gagal merubah data Usaha",
        });
        }
    });
}


export const editnonmitra = async (req, res, next) => {
    console.log(req.body);
    await model.adupi.kunjungan.update(
        req.body,
        {
            where: {
                kunjunganCode: req.body.kunjunganCode,
                deleteAt: null,
            },
        },    
    ) .then(function (pembeli) {
        if (pembeli) {
        return res.status(200).json({
            status: 200,
            message: "Berhasil mengubah data Usaha",
        });
        } else {
        return res.status(400).json({
            status: 400,
            message: "Gagal merubah data Usaha",
        });
        }
    });
}



export const editkunjunganmitra = async (req, res, next) => {
    console.log(req.body);
    try {
        await model.adupi.kunjunganForm.update(
            req.body,
            {
                where: {
                    Kunjungan_formCode: req.body.Kunjungan_formCode,
                    createAt:null,
                },
            },    
        ) .then(function (pembeli) {
            if (pembeli) {
            return res.status(200).json({
                status: 200,
                message: "Berhasil mengubah data KUNJUNGAN MITRA",
            });
            } else {
            return res.status(400).json({
                status: 400,
                message: "Gagal merubah data KUNJUNGAN MITRA",
            });
            }
        });
    } catch (error) {
        console.log(error)
    }
   
}