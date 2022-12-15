import { model } from "../../models/index.js";
import { QueryTypes } from "sequelize";
import ExcelJS from "exceljs";
import fs from "fs";
import db from "../../config/database.js"

// const op = Sequelize.Op;

export const reportpembeliansampah = async (req,res) => {

  // Sequelize.query("select ") 
  const fasilitator = await db.query(
    'SELECT d.nama as nama_anggota ,  c.nama as nama_mitra , e.jenis , f.kategori , (SELECT wilayah FROM wilayah WHERE LEFT(wilayahCode,2) = LEFT(d.wilayahCode, 2)AND CHAR_LENGTH(wilayahCode)=2 limit 1) AS PROVENSI  , (SELECT wilayah FROM wilayah WHERE LEFT(wilayahCode,5) = LEFT(d.wilayahCode, 5)AND CHAR_LENGTH(wilayahCode)=5 limit 1) AS KABUPATEN , (SELECT wilayah FROM wilayah WHERE LEFT(wilayahCode,8) = LEFT(d.wilayahCode, 8)AND CHAR_LENGTH(wilayahCode)=8 limit 1) AS KECAMATAN, (SELECT wilayah FROM wilayah WHERE LEFT(wilayahCode,13) = LEFT(d.wilayahCode, 13)AND CHAR_LENGTH(wilayahCode)=13 limit 1) AS KELURAHAN, c.alamat, c.noHp , b.sumber , b.berat  as berat, b.harga as harga,b.total as total , DATE_FORMAT(a.createAt , "%Y-%m-%d") as tanggal_pembelian  FROM beli_sampah a JOIN detail_beli_sampah b ON a.bsCode=b.bsCode JOIN mitra c ON c.mitraCode= a.mitraCode JOIN anggota d ON d.anggotaCode=a.anggotaCode JOIN jenis_sampah e ON e.jsCode=b.jsCode JOIN kategori_sampah f ON f.ksCode=e.ksCode  WHERE a.createAt BETWEEN :mulai AND :akhir',
    {
      replacements: { mulai: req.body.tanggalawal , akhir :  req.body.tanggalakhir+' 23:59:59' },
      type: QueryTypes.SELECT
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Fasilitator ditemukan",
    data: fasilitator,
  });
};

export const reportpenjualansampah = async (req,res) => {

  // Sequelize.query("select ") 
  const fasilitator = await db.query(
    'SELECT d.pembeli,c.nama as nama_mitra , e.jenis , f.kategori , b.berat  as berat, b.harga as harga,b.total as total , DATE_FORMAT(a.createAt , "%Y-%m-%d") as tanggal_pembuatan   FROM jual_sampah a JOIN detail_jual_sampah b ON a.jsCode=b.jsCode JOIN pembeli d ON d.pembeliCode=a.pembeliCode JOIN mitra c ON c.mitraCode= a.mitraCode JOIN jenis_sampah e ON e.jsCode=b.jenisCode JOIN kategori_sampah f ON f.ksCode=e.ksCode WHERE a.createAt BETWEEN :mulai AND :akhir',
    {
      replacements: { mulai: req.body.tanggalawal , akhir :  req.body.tanggalakhir+'  23:59:59' },
      type: QueryTypes.SELECT
    }
  );
  return res.status(200).json({
    status: 200,
    message: "Fasilitator ditemukan",
    data: fasilitator,
  });
};

export const kunjunganmitraall = async (req,res) => {

  // Sequelize.query("select ") 
  let fasilitator;
  if(req.body.single){
    fasilitator = await db.query(
      'SELECT a.kunjungan_absenCode , b.* , c.nama ,u.namaUsaha  FROM kunjungan_absen as a JOIN Kunjungan_form as b ON a.kunjungan_absenCode=b.mitraCode JOIN mitra c ON c.mitraCode=a.mitraCode JOIN usaha u ON u.mitraCode=c.mitraCode where b.createAt IS NULL AND  a.kunjungan_absenCode = :single order by kunjungan_absenCode Desc',
      {
        replacements: { single: req.body.single},
        type: QueryTypes.SELECT
      }
    );  
  }else{
    fasilitator = await db.query(
      'SELECT G.*, (SELECT kunjungan_absen_date FROM kunjungan_absen where kunjungan_absen_status="checkout" AND  kunjungan_absen_name=G.kunjungan_absen_name AND DATE(kunjungan_absen_date)=DATE(G.kunjungan_absen_date) limit 1) as x  FROM (SELECT  a.kunjungan_absenCode , a.kunjungan_absen_name , a.kunjungan_absen_date ,a.kunjungan_absen_status, b.* , c.nama ,u.namaUsaha , e.nama as nama_fasilitator  FROM kunjungan_absen as a JOIN Kunjungan_form as b ON a.kunjungan_absenCode=b.mitraCode JOIN mitra c ON c.mitraCode=a.mitraCode JOIN usaha u ON u.mitraCode=c.mitraCode JOIN mitra d ON d.mitraCode=a.mitraCode JOIN fasilitator e ON e.fasilitatorCode=d.fasilitatorCode where  b.createAt IS NULL  order by kunjungan_absenCode Desc) G order by kunjungan_absen_date DESC',
      {
        type: QueryTypes.SELECT
      }
    );  
  }
  return res.status(200).json({
    status: 200,
    message: "Fasilitator ditemukan",
    data: fasilitator,
  });
};


export const getDocBeliSampah = (req, res) => {
  if (
    req.query.start == null ||
    req.query.end == null ||
    req.query.start == "undifined" ||
    req.query.end == "undifined"
  ) {
    var condition = {};
  } else {
    var condition = {
      createAt: {
        [op.between]: [req.query.start, req.query.end],
      },
    };
  }
  if (req.mitraCode == "0") {
    if (req.params.mitraCode == null) {
      condition = {
        ...condition,
        deleteAt: null,
      };
    } else {
      condition = {
        ...condition,
        deleteAt: null,
        mitraCode: req.params.mitraCode,
      };
    }
  } else {
    condition = { ...condition, deleteAt: null, mitraCode: req.mitraCode };
  }
  const data = model.adupi.beliSampah
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
              include: [
                {
                  model: model.adupi.master.kategoriSampah,
                },
              ],
            },
          ],
        },
        {
          model: model.adupi.mitra,
        },
        {
          model: model.adupi.anggota,
        },
      ],
    })
    .then((result) => {
      const workbook = new ExcelJS.Workbook(); // Create a new workbook
      const worksheet = workbook.addWorksheet("Pembelian"); // New Worksheet
      const path = "./assets/files"; // Path to download excel

      worksheet.mergeCells("A1:J1");
      worksheet.getCell("J1").alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      worksheet.getCell("J1").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("J1").font = {
        size: 14,
        bold: true,
      };
      worksheet.getCell("J1").value = "PEMBELIAN";

      worksheet.getCell("A2").value = "No";
      worksheet.getCell("A2").alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      worksheet.getCell("A2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("A2").font = {
        size: 12,
        bold: true,
      };
      worksheet.getColumn("A").width = 3;
      worksheet.getColumn("B").width = 20;
      worksheet.getColumn("C").width = 20;
      worksheet.getColumn("D").width = 20;
      worksheet.getColumn("E").width = 20;
      worksheet.getColumn("F").width = 20;
      worksheet.getColumn("G").width = 15;
      worksheet.getColumn("H").width = 15;
      worksheet.getColumn("I").width = 15;
      worksheet.getColumn("J").width = 22;

      worksheet.getCell("B2").value = "Mitra";
      worksheet.getCell("B2").alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      worksheet.getCell("B2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("B2").font = {
        size: 12,
        bold: true,
      };

      worksheet.getCell("C2").value = "Anggota";
      worksheet.getCell("C2").alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      worksheet.getCell("C2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("C2").font = {
        size: 12,
        bold: true,
      };

      worksheet.getCell("D2").value = "Kategori";
      worksheet.getCell("D2").alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      worksheet.getCell("D2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("D2").font = {
        size: 12,
        bold: true,
      };

      worksheet.getCell("E2").value = "Jenis";
      worksheet.getCell("E2").alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      worksheet.getCell("E2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("E2").font = {
        size: 12,
        bold: true,
      };

      worksheet.getCell("F2").value = "Sumber";
      worksheet.getCell("F2").alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      worksheet.getCell("F2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("F2").font = {
        size: 12,
        bold: true,
      };

      worksheet.getCell("G2").value = "Berat";
      worksheet.getCell("G2").alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      worksheet.getCell("G2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("G2").font = {
        size: 12,
        bold: true,
      };

      worksheet.getCell("H2").value = "Harga";
      worksheet.getCell("H2").alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      worksheet.getCell("H2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("H2").font = {
        size: 12,
        bold: true,
      };

      worksheet.getCell("I2").value = "Sub Total";
      worksheet.getCell("I2").alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      worksheet.getCell("I2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("I2").font = {
        size: 12,
        bold: true,
      };

      worksheet.getCell("J2").value = "Total";
      worksheet.getCell("J2").alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      worksheet.getCell("J2").border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.getCell("J2").font = {
        size: 12,
        bold: true,
      };

      let no = 1;
      let row = 3;
      result.forEach((e) => {
        let merge = e.detail_beli_sampahs.length;
        worksheet.mergeCells(
          "A" + row.toString() + ":A" + (row + (merge - 1)).toString()
        );
        worksheet.getCell("A" + row.toString()).value = no;
        worksheet.getCell("A" + row.toString()).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell("A" + row.toString()).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.mergeCells(
          "B" + row.toString() + ":B" + (row + (merge - 1)).toString()
        );
        worksheet.getCell("B" + row.toString()).value = e.mitra.nama;
        worksheet.getCell("B" + row.toString()).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell("B" + row.toString()).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.mergeCells(
          "C" + row.toString() + ":C" + (row + (merge - 1)).toString()
        );
        worksheet.getCell("C" + row.toString()).value = e.anggotum.nama;
        worksheet.getCell("C" + row.toString()).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell("C" + row.toString()).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        let row2 = row;
        e.detail_beli_sampahs.forEach((f) => {
          worksheet.getCell("D" + row2.toString()).value =
            f.jenis_sampah.kategori_sampah.kategori;
          worksheet.getCell("D" + row2.toString()).alignment = {
            vertical: "middle",
            horizontal: "center",
          };
          worksheet.getCell("D" + row2.toString()).border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          worksheet.getCell("E" + row2.toString()).value = f.jenis_sampah.jenis;
          worksheet.getCell("E" + row2.toString()).alignment = {
            vertical: "middle",
            horizontal: "center",
          };
          worksheet.getCell("E" + row2.toString()).border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          worksheet.getCell("F" + row2.toString()).value = f.sumber;
          worksheet.getCell("F" + row2.toString()).alignment = {
            vertical: "middle",
            horizontal: "center",
          };
          worksheet.getCell("F" + row2.toString()).border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          worksheet.getCell("G" + row2.toString()).value = f.berat;
          worksheet.getCell("G" + row2.toString()).alignment = {
            vertical: "middle",
            horizontal: "center",
          };
          worksheet.getCell("G" + row2.toString()).border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          worksheet.getCell("H" + row2.toString()).value = f.harga;
          worksheet.getCell("H" + row2.toString()).alignment = {
            vertical: "middle",
            horizontal: "center",
          };
          worksheet.getCell("H" + row2.toString()).border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          worksheet.getCell("I" + row2.toString()).value = f.total;
          worksheet.getCell("I" + row2.toString()).alignment = {
            vertical: "middle",
            horizontal: "center",
          };
          worksheet.getCell("I" + row2.toString()).border = {
            top: { style: "thin" },
            left: { style: "thin" },
            bottom: { style: "thin" },
            right: { style: "thin" },
          };
          row2 = row2 + 1;
        });

        worksheet.mergeCells(
          "J" + row.toString() + ":J" + (row + (merge - 1)).toString()
        );
        worksheet.getCell("J" + row.toString()).value = e.totalHarga;
        worksheet.getCell("J" + row.toString()).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell("J" + row.toString()).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };

        row = row + merge;
        no = no + 1;
      });
      let randomString = (Math.random() + 1).toString(36).substring(7);
      const data = workbook.xlsx
        .writeFile(`${path}/` + randomString + "_pembelian" + `.xlsx`)
        .then(() => {
          fs.readFile(
            `${path}/` + randomString + "_pembelian" + `.xlsx`,
            function (err, data) {
              if (err) {
                return res.status(404).json({
                  status: 404,
                  message: "Gagal mengunduh",
                });
              }
              res.writeHead(200, {
                "Content-Type":
                  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              });
              res.end(data);
            }
          );
        });
    });
};

export const getDocJualSampah = (req, res) => {
  if (
    req.query.start == null ||
    req.query.end == null ||
    req.query.start == "undifined" ||
    req.query.end == "undifined"
  ) {
    var condition = {};
  } else {
    var condition = {
      createAt: {
        [op.between]: [req.query.start, req.query.end],
      },
    };
  }
  // if (req.mitraCode == "0") {
  //   if (req.params.mitraCode == null) {
  //     condition = {
  //       ...condition,
  //       deleteAt: null,
  //     };
  //   } else {
  //     condition = {
  //       ...condition,
  //       deleteAt: null,
  //       mitraCode: req.params.mitraCode,
  //     };
  //   }
  // } else {
  //   condition = { ...condition, deleteAt: null, mitraCode: req.mitraCode };
  // }
  const data = model.adupi.jualSampah.findAll({
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
            include: [
              {
                model: model.adupi.master.kategoriSampah,
              },
            ],
          },
        ],
      },
      {
        model: model.adupi.mitra,
      },
      {
        model: model.adupi.pembeli,
      },
    ],
  }).then((result) => {
    const workbook = new ExcelJS.Workbook(); // Create a new workbook
    const worksheet = workbook.addWorksheet("Penjualan"); // New Worksheet
    const path = "./assets/files"; // Path to download excel

    worksheet.mergeCells("A1:I1");
    worksheet.getCell("I1").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("I1").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    worksheet.getCell("I1").font = {
      size: 14,
      bold: true,
    };
    worksheet.getCell("I1").value = "PENJUALAN";

    worksheet.getCell("A2").value = "No";
    worksheet.getCell("A2").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("A2").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    worksheet.getCell("A2").font = {
      size: 12,
      bold: true,
    };
    worksheet.getColumn("A").width = 3;
    worksheet.getColumn("B").width = 20;
    worksheet.getColumn("C").width = 20;
    worksheet.getColumn("D").width = 20;
    worksheet.getColumn("E").width = 20;
    worksheet.getColumn("F").width = 20;
    worksheet.getColumn("G").width = 15;
    worksheet.getColumn("H").width = 15;
    worksheet.getColumn("I").width = 22;

    worksheet.getCell("B2").value = "Mitra";
    worksheet.getCell("B2").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("B2").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    worksheet.getCell("B2").font = {
      size: 12,
      bold: true,
    };

    worksheet.getCell("C2").value = "Pembeli";
    worksheet.getCell("C2").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("C2").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    worksheet.getCell("C2").font = {
      size: 12,
      bold: true,
    };

    worksheet.getCell("D2").value = "Kategori";
    worksheet.getCell("D2").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("D2").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    worksheet.getCell("D2").font = {
      size: 12,
      bold: true,
    };

    worksheet.getCell("E2").value = "Jenis";
    worksheet.getCell("E2").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("E2").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    worksheet.getCell("E2").font = {
      size: 12,
      bold: true,
    };

    worksheet.getCell("F2").value = "Berat";
    worksheet.getCell("F2").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("F2").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    worksheet.getCell("F2").font = {
      size: 12,
      bold: true,
    };

    worksheet.getCell("G2").value = "Harga";
    worksheet.getCell("G2").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("G2").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    worksheet.getCell("G2").font = {
      size: 12,
      bold: true,
    };

    worksheet.getCell("H2").value = "Sub Total";
    worksheet.getCell("H2").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("H2").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    worksheet.getCell("H2").font = {
      size: 12,
      bold: true,
    };

    worksheet.getCell("I2").value = "Total";
    worksheet.getCell("I2").alignment = {
      vertical: "middle",
      horizontal: "center",
    };
    worksheet.getCell("I2").border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
    worksheet.getCell("I2").font = {
      size: 12,
      bold: true,
    };

    let no = 1;
    let row = 3;
    result.forEach((e) => {
      let merge = e.detail_jual_sampahs.length;
      worksheet.mergeCells(
        "A" + row.toString() + ":A" + (row + (merge - 1)).toString()
      );
      worksheet.getCell("A" + row.toString()).value = no;
      worksheet.getCell("A" + row.toString()).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      worksheet.getCell("A" + row.toString()).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.mergeCells(
        "B" + row.toString() + ":B" + (row + (merge - 1)).toString()
      );
      worksheet.getCell("B" + row.toString()).value = e.mitra.nama;
      worksheet.getCell("B" + row.toString()).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      worksheet.getCell("B" + row.toString()).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      worksheet.mergeCells(
        "C" + row.toString() + ":C" + (row + (merge - 1)).toString()
      );
      worksheet.getCell("C" + row.toString()).value = e.pembeli.pembeli;
      worksheet.getCell("C" + row.toString()).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      worksheet.getCell("C" + row.toString()).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
      let row2 = row;
      e.detail_jual_sampahs.forEach((f) => {
        worksheet.getCell("D" + row2.toString()).value =
          f.jenis_sampah.kategori_sampah.kategori;
        worksheet.getCell("D" + row2.toString()).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell("D" + row2.toString()).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.getCell("E" + row2.toString()).value = f.jenis_sampah.jenis;
        worksheet.getCell("E" + row2.toString()).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell("E" + row2.toString()).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      
        worksheet.getCell("F" + row2.toString()).value = f.berat;
        worksheet.getCell("F" + row2.toString()).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell("F" + row2.toString()).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.getCell("G" + row2.toString()).value = f.harga;
        worksheet.getCell("G" + row2.toString()).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell("G" + row2.toString()).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        worksheet.getCell("H" + row2.toString()).value = f.total;
        worksheet.getCell("H" + row2.toString()).alignment = {
          vertical: "middle",
          horizontal: "center",
        };
        worksheet.getCell("H" + row2.toString()).border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
        row2 = row2 + 1;
      });

      worksheet.mergeCells(
        "I" + row.toString() + ":I" + (row + (merge - 1)).toString()
      );
      worksheet.getCell("I" + row.toString()).value = e.totalHarga;
      worksheet.getCell("I" + row.toString()).alignment = {
        vertical: "middle",
        horizontal: "center",
      };
      worksheet.getCell("I" + row.toString()).border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };

      row = row + merge;
      no = no + 1;
    });
    let randomString = (Math.random() + 1).toString(36).substring(7);
    const data = workbook.xlsx
      .writeFile(`${path}/` + randomString + "_penjualan" + `.xlsx`)
      .then(() => {
        fs.readFile(
          `${path}/` + randomString + "_penjualan" + `.xlsx`,
          function (err, data) {
            if (err) {
              return res.status(404).json({
                status: 404,
                message: "Gagal mengunduh",
              });
            }
            res.writeHead(200, {
              "Content-Type":
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });
            res.end(data);
          }
        );
      });
  });
};
