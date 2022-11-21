const UserModel = require("../models/user.model");
const RoleModel = require("../models/role.model");
const bcrypt = require("bcrypt");
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
                    username: hasUser.id,
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

module.exports = AuthService;