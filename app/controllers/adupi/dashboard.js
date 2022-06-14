import { model } from "../../models/index.js";
import db from "../../config/database.js";
import { Sequelize, literal } from "sequelize";
import { QueryTypes } from "sequelize";
import { wilayah as wilayahUtils } from "../../utils/wilayah.js";

const op = Sequelize.Op;

export const getAllAnggota = async (req, res) => {
  try {
    let condition = {
      deleteAt: null,
      [op.and]: [
        {
          long: {
            [op.ne]: null,
          },
        },
        {
          lat: {
            [op.ne]: null,
          },
        },
      ],
    };

    const anggota = await model.adupi.anggota.findAll({
      attributes: [
        "anggotaCode",
        "nama",
        "nik",
        "noHp",
        "jenisKelamin",
        "long",
        "lat",
        "alamat",
        "wilayahCode",
        [
          db.literal(
            "(SELECT wilayah.wilayah FROM wilayah WHERE LEFT(wilayahCode,13)=anggota.wilayahCode AND CHAR_LENGTH(wilayahCode)=13 ORDER BY wilayah LIMIT 1)"
          ),
          "desa",
        ],
        [
          db.literal(
            "(SELECT wilayah.wilayah FROM wilayah WHERE LEFT(wilayahCode,8) = LEFT(anggota.wilayahCode,8) AND CHAR_LENGTH(wilayahCode) = 8 ORDER BY wilayah LIMIT 1)"
          ),
          "kecamatan",
        ],
        [
          db.literal(
            "(SELECT wilayah.wilayah FROM wilayah WHERE LEFT(wilayahCode,5) = LEFT(anggota.wilayahCode,5) AND CHAR_LENGTH(wilayahCode) = 5 ORDER BY wilayah LIMIT 1)"
          ),
          "kabupaten",
        ],
        [
          db.literal(
            "(SELECT wilayah.wilayah FROM wilayah WHERE LEFT(wilayahCode,2) = LEFT(anggota.wilayahCode,2) AND CHAR_LENGTH(wilayahCode) = 2 ORDER BY wilayah LIMIT 1)"
          ),
          "provinsi",
        ],
      ],
      where: condition,
      include: [
        {
          model: model.adupi.mitra,
          attributes: ["nama", "noHp", "jenisMitra"],
          where: {
            deleteAt: null,
          },
          include: [
            {
              model: model.adupi.usaha,
              attributes: [
                "namaUsaha",
                "noSuratIzinUsaha",
                "statusKepemilikanGudang",
                "luasGudang",
                "lamaOperasional",
                "jumlahPekerja",
                "alamat",
                "lang",
                "lat",
              ],
              where: {
                deleteAt: null,
              },
            },
          ],
        },
      ],
    });

    return await res.status(200).json({
      status: 200,
      message: "",
      data: anggota,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Gagal menapilkan data",
    });
  }
};

export const getAllAnggotaByWilayah = async (req, res) => {
  try {
    let condition = {
      deleteAt: null,
      [op.and]: [
        {
          long: {
            [op.ne]: null,
          },
        },
        {
          lat: {
            [op.ne]: null,
          },
        },
        {
          wilayahCode: {
            [op.like]: req.params.wilayahCode + "%",
          },
        },
      ],
    };

    const anggota = await model.adupi.anggota.findAll({
      attributes: [
        "anggotaCode",
        "nama",
        "nik",
        "noHp",
        "jenisKelamin",
        "long",
        "lat",
        "alamat",
        "wilayahCode",
        [
          db.literal(
            "(SELECT wilayah.wilayah FROM wilayah WHERE LEFT(wilayahCode,13)=anggota.wilayahCode AND CHAR_LENGTH(wilayahCode)=13 ORDER BY wilayah LIMIT 1)"
          ),
          "desa",
        ],
        [
          db.literal(
            "(SELECT wilayah.wilayah FROM wilayah WHERE LEFT(wilayahCode,8) = LEFT(anggota.wilayahCode,8) AND CHAR_LENGTH(wilayahCode) = 8 ORDER BY wilayah LIMIT 1)"
          ),
          "kecamatan",
        ],
        [
          db.literal(
            "(SELECT wilayah.wilayah FROM wilayah WHERE LEFT(wilayahCode,5) = LEFT(anggota.wilayahCode,5) AND CHAR_LENGTH(wilayahCode) = 5 ORDER BY wilayah LIMIT 1)"
          ),
          "kabupaten",
        ],
        [
          db.literal(
            "(SELECT wilayah.wilayah FROM wilayah WHERE LEFT(wilayahCode,2) = LEFT(anggota.wilayahCode,2) AND CHAR_LENGTH(wilayahCode) = 2 ORDER BY wilayah LIMIT 1)"
          ),
          "provinsi",
        ],
      ],
      where: condition,
      include: [
        {
          model: model.adupi.mitra,
          attributes: ["nama", "noHp", "jenisMitra"],
          where: {
            deleteAt: null,
          },
          include: [
            {
              model: model.adupi.usaha,
              attributes: [
                "namaUsaha",
                "noSuratIzinUsaha",
                "statusKepemilikanGudang",
                "luasGudang",
                "lamaOperasional",
                "jumlahPekerja",
                "alamat",
                "lang",
                "lat",
              ],
              where: {
                deleteAt: null,
              },
            },
          ],
        },
      ],
    });

    return await res.status(200).json({
      status: 200,
      message: "",
      data: anggota,
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      message: "Gagal menapilkan data",
    });
  }
};

export const getDetailTransaksi = async (req, res) => {
    try {
      const transaksi = await model.adupi.beliSampah.findAll({
        where: {
            deleteAt: null,
            anggotaCode: req.params.anggotaCode
        },
        include: [
            {
              model: model.adupi.detailBeliSampah,
              where: {
                deleteAt: null,
              },
            }
        ]
      });
  
      return await res.status(200).json({
        status: 200,
        message: "",
        data: transaksi,
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: "Gagal menapilkan data",
      });
    }
  };