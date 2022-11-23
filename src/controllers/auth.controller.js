const AuthService = require("../services/auth.service");

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
                    req.session.access_token = rs.data.access_token;
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
                    req.session.access_token = rs.data.access_token;
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
    const idUser = req.body.id;
    if (idUser) {
        try {
            const rs = await AuthService.refreshToken(idUser);
            if (rs.status == "success") {
                req.session.user = rs.data.user;
                req.session.access_token = rs.data.access_token;
                return res.status(200).json(rs);
            } else {
                return res.status(200).json(rs);
            }
        } catch (error) {
            console.log(error);
            return res
                .status(500)
                .json({ status: "error", message: "Has a fucking error" });
        }
    }
};

module.exports = AuthController;