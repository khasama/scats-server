const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const { signAccessToken } = require("../utils");

const UserService = {};

UserService.register = async (data) => {
    try {
        const [username] = await UserModel.checkEU(data.username);
        if (username.length == 0) {
            const pass = data.password;
            const hash = await bcrypt.hash(pass, 10);
            const user = new UserModel({
                email: '',
                username: data.username,
                password: hash,
            });
            const [rows] = await UserModel.register(user);
            if (rows.insertId > 0) {
                return { status: "success" };
            }
        } else {
            return {
                status: "failed",
                message: "Email or Username already used",
            };
        }
    } catch (error) {
        throw error;
    }
};

UserService.login = async (data) => {
    try {
        const [rows] = await UserModel.checkEU(data.username);
        if (rows.length != 0) {
            const u = rows[0];
            const match = await bcrypt.compare(data.password, u.Password);
            if (match) {
                const user = {
                    id: u.idUser,
                    usernane: u.Username,
                    avatar: u.Avatar,
                    role: u.idRole,
                };
                const accessToken = await signAccessToken(user);
                await UserModel.updateLastAccess(u.idUser);

                return { status: "success", data: { user, accessToken } };
            } else {
                return { status: "failed", message: "Wrong password" };
            }
        } else {
            return { status: "failed", message: "Not found" };
        }
    } catch (error) {
        throw error;
    }
};

UserService.loginAdminSite = async (data) => {
    try {
        const [rows] = await UserModel.checkEU(data.username);
        if (rows.length != 0) {
            const u = rows[0];
            const match = await bcrypt.compare(data.password, u.Password);
            if (match) {
                if (u.idRole == 1 || u.idRole == 2) {
                    const user = {
                        id: u.idUser,
                        usernane: u.Username,
                        avatar: u.Avatar,
                        role: u.idRole,
                    };
                    const accessToken = await signAccessToken(user);
                    await UserModel.updateLastAccess(u.idUser);

                    return { status: "success", data: { user, accessToken } };
                } else {
                    return { status: "failed", message: "You not admin" };
                }
            } else {
                return { status: "failed", message: "Wrong password" };
            }
        } else {
            return { status: "failed", message: "Not found" };
        }
    } catch (error) {
        throw error;
    }
};

UserService.getAll = async () => {
    try {
        const [rows] = await UserModel.getAll();
        if (rows.length != 0) return { status: "success", data: rows };
        return { status: "failed", message: "Not found" };
    } catch (error) {
        throw error;
    }
};

UserService.getUser = async (idUser) => {
    try {
        const [user] = await UserModel.getUser(idUser);
        if (user.length != 0) return { status: "success", data: user[0] };
        return { status: "failed", message: "Not found" };
    } catch (error) {
        console.log(error)
        throw error;
    }
};

UserService.changeRole = async (user) => {
    try {
        const [row] = await UserModel.changeRole(user);
        if (row.affectedRows != 0) return { status: "success" };
        return { status: "failed", message: "Not found" };
    } catch (error) {
        console.log(error)
        throw error;
    }
};

module.exports = UserService;
