import { model } from "../../models/index.js";
import bcrypt from "bcrypt";
import { QueryTypes } from "sequelize";
import db from "../../config/database.js";

export const getAllUser = async (req, res, next) => {
  try {
    // const user = await model.managementUser.user.findAll({
    //   where: {
    //     deleteAt: null,
    //     status: "Public",
    //   },
    // });
    const user = await db.query("SELECT c.role, CASE WHEN c.role = 'Mitra' THEN (SELECT concat(nama,'-',namaUsaha) From mitra JOIN usaha ON usaha.mitraCode=mitra.mitraCode where userCode=a.userCode) WHEN c.role = 'Fasilitator' THEN (SELECT nama From fasilitator where userCode=a.userCode AND deleteAt is NULL) ELSE'SUPERADMIN'END AS userdata , a.*  FROM user a JOIN role_user b ON b.userCode=a.userCode JOIN role c ON b.roleCode=c.roleCode where a.deleteAt is NUll", {
      nest: true,
      type: QueryTypes.SELECT
    });
    return res.status(200).json({
      status: 200,
      message: "User found",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }
};

export const getOneUser = async (req, res, next) => {
  try {
    const user = await model.managementUser.user.findOne({
      where: {
        userCode: req.params.userCode,
        status: "Public",
        deleteAt: null,
      },
    });
    if(!user){
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "User found",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }
};

export const addUser = async (req, res, next) => {
  await model.managementUser.user
    .create({
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10),
      isActive: req.body.isActive,
      status: "Public",
    })
    .then(function (user) {
      if (user) {
        return res.status(200).json({
          status: 200,
          message: "Success add user",
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Failed add user",
        });
      }
    });
};

export const editUser = async (req, res, next) => {
  try {
    const user = await model.managementUser.user.findOne({
      where: {
        userCode: req.params.userCode,
        status: "Public",
        deleteAt: null,
      },
    });
    if(!user){
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    await model.managementUser.user
      .update(
        {
          email: req.body.email,
          password:
            req.body.password != null && req.body.password != "undifined"
              ? await bcrypt.hash(req.body.password, 10)
              : user.password,
          isActive: req.body.isActive,
          status: "Public",
          updateAt: new Date(),
        },
        {
          where: {
            userCode: req.params.userCode,
            deleteAt: null,
          },
        }
      )
      .then(function (user) {
        if (user) {
          return res.status(200).json({
            status: 200,
            message: "Success edit user",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Failed edit user",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await model.managementUser.user.findOne({
      where: {
        userCode: req.params.userCode,
        status: "Public",
        deleteAt: null,
      },
    });
    if(!user){
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }
    await model.managementUser.user
      .update(
        {
          deleteAt: new Date(),
        },
        {
          where: {
            userCode: req.params.userCode,
            deleteAt: null,
          },
        }
      )
      .then(function (user) {
        if (user) {
          return res.status(200).json({
            status: 200,
            message: "Success delete user",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Failed delete user",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "User not found",
    });
  }
};

export const addRoleUser = async (req, res, next) => {
  try {
    await model.managementUser.roleUser
      .create({
        roleCode: req.body.roleCode,
        userCode: req.body.userCode,
      })
      .then(function (role) {
        if (role) {
          return res.status(200).json({
            status: 200,
            message: "Success add role to user",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Failed add role to user",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Role or user not found",
    });
  }
};

export const deleteRoleUser = async (req, res, next) => {
  try {
    const roleUser = await model.managementUser.roleUser.findOne({
      where: {
        ruCode: req.params.ruCode,
        deleteAt: null,
      },
    });
    if(!roleUser){
      return res.status(404).json({
        status: 404,
        message: "User role not found",
      });
    }
    await model.managementUser.roleUser
      .update(
        {
          deleteAt: new Date(),
        },
        {
          where: {
            ruCode: req.params.ruCode,
            deleteAt: null,
          },
        }
      )
      .then(function (role) {
        if (role) {
          return res.status(200).json({
            status: 200,
            message: "Success delete role from user",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Failed delete role from user",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Role user not found",
    });
  }
};

export const listRole = async (req, res, next) => {
  try {
    const role = await model.managementUser.roleUser.findAll({
      where: {
        userCode: req.params.userCode,
        deleteAt: null,
      },
      include: [
        {
          model: model.managementUser.role,
          where: {
            deleteAt: null,
            status: "Public"
          },
        },
      ],
    });
    const tempRole = [];
    role.forEach((item, index, arr) => {
      let temporary = {
        ruCode:item.ruCode,
        roleCode: item.role.roleCode,
        role: item.role.role,
      } 
      tempRole.push(temporary);
    });
    return res.status(200).json({
      status: 200,
      message: "List role of user found",
      data: tempRole,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "List role of user not found",
    });
  }
};

export const addPermission = async (req, res, next) => {
  try {
    await model.managementUser.userPermission
      .create({
        userCode: req.body.userCode,
        permissionCode: req.body.permissionCode,
      })
      .then(function (data) {
        if (data) {
          return res.status(200).json({
            status: 200,
            message: "Success add special permission to user",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Failed add special permission to user",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "User or permission not found",
    });
  }
};

export const deletePermission = async (req, res, next) => {
  try {
    const userPermission = await model.managementUser.userPermission.findOne({
      where: {
        upCode: req.params.upCode,
        deleteAt: null,
      },
    });
    if(!userPermission){
      return res.status(404).json({
        status: 404,
        message: "User permission not found",
      });
    }
    await model.managementUser.userPermission
      .update(
        {
          deleteAt: new Date(),
        },
        {
          where: {
            upCode: req.params.upCode,
            deleteAt: null,
          },
        }
      )
      .then(function (user) {
        if (user) {
          return res.status(200).json({
            status: 200,
            message: "Success delete special permission from user",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Failed delete special permission from user",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "User permission not found",
    });
  }
};

export const listPermission = async (req, res, next) => {
  try {
    const permission = await model.managementUser.userPermission.findAll({
      attributes: ["upCode"],
      where: {
        userCode: req.params.userCode,
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
    permission.forEach((item, index, arr) => {
      let temporary = {
        upCode:item.upCode,
        permissionCode: item.permission.permisionCode,
        permission: item.permission.permission,
        description: item.permission.description,
        moduleCode: item.permission.moduleCode
      } 
      tempPermission.push(temporary);
    });
    return res.status(200).json({
      status: 200,
      message: "List special permission of user found",
      data: tempPermission,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "List special permission of user not found",
    });
  }
};
