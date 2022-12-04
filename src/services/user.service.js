const UserModel = require("../models/user.model");
const RoleModel = require("../models/role.model");
const bcrypt = require("bcrypt");
const drive = require("../utils/drive");
const image = require("../utils/image");
const fs = require('fs');

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

UserService.update = async ({ idUser, username, email, avatar }) => {
    try {

        const u = await UserModel.findOne({
            where: { id: idUser },
            include: [
                {
                    model: RoleModel,
                    attributes: ['id', 'name']
                },
            ]
        });
        const currentAvatarId = u.avatar.split("=")[1];
        let newInfor = {
            username,
            email
        }
        if (avatar) {
            if (currentAvatarId != '1medVHZnNZJj8A_XHEqsPx8cl6dT1MRnu') drive.deleteFile(currentAvatarId);
            const base64 = avatar;
            const d = Buffer.from(base64, 'base64');
            const newImage = await image.resize(d, "avatar");
            const avatarId = await drive.uploadAvatar({ name: `${username}.webp`, buffer: newImage, type: "webp" }, true);
            newInfor = { ...newInfor, avatar: `https://drive.google.com/uc?id=${avatarId}` }
        }

        await UserModel.update(newInfor, { where: { id: idUser } });

        const newUser = await UserModel.findOne({
            where: { id: idUser },
            include: [
                {
                    model: RoleModel,
                    attributes: ['id', 'name']
                },
            ]
        });

        const user = {
            id: newUser.id,
            username: newUser.username,
            email: newUser.email,
            avatar: newUser.avatar,
            role: newUser.Role.name,
        };
        return { status: "success", data: user };
    } catch (error) {
        (error);
        throw error;
    }
};

module.exports = UserService;
