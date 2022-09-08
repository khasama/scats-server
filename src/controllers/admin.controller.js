const MovieModel = require("../models/movie.model");
const GenreModel = require("../models/genre.model");
const YearModel = require("../models/year.model");
const CountryModel = require("../models/country.model");
const AdminController = {};

AdminController.home = (req, res) => {
    res.render("");
};

AdminController.getAllMovie = async (req, res) => {
    try {
        const [movies] = await MovieModel.getAll();
        return res.render("pages/movie", { movies });
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

// AdminController.getProdDetail = async (req, res) => {
//     const _id = mongoose.Types.ObjectId(req.params.id);
//     try {
//         const product = await ProductModel.find({ _id })
//             .populate("category")
//             .limit(1);
//         res.status(200).json({ status: "success", data: product[0] });
//     } catch (error) {
//         console.log(error);
//     }
// };

// AdminController.categories = (req, res) => {
//     res.render("admin");
// };

// AdminController.users = (req, res) => {
//     res.render("admin");
// };

module.exports = AdminController;
