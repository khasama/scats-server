const MovieService = require("../services/movie.service");

const MovieController = {};

MovieController.getAll = (req, res, next) => {
    MovieService.getAll()
        .then((rs) => {
            return res.status(200).json(rs);
        })
        .catch((err) => {
            console.log(err);
            return res
                .status(500)
                .json({ status: "error", message: "Has a fucking error" });
        });
};

MovieController.createOne = (req, res, next) => {
    const name = req.body.name;
    const othername = req.body.othername;
    const content = req.body.content;
    const thumb = req.body.thumb;
    const background = req.body.background;
    const year = req.body.year;
    const country = req.body.country;
    const type = req.body.type;
    const server = req.body.server;

    if (
        thumb &&
        background &&
        name &&
        othername &&
        content &&
        year &&
        country &&
        type &&
        server
    ) {
        const data = {
            name,
            othername,
            content,
            thumb,
            background,
            year,
            country,
            type,
            server,
        };
        MovieService.createOne(data)
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
            .json({ status: "failed", message: "Missing params" });
    }
};

MovieController.getInformation = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        MovieService.getInformation(id)
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
            .json({ status: "failed", message: "Missing params" });
    }
};

module.exports = MovieController;
