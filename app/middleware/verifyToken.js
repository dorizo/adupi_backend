import jwt from "jsonwebtoken";
import { model } from "../models/index.js";

export const verifyToken = (permission = []) => {
  return (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null)
      return res.status(401).json({
        status: 401,
        message: "You are not authorization",
      });
    jwt.verify(
      token,
      "KALO DI UBUNTU .ENV NYA GAK KEBACA",
      // process.env.ACCESS_TOKEN_SECRET,
      async (err, decoded) => {
        if (err)
          return res.status(403).json({
            status: 403,
            message: "Token is invalid",
          });
        const userCode = decoded.userCode;
        const ru = await model.managementUser.roleUser.findAll({
          where: {
            userCode: userCode,
            deleteAt: null,
          },
          include: [
            {
              model: model.managementUser.role,
              where: {
                deleteAt: null,
              },
            },
          ],
        });
        const tempRoleCode = [];
        await ru.forEach((item, index, arr) => {
          tempRoleCode.push(item.role.roleCode);
        });

        const { count, rows } =
          await model.managementUser.rolePermission.findAndCountAll({
            attributes: ["rpCode"],
            where: {
              roleCode: tempRoleCode,
              deleteAt: null,
            },
            include: [
              {
                model: model.managementUser.permission,
                where: {
                  permission: permission,
                  deleteAt: null,
                },
              },
            ],
          });

        if (count > 0) {
          req.userCode = userCode;
          next();
        } else {
          const { count, rows } =
            await model.managementUser.userPermission.findAndCountAll({
              attributes: ["upCode"],
              where: {
                userCode: userCode,
                deleteAt: null,
              },
              include: [
                {
                  model: model.managementUser.permission,
                  where: {
                    permission: permission,
                    deleteAt: null,
                  },
                },
              ],
            });
          if (count <= 0) {
            return res.status(400).json({
              status: 400,
              message: "You don't have a access",
            });
          }
          req.userCode = userCode;
          next();
        }
      }
    );
  };
};
