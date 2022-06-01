import { model } from "../../models/index.js";

export const getAllRole = async (req, res, next) => {
  try {
    const role = await model.managementUser.role.findAll({
      where: {
        deleteAt: null,
        status: "Public"
      },
    });
    return res.status(200).json({
      status: 200,
      message: "Role found",
      data: role,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Role not found",
    });
  }
};

export const getOneRole = async (req, res, next) => {
  try {
    const role = await model.managementUser.role.findOne({
      where: {
        roleCode: req.params.roleCode,
        deleteAt: null,
        status: "Public"
      },
    });
    if (!role) {
      return res.status(404).json({
        status: 404,
        message: "Role not found",
      });
    }
    return res.status(200).json({
      status: 200,
      message: "Role found",
      data: role,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Role not found",
    });
  }
};

export const addRole = async (req, res, next) => {
  await model.managementUser.role
    .create({
      role: req.body.role,
      status: "Public"
    })
    .then(function (role) {
      if (role) {
        return res.status(200).json({
          status: 200,
          message: "Success add role",
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Failed add role",
        });
      }
    });
};

export const editRole = async (req, res, next) => {
  try {
    const role = await model.managementUser.role.findOne({
      where: {
        roleCode: req.params.roleCode,
        deleteAt: null,
      },
    });
    if (!role) {
      return res.status(404).json({
        status: 404,
        message: "Role not found",
      });
    }
    await model.managementUser.role
      .update(
        {
          role: req.body.role,
          updateAt: new Date(),
        },
        {
          where: {
            roleCode: req.params.roleCode,
            deleteAt: null,
            status: "Public"
          },
        }
      )
      .then(function (role) {
        if (role) {
          return res.status(200).json({
            status: 200,
            message: "Success edit role",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Failed edit role",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Role not found",
    });
  }
};

export const deleteRole = async (req, res, next) => {
  try {
    const role = await model.managementUser.role.findOne({
      where: {
        roleCode: req.params.roleCode,
        deleteAt: null,
        status: "Public"
      },
    });
    if (!role) {
      return res.status(404).json({
        status: 404,
        message: "Role not found",
      });
    }
    await model.managementUser.role
      .update(
        {
          deleteAt: new Date(),
        },
        {
          where: {
            roleCode: req.params.roleCode,
            deleteAt: null,
            status: "Public"
          },
        }
      )
      .then(function (role) {
        if (role) {
          return res.status(200).json({
            status: 200,
            message: "Success delete role",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Failed delete role",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Role not found",
    });
  }
};

export const addPermission = async (req, res, next) => {
  try {
    const role = await model.managementUser.role.findOne({
      where: {
        roleCode: req.body.roleCode,
        deleteAt: null,
        status: "Public"
      },
    });
    if (!role) {
      return res.status(404).json({
        status: 404,
        message: "Role not found",
      });
    }
    const permission = await model.managementUser.permission.findOne({
      where: {
        permissionCode: req.body.permissionCode,
        deleteAt: null,
      },
    });
    if (!permission) {
      return res.status(404).json({
        status: 404,
        message: "Permission not found",
      });
    }
    await model.managementUser.rolePermission
      .create({
        roleCode: req.body.roleCode,
        permissionCode: req.body.permissionCode,
      })
      .then(function (role) {
        if (role) {
          return res.status(200).json({
            status: 200,
            message: "Success add permission to role",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Failed add permission to role",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Role or permission not found",
    });
  }
};

export const deletePermission = async (req, res, next) => {
  try {
    const rolePermission = await model.managementUser.rolePermission.findOne({
      where: {
        rpCode: req.params.rpCode,
        deleteAt: null,
      },
    });
    if (!rolePermission) {
      return res.status(404).json({
        status: 404,
        message: "Permission role not found",
      });
    }
    await model.managementUser.rolePermission
      .update(
        {
          deleteAt: new Date(),
        },
        {
          where: {
            rpCode: req.params.rpCode,
            deleteAt: null,
          },
        }
      )
      .then(function (role) {
        if (role) {
          return res.status(200).json({
            status: 200,
            message: "Success delete permission from role",
          });
        } else {
          return res.status(400).json({
            status: 400,
            message: "Failed delete permission from role",
          });
        }
      });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "Role permission not found",
    });
  }
};

export const listPermission = async (req, res, next) => {
  try {
    const permission = await model.managementUser.rolePermission.findAll({
      attributes: ["rpCode"],
      where: {
        roleCode: req.params.roleCode,
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
    await permission.forEach((item, index, arr) => {
      let temporary = {
        rpCode:item.rpCode,
        permissionCode: item.permission.permisionCode,
        permission: item.permission.permission,
        description: item.permission.description,
        moduleCode: item.permission.moduleCode
      } 
      tempPermission.push(temporary);
    });
    return res.status(200).json({
      status: 200,
      message: "List permission of role found",
      data: tempPermission,
    });
  } catch (error) {
    return res.status(404).json({
      status: 404,
      message: "List permission of role not found",
    });
  }
};
