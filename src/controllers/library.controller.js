const LibraryService = require("../services/library.service");

const LibraryController = {};

LibraryController.getLibrary = (req, res, next) => {
    const idUser = req.params.id;
    if (idUser) {
        LibraryService.getLibrary(idUser)
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

LibraryController.addLibrary = (req, res, next) => {
    const { idUser, idMovie } = req.body;
    if (idUser && idMovie) {
        LibraryService.addLibrary({ idUser, idMovie })
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

LibraryController.deleteLibrary = (req, res, next) => {
    const id = req.body.id;
    if (id) {
        LibraryService.deleteLibrary(id)
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

module.exports = LibraryController;
