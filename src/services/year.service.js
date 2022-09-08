const YearModel = require("../models/year.model");
const MovieModel = require("../models/movie.model");

const YearService = {};

YearService.getAll = async () => {
    try {
        const [years] = await YearModel.getAll();
        return { status: "success", data: years };
    } catch (error) {
        throw error;
    }
};

YearService.getInformation = async (id) => {
    try {
        const [year] = await YearModel.getInformation(id);
        return { status: "success", data: year[0] };
    } catch (error) {
        throw error;
    }
};

YearService.createOne = async (data) => {
    try {
        const [rows] = await YearModel.createOne(new YearModel(data));
        if (rows.insertId > 0) {
            const [year] = await YearModel.getInformation(rows.insertId);
            return { status: "success", data: year[0] };
        }
        return { status: "failed", message: "Can not create" };
    } catch (error) {
        throw error;
    }
};

YearService.updateOne = async (data) => {
    try {
        const [year] = await YearModel.updateOne(data);
        return { status: "success", data: year };
    } catch (error) {
        throw error;
    }
};

YearService.deleteOne = async (id) => {
    try {
        const [movies] = await YearModel.getAMOY(id);
        if (movies.length === 0) {
            const [rows] = await YearModel.deleteOne(id);
            if (rows.affectedRows !== 0) return { status: "success" };
        }
        return { status: "failed", message: "Can not delete" };
    } catch (error) {
        throw error;
    }
};

module.exports = YearService;
