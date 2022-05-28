import { model } from "../../models/index.js";

export const getAllPermission = async (req, res, next) => {
  try {
    const permission = await model.managementUser.permission.findAll({
      where: {
        deleteAt: null,
      },
    });
    return res.status(200).json({
      status: 200,
      message: "Permission found",
      data: permission,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Permission not found",
    });
  }
};

export const getOnePermission = async (req, res, next) => {
  try {
    const permission = await model.managementUser.permission.findOne({
      where: {
        permissionCode: req.params.permissionCode,
        deleteAt: null,
      },
    });
    if (!permission) {
      return res.status(404).json({
        status: 404,
        message: "Permission not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Permission found",
      data: permission,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Permission not found",
    });
  }
};

export const getAllPermissionByModule = async (req, res, next) => {
  try {
    const permission = await model.managementUser.permission.findAll({
      where: {
        moduleCode: req.params.moduleCode,
        deleteAt: null,
      },
    });
    if (!permission) {
      return res.status(404).json({
        status: 404,
        message: "Permission not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Permission found",
      data: permission,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Permission not found",
    });
  }
};

export const getAllPermissionWithModule = async (req, res, next) => {
  try {
    const module = await model.managementUser.module.findAll({
      where: {
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
    return res.status(200).json({
      status: 200,
      message: "List permission with module found",
      data: module,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "List permission with module not found",
    });
  }
};
