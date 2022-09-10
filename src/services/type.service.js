const TypeModel = require("../models/type.model");

const TypeService = {};

TypeService.getAll = async () => {
    try {
        const [types] = await TypeModel.getAll();
        return { status: "success", data: types };
    } catch (error) {
        throw error;
    }
};

TypeService.getInformation = async (id) => {
    try {
        const [type] = await TypeModel.getInformation(id);
        return { status: "success", data: type[0] };
    } catch (error) {
        throw error;
    }
};

TypeService.createOne = async (data) => {
    try {
        const [rows] = await TypeModel.createOne(new TypeModel(data));
        if (rows.insertId > 0) {
            const [type] = await TypeModel.getInformation(rows.insertId);
            return { status: "success", data: type[0] };
        }
        return { status: "failed", message: "Can not create" };
    } catch (error) {
        throw error;
    }
};

TypeService.updateOne = async (data) => {
    try {
        const [type] = await TypeModel.updateOne(data);
        return { status: "success", data: type };
    } catch (error) {
        throw error;
    }
};

TypeService.deleteOne = async (id) => {
    try {
        const [movies] = await TypeModel.getAMOT(id);
        if (movies.length === 0) {
            const [rows] = await TypeModel.deleteOne(id);
            if (rows.affectedRows !== 0) return { status: "success" };
        }
        return { status: "failed", message: "Can not delete" };
    } catch (error) {
        throw error;
    }
};

module.exports = TypeService;
