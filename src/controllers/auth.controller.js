require("dotenv").config();
const AuthService = require("../services/auth.service");
const jwt = require("jsonwebtoken");
const { signAccessToken } = require("../utils");

const AuthController = {};

AuthController.loginAdminSite = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        const data = {
            username,
            password,
        };
        AuthService.loginAdminSite(data)
            .then((rs) => {
                if (rs.status == "success") {
                    req.session.user = rs.data.user;
                    req.session.access_token = rs.data.accessToken;
                    req.session.refresh_token = rs.data.refreshToken;
                }
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Mising params" });
    }
};

AuthController.logout = (req, res, next) => {
    req.session.destroy();
    return res.status(200).json({ status: "success" });
};

AuthController.login = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        const data = {
            username,
            password,
        };
        AuthService.login(data)
            .then((rs) => {
                if (rs.status == "success") {
                    req.session.user = rs.data.user;
                    req.session.access_token = rs.data.accessToken;
                    req.session.refresh_token = rs.data.refreshToken;
                }
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Mising params" });
    }
};

AuthController.register = (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username && password) {
        const data = {
            username,
            password,
        };
        AuthService.register(data)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Mising params" });
    }
};

AuthController.refreshToken = async (req, res, next) => {
    const token = req.session.refresh_token;
    if (!token) return res.status(200).json({ status: "failed" });

    jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET,
        async (err, payload) => {
            if (err) {
                req.session.destroy();
                return res.status(200).json({ status: "failed" });
            }

            const user = {
                id: payload.id,
                username: payload.id,
                avatar: payload.avatar,
                role: payload.role,
            };
            const accessToken = await signAccessToken(user);
            req.session.access_token = accessToken;
            return res.status(200).json({ status: "success" });
        }
    );
};

module.exports = AuthController;