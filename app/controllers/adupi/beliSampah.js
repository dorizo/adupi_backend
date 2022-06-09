import { model } from "../../models/index.js";
import db from "../../config/database.js";
import { Sequelize } from "sequelize";
const op = Sequelize.Op;

export const addBeliSampah = async (req, res, next) => {
  let transaction;
  transaction = await db.transaction();
  try {
    const beliSampah = await model.adupi.beliSampah.create(
      {
        anggotaCode: req.body.anggotaCode,
        mitraCode: req.mitraCode,
        nota: req.body.nota,
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
      },
      {
        where: {
          bsCode: beliSampah.bsCode,
          deleteAt: null,
        },
        transaction
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
