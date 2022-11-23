require("dotenv").config();
const UserModel = require("../models/user.model");
const RoleModel = require("../models/role.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { signAccessToken, signRefreshToken } = require("../utils");

const AuthService = {};

AuthService.register = async (data) => {
    try {
        const hasUser = await UserModel.findOne({ where: { username: data.username } });
        if (hasUser) return { status: "failed", message: "Username already used" };
        const pass = data.password;
        const hash = await bcrypt.hash(pass, 10);
        const newUser = await UserModel.create({
            email: '',
            username: data.username,
            password: hash,
        });
        return { status: "success", data: newUser };
    } catch (error) {
        throw error;
    }
};

AuthService.login = async (data) => {
    try {
        const hasUser = await UserModel.findOne({
            where: { username: data.username },
            include: [
                {
                    model: RoleModel,
                    attributes: ['id', 'name']
                },
            ]
        });
        if (hasUser) {
            const match = await bcrypt.compare(data.password, hasUser.password);
            if (match) {
                const user = {
                    id: hasUser.id,
                    username: hasUser.username,
                    email: hasUser.email,
                    avatar: hasUser.avatar,
                    role: hasUser.Role.name,
                };
                const accessToken = await signAccessToken(user);
                const refreshToken = await signRefreshToken(user);
                UserModel.update(
                    {
                        refresh_token: refreshToken
                    },
                    {
                        where: {
                            id: hasUser.id
                        }
                    });

                return { status: "success", data: { user, access_token: accessToken } };
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

AuthService.refreshToken = async (id) => {
    try {
        const u = await UserModel.findOne({ where: { id } });
        const token = JSON.parse(JSON.stringify(u)).refresh_token;

        const payload = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        const user = {
            id: payload.id,
            username: payload.username,
            email: payload.email,
            avatar: payload.avatar,
            role: payload.role,
        };
        const accessToken = await signAccessToken(user);
        return { status: "success", data: { user, access_token: accessToken } };
    } catch (error) {
        return { status: "failed" };
    }
};

AuthService.loginAdminSite = async (data) => {
    try {
        const hasUser = await UserModel.findOne({
            where: { username: data.username },
            include: [
                {
                    model: RoleModel,
                    attributes: ['id', 'name']
                },
            ]
        });
        if (hasUser) {
            const match = await bcrypt.compare(data.password, hasUser.password);
            if (match) {
                if (hasUser.role_id == 1 || hasUser.role_id == 2) {
                    const user = {
                        id: hasUser.id,
                        username: hasUser.id,
                        email: hasUser.email,
                        avatar: hasUser.avatar,
                        role: hasUser.Role.name,
                    };
                    const accessToken = await signAccessToken(user);
                    const refreshToken = await signRefreshToken(user);

                    UserModel.update(
                        {
                            refresh_token: refreshToken
                        },
                        {
                            where: {
                                id: hasUser.id
                            }
                        });

                    return { status: "success", data: { user, access_token: accessToken } };
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

module.exports = AuthService;