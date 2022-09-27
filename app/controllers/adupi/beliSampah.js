import { model } from "../../models/index.js";
import db from "../../config/database.js";
import { Sequelize } from "sequelize";
const op = Sequelize.Op;

export const checkMitraOrNot = async (req, res, next) => {
  const mitra = await model.adupi.mitra.findOne({
    where: {
      userCode: req.userCode,
      deleteAt: null,
    },
  });
  if (!mitra) {
    req.mitraCode = "0";
  } else {
    req.mitraCode = mitra.mitraCode;
  }
  next();
};

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

export const getBeliSampah = (req, res) => {
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
      conditionAll = { deleteAt: null, mitraCode: req.params.mitraCode };
    }
  } else {
    condition = { ...condition, deleteAt: null, mitraCode: req.mitraCode };
    conditionAll = { deleteAt: null, mitraCode: req.mitraCode };
  }
  
  const { limit, offset } = getPagination(page, size);
  model.adupi.beliSampah
    .findAll({
      where: condition,
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
        },{
          model : model.adupi.anggota
        }
      ],
      limit,
      offset,
      order: [
        ['bsCode', 'DESC']
    ],
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

export const addBeliSampah = async (req, res, next) => {
  let transaction;
  transaction = await db.transaction();
  try {
    const beliSampah = await model.adupi.beliSampah.create(
      {
        anggotaCode: req.body.anggotaCode,
        mitraCode: req.mitraCode,
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
        sumber: item.sumber,
        jsCode: item.jsCode,
        berat: item.berat,
        harga: item.harga,
        bsCode: beliSampah.bsCode,
        total: tempTotal,
        createAt: req.body.createAt,
      };
      returnToInsert.push(tempDetail);
    });
    await model.adupi.detailBeliSampah.bulkCreate(returnToInsert, {
      transaction,
    });


    await model.adupi.beliSampah.update(
      {
        totalHarga: totalHarga,
        totalBerat: totalBerat,
        updateAt: new Date(),
        createAt: req.body.createAt,
      },
      {
        where: {
          bsCode: beliSampah.bsCode,
          deleteAt: null,
        },
        transaction,
      }
    );

    await transaction.commit();
    return res.status(200).json({
      status: 200,
      message: "Berhasil menambah data pembelian",
    });
  } catch (err) {
    if (transaction) {
      await transaction.rollback();
      return res.status(400).json({
        status: 400,
        message: "Gagal menambah data pembelian",
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Gagal menambah data pembelian",
      });
    }
  }
};
export const editBeliSampah = async(req,res,next) => {
  // console.log(req.body);
  
  let transaction;
  transaction = await db.transaction();
  try {
    await model.adupi.detailBeliSampah.destroy({
      where:{
        bsCode : req.body.bsCode
      }
    },
    { transaction });

    const detail = req.body.detail;
    let returnToInsert = [];
    let totalBerat = 0;
    let totalHarga = 0;
    detail.forEach((item) => {
      let tempTotal = parseInt(item.berat) * parseInt(item.harga);
      totalHarga = totalHarga + tempTotal;
      totalBerat = totalBerat + parseInt(item.berat);
      let tempDetail = {
        sumber: item.sumber,
        jsCode: item.jsCode,
        berat: item.berat,
        harga: item.harga,
        bsCode: req.body.bsCode,
        total: tempTotal,
        createAt: new Date(),
      };
      returnToInsert.push(tempDetail);
    });
    await model.adupi.detailBeliSampah.bulkCreate(returnToInsert, {
      transaction,
    });


    await model.adupi.beliSampah.update(
      {
        totalHarga: totalHarga,
        totalBerat: totalBerat,
        updateAt: new Date(),
        createAt: new Date(req.body.createAt),
      },
      {
        where: {
          bsCode: req.body.bsCode,
          deleteAt: null,
        },
        transaction,
      }
    );

    await transaction.commit();
    return res.status(200).json({
      status: 200,
      message: "Berhasil menambah data pembelian",
    });
  } catch (err) {
    console.log(err);
    if (transaction) {
      await transaction.rollback();
      return res.status(400).json({
        status: 400,
        message: "Gagal menambah data pembelian",
      });
    } else {
      return res.status(400).json({
        status: 400,
        message: "Gagal menambah data pembelian",
      });
    }
  }
}


export const getSuperAdminBeliSampah = (req, res) => {
  const { page, size, date } = req.query;
  var condition = date ? { createAt: { [op.like]: `%${date}%` } } : {};
  let conditionAll;
  console.log(req.mitraCode);
  // if (req.mitraCode == "0") {
  //   if (req.params.mitraCode == null) {
  //     return res.status(400).json({
  //       status: 400,
  //       message: "Kode mitra dibutuhkan",
  //     });
  //   } else {
  //     condition = {
  //       ...condition,
  //       deleteAt: null,
  //     };
  //     conditionAll = { deleteAt: null, mitraCode: req.params.mitraCode };
  //   }
  // } else {
  //   condition = { ...condition, deleteAt: null, mitraCode: req.mitraCode };
  //   conditionAll = { deleteAt: null, mitraCode: req.mitraCode };
  // }
  
  const { limit, offset } = getPagination(page, size);
  model.adupi.beliSampah
    .findAll({
      where: condition,
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
        },{
          model : model.adupi.anggota
        },{
          model : model.adupi.mitra,
          include: [
            {
              model: model.adupi.usaha,
            },
          ]
        }
      ],
      limit,
      offset,
      order: [
        ['bsCode', 'DESC']
    ],
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
