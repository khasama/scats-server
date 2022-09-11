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

MovieService.createOne = async (data) => {
    try {
        const movie = new MovieModel({
            name: data.name,
            othername: data.othername,
            content: data.content,
            thumb: data.thumb,
            background: data.background,
            year: data.year,
            country: data.country,
            type: data.type,
            server: data.server,
        });
        const [rows] = await MovieModel.createOne(movie);
        if (rows.insertId > 0) {
            const [m] = await MovieModel.getInformation(rows.insertId);
            return { status: "success", data: m[0] };
        }
    } catch (error) {
        throw error;
    }
};

MovieService.updateOne = async (data) => {
    try {
        const [rows] = await MovieModel.updateOne(data);
        if (rows.affectedRows > 0) {
            const [movie] = await MovieModel.getInformation(rows.insertId);
            return { status: "success", data: movie[0] };
        }
    } catch (error) {
        throw error;
    }
};

MovieService.getInformation = async (id) => {
    try {
        const [movie] = await MovieModel.getInformation(id);
        return { status: "success", data: movie[0] };
    } catch (error) {
        throw error;
    }
};

module.exports = MovieService;
