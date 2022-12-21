import { model } from "../../models/index.js";
import db from "../../config/database.js";
import bcrypt from "bcrypt";
import { QueryTypes } from "sequelize";
import { Sequelize } from "sequelize";
const op = Sequelize.Op;

export const getAllMitraReport = async (req, res, next) => {
  try {
    let conditionDate;
    let literalMesin;
    let literalMasalahSelesai;
    let literalMasalahProses;
    let literalJualSampah;
    let literalBeliSampah;
    if (req.params.startDate == null || req.params.endDate == null) {
      conditionDate = {
        deleteAt: null,
      };
      literalMesin =
        "SELECT count(`mesin`.`mesinCode`) FROM `mesin` AS `mesin` WHERE `mesin`.`mitraCode` = `mitra`.`mitraCode` AND `mesin`.`deleteAt` IS NULL";
      literalMasalahSelesai =
        "SELECT count(`masalah`.`masalahCode`) FROM `masalah` AS `masalah` WHERE `masalah`.`mitraCode` = `mitra`.`mitraCode` AND `masalah`.`status` = 'Selesai' AND `masalah`.`deleteAt` IS NULL";
      literalMasalahProses =
        "SELECT count(`masalah`.`masalahCode`) FROM `masalah` AS `masalah` WHERE `masalah`.`mitraCode` = `mitra`.`mitraCode` AND `masalah`.`status` = 'Dalam peninjauan' AND `masalah`.`deleteAt` IS NULL";
      literalJualSampah =
        "SELECT count(`jual_sampah`.`jsCode`) FROM `jual_sampah` AS `jual_sampah` WHERE `jual_sampah`.`mitraCode` = `mitra`.`mitraCode` AND `jual_sampah`.`deleteAt` IS NULL";
      literalBeliSampah =
        "SELECT count(`beli_sampah`.`bsCode`) FROM `beli_sampah` AS `beli_sampah` WHERE `beli_sampah`.`mitraCode` = `mitra`.`mitraCode` AND `beli_sampah`.`deleteAt` IS NULL";
    } else {
      conditionDate = {
        createAt: {
          [op.between]: [req.params.startDate, req.params.endDate],
        },
        deleteAt: null,
      };
      literalMesin =
        "SELECT count(*) FROM `mesin` AS `mesin` WHERE `mesin`.`mitraCode` = `mitra`.`mitraCode` AND (`mesin`.`createAt` BETWEEN '" +
        req.params.startDate +
        "' AND '" +
        req.params.endDate +
        "') AND `mesin`.`deleteAt` IS NULL";
      literalMasalahSelesai =
        "SELECT count(*) FROM `masalah` AS `masalah` WHERE `masalah`.`mitraCode` = `mitra`.`mitraCode` AND `masalah`.`status` = 'Selesai' AND (`masalah`.`createAt` BETWEEN '" +
        req.params.startDate +
        "' AND '" +
        req.params.endDate +
        "') AND `masalah`.`deleteAt` IS NULL";
      literalMasalahProses =
        "SELECT count(*) FROM `masalah` AS `masalah` WHERE `masalah`.`mitraCode` = `mitra`.`mitraCode` AND `masalah`.`status` = 'Dalam peninjauan' AND (`masalah`.`createAt` BETWEEN '" +
        req.params.startDate +
        "' AND '" +
        req.params.endDate +
        "') AND `masalah`.`deleteAt` IS NULL";
      literalJualSampah =
        "SELECT count(*) FROM `jual_sampah` AS `jual_sampah` WHERE `jual_sampah`.`mitraCode` = `mitra`.`mitraCode` AND (`jual_sampah`.`createAt` BETWEEN '" +
        req.params.startDate +
        "' AND '" +
        req.params.endDate +
        "') AND `jual_sampah`.`deleteAt` IS NULL";
      literalBeliSampah =
        "SELECT count(*) FROM `beli_sampah` AS `beli_sampah` WHERE `beli_sampah`.`mitraCode` = `mitra`.`mitraCode` AND (`beli_sampah`.`createAt` BETWEEN '" +
        req.params.startDate +
        "' AND '" +
        req.params.endDate +
        "') AND `beli_sampah`.`deleteAt` IS NULL";
    }

    const mitra = await model.adupi.mitra.findAll({
      attributes: [
        "mitraCode",
        "nama",
        "ktp",
        "nik",
        "noHp",
        "jenisKelamin",
        "wilayahCode",
        "jenisMitra",
        "tempatLahir",
        "tanggalLahir",
        "alamat",
        "fasilitatorCode",
        "userCode",
        [db.literal("(" + literalMesin + ")"), "totalMesin"],
        [db.literal("(" + literalMasalahSelesai + ")"), "totalMasalahSelesai"],
        [db.literal("(" + literalMasalahProses + ")"), "totalMasalahProses"],
        [db.literal("(" + literalJualSampah + ")"), "totalJualSampah"],
        [db.literal("(" + literalBeliSampah + ")"), "totalBeliSampah"],
      ],
      where: {
        [op.and]: [
          {
            fasilitatorCode: {
              [op.ne]: null,
            },
          },
          {
            deleteAt: null,
          },
        ],
      },
      include: [
        {
          model: model.managementUser.user,
          attributes: ["userCode", "email"],
          where: {
            isActive: "1",
            status: "Public",
            deleteAt: null,
          },
        },
      ],
    });
    return res.status(200).json({
      status: 200,
      message: "Data mitra ditemukan",
      data: mitra,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Data mitra tidak ditemukan",
    });
  }
};

export const getDetailMitraReport = async (req, res, next) => {
  try {
    let hasil;
    let conditionDate;
    if (req.params.startDate == null || req.params.endDate == null) {
      conditionDate = {
        deleteAt: null,
      };
    } else {
      conditionDate = {
        createAt: {
          [op.between]: [req.params.startDate, req.params.endDate],
        },
        deleteAt: null,
      };
    }
    const mitra = await model.adupi.mitra.findOne({
      where: {
        [op.and]: [
          {
            fasilitatorCode: {
              [op.ne]: null,
            },
          },
          {
            deleteAt: null,
          },
        ],
        mitraCode: req.params.mitraCode,
        deleteAt: null,
      },
      include: [
        {
          model: model.managementUser.user,
          where: {
            isActive: "1",
            status: "Public",
            deleteAt: null,
          },
        },
      ],
    });
    if (!mitra) {
      return res.status(404).json({
        status: 404,
        message: "Data mitra tidak ditemukan",
      });
    }
    const desa = await db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,13)=? AND CHAR_LENGTH(wilayahCode)=13 LIMIT 1",
      {
        replacements: [mitra.wilayahCode],
        type: QueryTypes.SELECT,
      }
    );
    const kabupaten = await db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,5)=? AND CHAR_LENGTH(wilayahCode)=5 LIMIT 1",
      {
        replacements: [mitra.wilayahCode.substr(0, 5)],
        type: QueryTypes.SELECT,
      }
    );
    const kecamatan = await db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,8)=? AND CHAR_LENGTH(wilayahCode)=8 LIMIT 1",
      {
        replacements: [mitra.wilayahCode.substr(0, 8)],
        type: QueryTypes.SELECT,
      }
    );
    const provinsi = await db.query(
      "SELECT * FROM wilayah WHERE LEFT(wilayahCode,2)=? AND CHAR_LENGTH(wilayahCode)=2 LIMIT 1",
      {
        replacements: [mitra.wilayahCode.substr(0, 2)],
        type: QueryTypes.SELECT,
      }
    );

    if (!desa || !kecamatan || !kabupaten || !provinsi) {
      return res.status(404).json({
        status: 404,
        message: "Wilayah tidak ditemukan",
      });
    }

    let whereMesin = {
      deleteAt: null,
      mitraCode: mitra.mitraCode,
    };
    const usaha = await model.adupi.usaha.findAll({
      where: {
        mitraCode: mitra.mitraCode,
        deleteAt: null,
      },
      include: [
        {
          model: model.adupi.mesin,
          where: whereMesin,
        },
      ],
    });

    let whereFasilitator = {
      deleteAt: null,
      fasilitatorCode: mitra.fasilitatorCode,
    };
    const fasilitator = await model.adupi.fasilitator.findOne({
      where: whereFasilitator,
    });
    let whereUser = {
      deleteAt: null,
      userCode: mitra.userCode,
    };
    const user = await model.managementUser.user.findOne({
      attributes: ["userCode", "email"],
      where: whereUser,
    });
    let whereAnggota = {
      deleteAt: null,
      mitraCode: mitra.mitraCode,
    };
    const anggota = await model.adupi.anggota.findAll({
      where: whereAnggota,
    });
    let whereMasalah = {
      ...conditionDate,
      deleteAt: null,
      mitraCode: mitra.mitraCode,
    };
    const masalah = await model.adupi.masalah.findAll({
      where: whereMasalah,
    });
    let whereBeliSampah = {
      ...conditionDate,
      deleteAt: null,
      mitraCode: mitra.mitraCode,
    };
    const beliSampah = await model.adupi.beliSampah.findAll({
      where: whereBeliSampah,
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
    let whereJualSampah = {
      ...conditionDate,
      deleteAt: null,
      mitraCode: mitra.mitraCode,
    };
    const jualSampah = await model.adupi.jualSampah.findAll({
      where: whereJualSampah,
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
      ],
    });
    hasil = {
      mitraCode: mitra.mitraCode,
      nama: mitra.nama,
      nik: mitra.nik,
      ktp: mitra.ktp,
      noHp: mitra.noHp,
      jenisKelamin: mitra.jenisKelamin,
      wilayahCode: mitra.wilayahCode,
      wilayah: {
        desa: desa[0],
        kecamatan: kecamatan[0],
        kabupaten: kabupaten[0],
        provinsi: provinsi[0],
      },
      jenisMitra: mitra.jenisMitra,
      tempatLahir: mitra.tempatLahir,
      tanggalLahir: mitra.tanggalLahir,
      alamat: mitra.alamat,
      fasilitator: fasilitator,
      user: user,
      gudang: usaha,
      anggota: anggota,
      masalah: masalah,
      transaksi: {
        beliSampah: beliSampah,
        jualSampah: jualSampah,
      },
    };
    return res.status(200).json({
      status: 200,
      message: "",
      data: hasil,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Data mitra tidak ditemukan",
    });
  }
};

export const getJumlahMitraPerbulanPerkabupaten = async (req, res) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  if (req.query.wilayahCode != null) {
    condition =
      condition + " AND wilayahCode = '" + req.query.wilayahCode + "'";
  }
  const data = await db.query(
    "SELECT * FROM report_jumlah_mitra_perbulan_perkabupaten " +
      condition +
      " ORDER BY bulan",
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};

export const getJumlahLuasGudangPerbulan = async (req, res) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  const data = await db.query(
    "SELECT * FROM report_jumlah_luas_gudang_perbulan " +
      condition +
      " ORDER BY bulan",
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};

export const getJumlahPekerjaPerbulan = async (req, res) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  const data = await db.query(
    "SELECT * FROM report_jumlah_pekerja_perbulan " +
      condition +
      " ORDER BY bulan",
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};

export const getPembelianSemuaMitraPerbulan = async (req, res) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  const data = await db.query(
    "SELECT * FROM report_pembelian_semua_mitra_perbulan " +
      condition +
      " ORDER BY bulan",
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};

export const getPembelianPermitraPerbulan = async (req, res) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  if (req.query.mitraCode != null) {
    condition = condition + " AND mitraCode = '" + req.query.mitraCode + "'";
  }
  const data = await db.query(
    "SELECT a.tahun , a.bulan,a.jumlah, sum(a.berat) as berat , a.nama,a.alamat, a.mitraCode  FROM report_pembelian_permitra_perbulan a " +
      condition +
      " GROUP BY mitraCode ORDER BY bulan",
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};

export const getPembelianPermitraPerbulanline = async (req, res) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  if (req.query.mitraCode != null) {
    condition = condition + " AND mitraCode = '" + req.query.mitraCode + "'";
  }
  const data = [];
  // const query =  await db.query(
  //   "SELECT a.tahun , a.bulan,a.jumlah, berat , a.nama,a.alamat, a.mitraCode  FROM report_pembelian_permitra_perbulan a " +
  //     condition +
  //     "ORDER BY bulan",
  //   {
  //     // replacements: [req.query.wilayahCode],
  //     type: QueryTypes.SELECT,
  //   }
  // );
  const query2 =   await db.query(
    "SELECT * FROM `mitra` WHERE deleteAt IS NULL AND fasilitatorCode IS NOT NULL ",
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  for (var key in query2) {
    const dataperbulan =Array();
    for (let i = 0; i < 12; i++) {
      const query =  await db.query(
        "SELECT berat FROM report_pembelian_permitra_perbulan a "+
          condition +" AND mitraCode="+query2[key].mitraCode + 
          " AND bulan="+(i+1) +" ORDER BY bulan",
        {
          // replacements: [req.query.wilayahCode],
          type: QueryTypes.SELECT,
        }
      );
      dataperbulan[i]=query[0]?.berat==null?0:query[0]?.berat;
    }
    data[key] = {name :query2[key]?.nama ,data:dataperbulan};
  };
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};





export const getPembelianPermitraPerbulanlinevsmitra = async (req, res) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  if (req.query.mitraCode != null) {
    condition = condition + " AND mitraCode = '" + req.query.mitraCode + "'";
  }
  const data = [];
  // const query2 =   await db.query(
  //   "SELECT * FROM `mitra` WHERE deleteAt IS NULL AND fasilitatorCode IS NOT NULL ",
  //   {
  //     // replacements: [req.query.wilayahCode],
  //     type: QueryTypes.SELECT,
  //   }
  // );
   var count =0;
   var penambahanmitra =0;
   var bulan = 1;
   const dataperbulan =Array();
    for (let tahuns = 2021; tahuns <= date.getFullYear(); tahuns++) {
      if(tahuns === date.getFullYear()){
        console.log(date.getMonth());
        bulan = date.getMonth();
      }else{
        bulan = 12;
      }
        for (let i = 0; i < bulan; i++) {
          const query =  await db.query(
            "SELECT berat FROM report_pembelian_semua_mitra_perbulan a where tahun="+
            tahuns +" AND "+ 
              "bulan="+(i+1) +" ORDER BY bulan , tahun asc",
            {
              // replacements: [req.query.wilayahCode],
              type: QueryTypes.SELECT,
            }
          );
          const query2 =  await db.query(
            "SELECT count(*) as total FROM (SELECT mitra.ktp , YEAR(createAt) as tahun , month(createAt) as bulan FROM `mitra`  where fasilitatorCode IS NOT NULL) as a WHERE tahun="+
            tahuns +" AND "+ 
              "bulan="+(i+1) +" ORDER BY bulan , tahun asc",
            {
              // replacements: [req.query.wilayahCode],
              type: QueryTypes.SELECT,
            }
          );
          penambahanmitra =  penambahanmitra + query2[0]?.total;
          dataperbulan[count]={"tahun" : tahuns,"bulan": (i+1) ,"mitra" : penambahanmitra ,"data" : query[0]?.berat==null?0:query[0]?.berat};
          count++;
        }
  };
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: dataperbulan,
  });
};


export const getpembeliantotalmitravspembelian = async (req, res) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  if (req.query.mitraCode != null) {
    condition = condition + " AND mitraCode = '" + req.query.mitraCode + "'";
  }
  const data = [];
  // const query2 =   await db.query(
  //   "SELECT * FROM `mitra` WHERE deleteAt IS NULL AND fasilitatorCode IS NOT NULL ",
  //   {
  //     // replacements: [req.query.wilayahCode],
  //     type: QueryTypes.SELECT,
  //   }
  // );
   var count =0;
   var penambahanmitra =0;
   var penambahanberat =0;
   var bulan = 1;
   const dataperbulan =Array();
    for (let tahuns = 2021; tahuns <= date.getFullYear(); tahuns++) {
      if(tahuns === date.getFullYear()){
        console.log(date.getMonth());
        bulan = date.getMonth();
      }else{
        bulan = 12;
      }
      for (let i = 0; i < bulan; i++) {

          const query =  await db.query(
            "SELECT  IFNULL(NULLIF(CAST(sum(berat) AS char), 0), 0) as berat FROM report_pembelian_semua_mitra_perbulan a where tahun="+
            tahuns +" AND "+ 
              "bulan="+(i+1) +" ORDER BY bulan , tahun asc",
            {
              // replacements: [req.query.wilayahCode],
              type: QueryTypes.SELECT,
            }
          );
          const query2 =  await db.query(
            "SELECT count(*) as total FROM (SELECT mitra.ktp , YEAR(createAt) as tahun , month(createAt) as bulan FROM `mitra` where fasilitatorCode IS NOT NULL) as a WHERE tahun="+
            tahuns +" AND "+ 
              "bulan="+(i+1) +" ORDER BY bulan , tahun asc",
            {
              // replacements: [req.query.wilayahCode],
              type: QueryTypes.SELECT,
            }
          );
          penambahanberat =  penambahanberat + parseInt(query[0]?.berat);
          penambahanmitra =  penambahanmitra + query2[0]?.total;
          dataperbulan[count]={"tahun" : tahuns,"bulan": (i+1) ,"mitra" : penambahanmitra ,"data" : penambahanberat};
          count++;
        }

  };
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: dataperbulan,
  });
};


export const getPenjualanSemuaMitraPerbulan = async (req, res) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  const data = await db.query(
    "SELECT * FROM report_penjualan_semua_mitra_perbulan " +
      condition +
      " ORDER BY bulan",
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};

export const getPenjualanPermitraPerbulan = async (req, res) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  if (req.query.mitraCode != null) {
    condition = condition + " AND mitraCode = '" + req.query.mitraCode + "'";
  }
  const data = await db.query(
    "SELECT a.tahun , a.bulan,a.jumlah, sum(a.berat) as berat , a.nama,a.alamat, a.mitraCode  FROM report_penjualan_permitra_perbulan a " +
    condition +
    " GROUP BY mitraCode ORDER BY bulan",
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};


export const getPenjualanPermitraPerbulanline = async (req, res) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  if (req.query.mitraCode != null) {
    condition = condition + " AND mitraCode = '" + req.query.mitraCode + "'";
  }
  const data = [];
  const query2 =   await db.query(
    "SELECT * FROM `mitra` WHERE deleteAt IS NULL AND fasilitatorCode IS NOT NULL",
    {
      type: QueryTypes.SELECT,
    }
  );
  for (var key in query2) {
    const dataperbulan =Array();
    for (let i = 0; i < 12; i++) {
      const query =  await db.query(
        "SELECT berat FROM report_penjualan_permitra_perbulan a "+
          condition +" AND mitraCode="+query2[key].mitraCode + 
          " AND bulan="+(i+1) +" ORDER BY bulan",
        {
          type: QueryTypes.SELECT,
        }
      );
      dataperbulan[i]=query[0]?.berat==null?0:query[0]?.berat;
    }
    data[key] = {name :query2[key]?.nama ,data:dataperbulan};
  };
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};

export const getPenjualanPermitraPerbulanPerpabrik = async (req, res) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  if (req.query.mitraCode != null) {
    condition = condition + " AND mitraCode = '" + req.query.mitraCode + "'";
  }
  if (req.query.pembeliCode != null) {
    condition =
      condition + " AND pembeliCode = '" + req.query.pembeliCode + "'";
  }
  const data = await db.query(
    "SELECT * FROM report_penjualan_permitra_perbulan_perpabrik " +
      condition +
      " ORDER BY bulan",
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};

export const getPenjualanSemuaMitraPerbulanPerpabrik = async (req, res) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  if (req.query.pembeliCode != null) {
    condition =
      condition + " AND pembeliCode = '" + req.query.pembeliCode + "'";
  }
  const data = await db.query(
    "SELECT * FROM report_penjualan_semua_mitra_perbulan_perpabrik " +
      condition +
      " ORDER BY bulan",
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};

export const getMasalahSemuaMitraPerbulanPerjenisPerstatus = async (
  req,
  res
) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  if (req.query.jenisMasalah != null) {
    condition =
      condition + " AND jenisMasalah = '" + req.query.jenisMasalah + "'";
  }
  if (req.query.status != null) {
    condition = condition + " AND status = '" + req.query.status + "'";
  }
  const data = await db.query(
    "SELECT * FROM report_masalah_semua_mitra_perbulan_perjenis_perstatus " +
      condition +
      " ORDER BY bulan",
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};

export const getMasalahPermitraPerbulanPerjenisPerstatus = async (req, res) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  if (req.query.mitraCode != null) {
    condition = condition + " AND mitraCode = '" + req.query.mitraCode + "'";
  }
  if (req.query.jenisMasalah != null) {
    condition =
      condition + " AND jenisMasalah = '" + req.query.jenisMasalah + "'";
  }
  if (req.query.status != null) {
    condition = condition + " AND status = '" + req.query.status + "'";
  }
  const data = await db.query(
    "SELECT * FROM report_masalah_permitra_perbulan_perjenis_perstatus " +
      condition +
      " ORDER BY bulan",
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};

export const getPenjualanPerkategori = async (req, res) => {
  let date = new Date();
  let condition = "";
  if (req.query.jsCode != null) {
    condition = condition + "WHERE jsCode = '" + req.query.jsCode + "'";
  }
  const data = await db.query(
    "SELECT * FROM report_penjualan_semua_mitra_perkategori " + condition,
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};

export const getPembelianPerkategori = async (req, res) => {
  let date = new Date();
  let condition = "";
  if (req.query.jsCode != null) {
    condition = condition + "WHERE jsCode = '" + req.query.jsCode + "'";
  }
  const data = await db.query(
    "SELECT * FROM report_pembelian_semua_mitra_perkategori " + condition,
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};


export const getAnalisisPembelianDenganMitraPerbulan = async (req, res) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  const data = await db.query(
    "SELECT * FROM report_rata_rata_pembelian_dengan_mitra_perbulan " +
      condition +
      " ORDER BY bulan",
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};

export const getAnalisisPembelianDenganLuasGudangPerbulan = async (req, res) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  const data = await db.query(
    "SELECT * FROM report_rata_rata_pembelian_dengan_luas_gudang_perbulan " +
      condition +
      " ORDER BY bulan",
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};

export const getAnalisisPembelianDenganPekerjaPerbulan = async (req, res) => {
  let date = new Date();
  let condition = "WHERE ";
  if (req.query.tahun != null) {
    condition = condition + " tahun = '" + req.query.tahun + "'";
  } else {
    condition = condition + " tahun = '" + date.getFullYear() + "'";
  }
  const data = await db.query(
    "SELECT * FROM report_rata_rata_pembelian_dengan_pekerja_perbulan " +
      condition +
      " ORDER BY bulan",
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};


export const getNewPenjualanPerkategori = async (req, res) => {
  let date = new Date();
  let condition = "";
  if (req.query.ksCode != null) {
    condition = condition + "WHERE ksCode = '" + req.query.ksCode + "'";
  }
  const data = await db.query(
    "SELECT * FROM new_report_penjualan_semua_mitra_perkategori " + condition,
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};

export const getNewPembelianPerkategori = async (req, res) => {
  let date = new Date();
  let condition = "";
  if (req.query.ksCode != null) {
    condition = condition + "WHERE ksCode = '" + req.query.ksCode + "'";
  }
  const data = await db.query(
    "SELECT * FROM new_report_pembelian_semua_mitra_perkategori " + condition,
    {
      // replacements: [req.query.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Data ditemukan",
    data: data,
  });
};