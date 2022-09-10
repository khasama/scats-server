const MovieModel = require("../models/movie.model");
const GenreModel = require("../models/genre.model");
const YearModel = require("../models/year.model");
const CountryModel = require("../models/country.model");
const ServerModel = require("../models/server.model");
const TypeModel = require("../models/type.model");
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
        return res.render("pages/movie", {
            movies,
            years,
            countries,
            servers,
            types,
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
