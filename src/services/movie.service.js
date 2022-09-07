const MovieModel = require("../models/movie.model");
const GenreModel = require("../models/genre.model");

const MovieService = {};

MovieService.getAll = async () => {
    try {
        const [rows] = await MovieModel.getAll();
        return { status: "success", data: rows };
    } catch (error) {
        throw error;
    }
};

module.exports = MovieService;
