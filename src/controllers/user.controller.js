require("dotenv").config();
const UserService = require("../services/user.service");

const UserController = {};

UserController.getAll = (req, res, next) => {
    UserService.getAll()
        .then((rs) => {
            return res.status(200).json(rs);
        })
        .catch((err) => {
            return res
                .status(500)
                .json({ status: "error", message: "Has a fucking error" });
        });
};

UserController.getUser = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        UserService.getUser(id)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
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

UserController.changeRole = (req, res, next) => {
    const idUser = req.params.id;
    const idRole = req.body.idRole;
    if (idUser && idRole) {
        UserService.changeRole(idUser, idRole)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
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

module.exports = UserController;
