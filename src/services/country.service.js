const CountryModel = require("../models/country.model");

const CountryService = {};

CountryService.getAll = async () => {
    try {
        const [rows] = await CountryModel.getAll();
        return { status: "success", data: rows };
    } catch (error) {
        throw error;
    }
};

CountryService.getInformation = async (id) => {
    try {
        const [rows] = await CountryModel.getInformation(id);
        if (rows.length > 0) return { status: "success", data: rows[0] };
        return { status: "failed", message: "Not found" };
    } catch (error) {
        throw error;
    }
};

CountryService.createOne = async (country) => {
    try {
        const [rows] = await CountryModel.createOne(
            new CountryModel({ country })
        );
        if (rows.insertId != 0) {
            const [country] = await CountryModel.getInformation(rows.insertId);
            return { status: "success", data: country[0] };
        }
        return { status: "failed", message: "Can not create" };
    } catch (error) {
        throw error;
    }
};

CountryService.deleteOne = async (id) => {
    try {
        const [movies] = await CountryModel.getAMOC(id);
        if (movies.length == 0) {
            const [rows] = await CountryModel.deleteOne(id);
            if (rows.affectedRows != 0) {
                return { status: "success" };
            }
        }
        return { status: "failed", message: "Genre is being used" };
    } catch (error) {
        throw error;
    }
};

CountryService.getAMOC = async (id) => {
    try {
        const [movies] = await CountryModel.getAMOC(id);
        if (rows.length > 0) return { status: "success", data: movies };
        return { status: "failed", message: "Not found" };
    } catch (error) {
        throw error;
    }
};

CountryService.updateOne = async (data) => {
    try {
        const [rows] = await CountryModel.updateOne(data);
        if (rows.affectedRows > 0) {
            const [country] = await CountryModel.getInformation(data.id);
            return { status: "success", data: country[0] };
        }
        return { status: "failed", message: "Not found" };
    } catch (error) {
        throw error;
    }
};

module.exports = CountryService;
