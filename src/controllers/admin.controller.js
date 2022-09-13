const MovieModel = require("../models/movie.model");
const GenreModel = require("../models/genre.model");
const YearModel = require("../models/year.model");
const CountryModel = require("../models/country.model");
const ServerModel = require("../models/server.model");
const TypeModel = require("../models/type.model");
const StatusModel = require("../models/status.model");

const AdminController = {};

AdminController.home = (req, res) => {
    res.render("");
};

AdminController.getAllMovie = async (req, res) => {
    try {
        const [movies] = await MovieModel.getAll();
        const [years] = await YearModel.getAll();
        const [countries] = await CountryModel.getAll();
        const [servers] = await ServerModel.getAll();
        const [types] = await TypeModel.getAll();
        const [genres] = await GenreModel.getAll();
        return res.render("pages/movie", {
            movies,
            years,
            countries,
            servers,
            types,
            genres,
        });
    } catch (error) {
        throw error;
    }
};

AdminController.getMovie = async (req, res) => {
    const id = req.params.id;

    try {
        const [movie] = await MovieModel.getInformation(id);
        const [years] = await YearModel.getAll();
        const [countries] = await CountryModel.getAll();
        const [servers] = await ServerModel.getAll();
        const [types] = await TypeModel.getAll();
        const [statuses] = await StatusModel.getAll();
        return res.render("pages/movie/information", {
            movie: movie[0],
            years,
            countries,
            servers,
            types,
            statuses,
        });
    } catch (error) {
        throw error;
    }
};

AdminController.getEpisodes = async (req, res) => {
    const id = req.params.id;
    try {
        const [movie] = await MovieModel.getInformation(id);
        return res.render("pages/episode", {
            movie: movie[0],
        });
    } catch (error) {
        throw error;
    }
};

AdminController.getAllGenre = async (req, res) => {
    try {
        const [genres] = await GenreModel.getAll();
        return res.render("pages/genre", { genres });
    } catch (error) {
        throw error;
    }
};

AdminController.getAllYear = async (req, res) => {
    try {
        const [years] = await YearModel.getAll();
        return res.render("pages/year", { years });
    } catch (error) {
        throw error;
    }
};

AdminController.getAllCountry = async (req, res) => {
    try {
        const [countries] = await CountryModel.getAll();
        return res.render("pages/country", { countries });
    } catch (error) {
        throw error;
    }
};

AdminController.getAllServer = async (req, res) => {
    try {
        const [servers] = await ServerModel.getAll();
        return res.render("pages/server", { servers });
    } catch (error) {
        throw error;
    }
};

AdminController.getAllType = async (req, res) => {
    try {
        const [types] = await TypeModel.getAll();
        return res.render("pages/type", { types });
    } catch (error) {
        throw error;
    }
};

module.exports = AdminController;
