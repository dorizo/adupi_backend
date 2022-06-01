import { validationResult } from "express-validator";

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }

  return res.status(422).json({
    status: 422,
    errors: errors.mapped(),
  });
};


export const getFullWilayah = async (wilayahCode) => {
  const desa = await db.query(
    "SELECT * FROM wilayah WHERE LEFT(wilayahCode,8)=? AND CHAR_LENGTH(wilayahCode)=13 ORDER BY wilayah",
    {
      replacements: [mitra.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
  const kabupaten = await db.query(
    "SELECT * FROM wilayah WHERE LEFT(wilayahCode,2)=? AND CHAR_LENGTH(wilayahCode)=5 ORDER BY wilayah",
    {
      replacements: [req.params.wilayahCode],
      type: QueryTypes.SELECT,
    }
  );
}