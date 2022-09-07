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

module.exports = MovieController;
