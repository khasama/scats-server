const UserModel = require("../models/user.model");
const RoleModel = require("../models/role.model");
const bcrypt = require("bcrypt");

const UserService = {};

UserService.getAll = async () => {
    try {
        const users = await UserModel.findAll({
            include: [
                {
                    model: RoleModel,
                    attributes: ['id', 'name']
                },
            ]
        });
        return { status: "success", data: users };
    } catch (error) {
        throw error;
    }
};

UserService.getUser = async (id) => {
    try {
        const user = await UserModel.findOne({
            where: { id },
            include: [
                {
                    model: RoleModel,
                    attributes: ['id', 'name']
                },
            ]
        });
        return { status: "success", data: user };
    } catch (error) {
        throw error;
    }
};

UserService.changeRole = async (user) => {
    try {
        // const [row] = await UserModel.changeRole(user);
        // if (row.affectedRows != 0) return { status: "success" };
        // return { status: "failed", message: "Not found" };
    } catch (error) {
        throw error;
    }
};

module.exports = UserService;
