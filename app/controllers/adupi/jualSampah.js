import { model } from "../../models/index.js";
import db from "../../config/database.js";
import { Sequelize } from "sequelize";
const op = Sequelize.Op;
import { saveImage } from "../../utils/saveImage.js";

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;
  return { limit, offset };
};

const getPagingData = (data, totalAll, page, limit) => {
  const totalItems = data.length;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, data, totalPages, currentPage, totalAll };
};

export const getJualSampah = (req, res) => {
  const { page, size, date } = req.query;
  var condition = date ? { createAt: { [op.like]: `%${date}%` } } : {};
  let conditionAll;
  if (req.mitraCode == "0") {
    if (req.params.mitraCode == null) {
      return res.status(400).json({
        status: 400,
        message: "Kode mitra dibutuhkan",
      });
    } else {
      condition = {
        ...condition,
        deleteAt: null,
        mitraCode: req.params.mitraCode,
      };
      conditionAll = {
        deleteAt: null,
        mitraCode: req.params.mitraCode,
      };
    }
  } else {
    condition = { ...condition, deleteAt: null, mitraCode: req.mitraCode };
    conditionAll = { deleteAt: null, mitraCode: req.mitraCode };
  }
  const { limit, offset } = getPagination(page, size);
  model.adupi.jualSampah
    .findAll({
      where: condition,
      include: [
        {
          model: model.adupi.detailJualSampah,
          required: true,
          where: {
            deleteAt: null,
          },
          include: [
            {
              model: model.adupi.master.jenisSampah,
              on: {
                col1: Sequelize.where(Sequelize.col("detail_jual_sampahs.jenisCode"), "=", Sequelize.col("detail_jual_sampahs.jenis_sampah.jsCode")),
              }
              // where:["jsCode=jenisCode"]
              
            },
          ],
        },
        {
          model: model.adupi.pembeli,
        }
      ],
      limit,
      offset,
      order: [["jsCode", "DESC"]],
    })
    .then(async (data) => {
      const totalAll = await model.adupi.beliSampah.findAll({
        where: conditionAll,
        include: [
          {
            model: model.adupi.detailBeliSampah,
            where: {
              deleteAt: null,
            },
            include: [
              {
                model: model.adupi.master.jenisSampah,
              },
            ],
          },
        ],
      });
      const response = await getPagingData(data, totalAll.length, page, limit);
      return res.status(200).json({
        status: 200,
        message: "",
        data: response,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: 500,
        message: "Gagal menampilkan data",
      });
    });
};

export const addJualSampah = async (req, res, next) => {
  let transaction;
  transaction = await db.transaction();
  try {
    let uploadFoto = await saveImage({
      imageBase64: req.body.nota.replace(/^data:image\/\w+;base64,/, ""),
      extImage: req.body.nota.split(";")[0].split("/")[1],
      nameImage: (Math.random() + 1).toString(36).substring(7) + "_penjualan",
      dir: "penjualan",
    });

    if (uploadFoto.status == false) {
      await transaction.rollback();
      return res.status(400).json({
        status: 400,
        message: "Foto nota gagal di upload",
      });
    } else {
      const jualSampah = await model.adupi.jualSampah.create(
        {
          pembeliCode: req.body.pembeliCode,
          mitraCode: req.mitraCode,
          nota: uploadFoto.url,
        },
        { transaction }
      );

      const detail = req.body.detail;
      let returnToInsert = [];
      let totalBerat = 0;
      let totalHarga = 0;
      detail.forEach((item) => {
        let tempTotal = parseInt(item.berat) * parseInt(item.harga);
        totalHarga = totalHarga + tempTotal;
        totalBerat = totalBerat + parseInt(item.berat);
        let tempDetail = {
          jenisCode: item.jenisCode,
          berat: item.berat,
          harga: item.harga,
          jsCode: jualSampah.jsCode,
          total: tempTotal,
        };
        returnToInsert.push(tempDetail);
      });
      await model.adupi.detailJualSampah.bulkCreate(returnToInsert, {
        transaction,
      });

      await model.adupi.jualSampah.update(
        {
          totalHarga: totalHarga,
          totalBerat: totalBerat,
          updateAt: new Date(),
          createAt : req.body.createAt
        },
        {
          where: {
            jsCode: jualSampah.jsCode,
            deleteAt: null,
          },
          transaction,
        }
      );

      await transaction.commit();
      return res.status(200).json({
        status: 200,
        message: "Berhasil menambah data penjualan",
      });
    }
  } catch (err) {
    if (transaction) {
      await transaction.rollback();
      return res.status(400).json({
        status: 400,
        message: "Gagal menambah data penjualan",
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Gagal menambah data penjualan",
      });
    }
  }
};


export const editjualsampah = async (req, res, next) => {
  let transaction;
  transaction = await db.transaction();
  try {
    let uploadFoto = await saveImage({
      imageBase64: req.body.nota.replace(/^data:image\/\w+;base64,/, ""),
      extImage: req.body.nota.split(";")[0].split("/")[1],
      nameImage: (Math.random() + 1).toString(36).substring(7) + "_penjualan",
      dir: "penjualan",
    });
    await model.adupi.detailJualSampah.destroy({
      where:{
        jsCode : req.body.jsCode
      }
    },
    { transaction });

    if (uploadFoto.status == false) {
      await transaction.rollback();
      return res.status(400).json({
        status: 400,
        message: "Foto nota gagal di upload",
      });
    } else {
    
      const detail = req.body.detail;
      let returnToInsert = [];
      let totalBerat = 0;
      let totalHarga = 0;
      detail.forEach((item) => {
        let tempTotal = parseInt(item.berat) * parseInt(item.harga);
        totalHarga = totalHarga + tempTotal;
        totalBerat = totalBerat + parseInt(item.berat);
        let tempDetail = {
          jenisCode: item.jenisCode,
          berat: item.berat,
          harga: item.harga,
          jsCode: req.body.jsCode,
          total: tempTotal,
        };
        returnToInsert.push(tempDetail);
      });
      await model.adupi.detailJualSampah.bulkCreate(returnToInsert, {
        transaction,
      });

      await model.adupi.jualSampah.update(
        {
          totalHarga: totalHarga,
          totalBerat: totalBerat,
          updateAt: new Date(),
          createAt : new Date(req.body.createAt)
        },
        {
          where: {
            jsCode: req.body.jsCode,
            deleteAt: null,
          },
          transaction,
        }
      );

      await transaction.commit();
      return res.status(200).json({
        status: 200,
        message: "Berhasil menambah data penjualan",
      });
    }
  } catch (err) {
    console.log(err);
    if (transaction) {
      await transaction.rollback();
      return res.status(400).json({
        status: 400,
        message: "Gagal menambah data penjualan",
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Gagal menambah data penjualan",
      });
    }
  }
};

export const getsuJualSampah = (req, res) => {
  const { page, size, date } = req.query;
  var condition = date ? { createAt: { [op.like]: `%${date}%` } } : {};
  let conditionAll;
  if (req.mitraCode == "0") {
    if (req.params.mitraCode == null) {
      return res.status(400).json({
        status: 400,
        message: "Kode mitra dibutuhkan",
      });
    } else {
      condition = {
        ...condition,
        deleteAt: null,
      };
      conditionAll = {
        deleteAt: null,
      };
    }
  } else {
    condition = { ...condition, deleteAt: null};
    conditionAll = { deleteAt: null};
  }
  const { limit, offset } = getPagination(page, size);
  model.adupi.jualSampah
    .findAll({
      where: condition,
      include: [
        {
          model: model.adupi.detailJualSampah,
          where: {
            deleteAt: null,
          },
          include: [
            {
              model: model.adupi.master.jenisSampah,
            },
          ],
        },
        {
          model: model.adupi.pembeli,
        },
        {
          model: model.adupi.mitra,
          include:[
            {
              model:model.adupi.usaha
            }
          ]
        },
      ],
      limit,
      offset,
      order: [["jsCode", "DESC"]],
    })
    .then(async (data) => {
      const totalAll = await model.adupi.beliSampah.findAll({
        where: conditionAll,
        include: [
          {
            model: model.adupi.detailBeliSampah,
            where: {
              deleteAt: null,
            },
            include: [
              {
                model: model.adupi.master.jenisSampah,
              },
            ],
          },
        ],
      });
      const response = await getPagingData(data, totalAll.length, page, limit);
      return res.status(200).json({
        status: 200,
        message: "",
        data: response,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: 500,
        message: "Gagal menampilkan data",
      });
    });
};