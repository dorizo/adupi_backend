import jwt from "jsonwebtoken";

export const refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return res.status(401).json({
        status: 401,
        message: "Refresh token is required",
      });
    jwt.verify(
      refreshToken,
      "KALO DI UBUNTU .ENV NYA GAK KEBACA",
      // process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err)
          return res.status(403).json({
            status: 403,
            message: "Refresh token not valid",
          });
        const accessToken = jwt.sign(
          { userCode: decoded.userCode },
          "KALO DI UBUNTU .ENV NYA GAK KEBACA",
          // process.env.ACCESS_TOKEN_SECRET,
          {
            expiresIn: "1d",
          }
        );

        const refreshToken = jwt.sign(
          { userCode: decoded.userCode },
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
          message: "Succes update access token",
          data: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        });
      }
    );
  } catch (error) {
    return res.status(403).json({
      status: 403,
      message: "Refresh token not valid or user not found",
    });
  }
};
