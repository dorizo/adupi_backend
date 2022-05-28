import { model } from "../../models/index.js";
import jwt from "jsonwebtoken";

export const self = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    let userCode = "";
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
        userCode = decoded.userCode;
      }
    );
    const user = await model.managementUser.user.findOne({
      where: {
        userCode: userCode,
        deleteAt: null,
      },
    });
    if (!user) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    const role = await model.managementUser.roleUser.findAll({
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
    const tempRole = [];
    let forPush = {};
    role.forEach((item, index, arr) => {
      const permissionInRole = model.managementUser.rolePermission
        .findAll({
          attributes: ["rpCode"],
          where: {
            roleCode: item.roleCode,
            deleteAt: null,
          },
          include: [
            {
              model: model.managementUser.permission,
              where: {
                deleteAt: null,
              },
            },
          ],
        })
        .then((result) => {
          let tempPermissionInRole = [];
          let forPushPermission = {};
          result.forEach((item, index, arr) => {
            forPushPermission = {
              permissionCode: item.permission.permissionCode,
              permission: item.permission.permission,
              description: item.permission.description,
              moduleCode: item.permission.moduleCode,
            };
            tempPermissionInRole.push(forPushPermission);
          });
          forPush = {
            roleCode: item.role.roleCode,
            role: item.role.role,
            permission: tempPermissionInRole,
          };
          tempRole.push(forPush);
        });
    });
    const permission = await model.managementUser.userPermission.findAll({
      attributes: ["upCode"],
      where: {
        userCode: userCode,
        deleteAt: null,
      },
      include: [
        {
          model: model.managementUser.permission,
          where: {
            deleteAt: null,
          },
        },
      ],
    });
    const tempPermission = [];
    let forPushSpecialPermission = {};
    permission.forEach((item, index, arr) => {
      forPushSpecialPermission = {
        permissionCode: item.permission.permissionCode,
        permission: item.permission.permission,
        description: item.permission.description,
        moduleCode: item.permission.moduleCode,
      };
      tempPermission.push(forPushSpecialPermission);
    });
    return res.status(200).json({
      status: 200,
      message: "Detail user found",
      data: {
        userCode: user.userCode,
        email: user.email,
        isActive: user.isActive,
        role: tempRole,
        specialPermission: tempPermission,
      },
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Detail user not found",
    });
  }
};
