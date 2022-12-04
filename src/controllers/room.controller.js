const RoomService = require("../services/room.service");

const RoomController = {};

RoomController.getRoomLive = (req, res, next) => {
    RoomService.getRoomLive()
        .then((rs) => {
            return res.status(200).json(rs);
        })
        .catch((err) => {
            return res
                .status(500)
                .json({ status: "error", message: "Has a fucking error" });
        });
};

RoomController.createOne = (req, res, next) => {
    const data = req.body;
    if (data.idUser) {
        RoomService.createOne(data)
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
            .json({ status: "failed", message: "Missing params" });
    }
};

RoomController.getMyRoom = (req, res, next) => {
    const idUser = req.body.idUser;
    if (idUser) {
        RoomService.getMyRoom(idUser)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    }
};

RoomController.checkPass = (req, res, next) => {
    const { id, pass } = req.body;
    if (id && pass) {
        RoomService.checkPass({ id, pass })
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
            .json({ status: "failed", message: "Missing params" });
    }
};

module.exports = RoomController;
