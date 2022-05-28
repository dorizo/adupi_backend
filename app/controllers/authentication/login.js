import { model } from "../../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (req, res, next) => {
  try {
    const user = await model.managementUser.user.findOne({
      where: {
        email: req.body.email,
        deleteAt: null,
      },
    });
    if (user.isActive == '0') {
      return res.status(400).json({
        status: 400,
        message: "Account not active",
      });
    }
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match)
      return res.status(400).json({
        status: 400,
        message: "Wrong password",
      });

    const userCode = user.userCode;
    const accessToken = jwt.sign(
      { userCode: userCode },
      "KALO DI UBUNTU .ENV NYA GAK KEBACA",
      // process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1d",
      }
    );

    const refreshToken = jwt.sign(
      { userCode: userCode },
      "KALO DI UBUNTU .ENV NYA GAK KEBACA",
      // process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d",
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
    });
    return res.status(200).json({
      status: 200,
      message: "Email and password is correct",
      data: {
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Email not found",
    });
  }
};
