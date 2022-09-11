const StatusModel = require("../models/status.model");

const StatusService = {};

StatusService.getAll = async () => {
    try {
        const [statuses] = await StatusModel.getAll();
        return { status: "success", data: statuses };
    } catch (error) {
        throw error;
    }
};

StatusService.getInformation = async (id) => {
    try {
        const [stt] = await StatusModel.getInformation(id);
        return { status: "success", data: stt[0] };
    } catch (error) {
        throw error;
    }
};

StatusService.createOne = async (data) => {
    try {
        const [rows] = await StatusModel.createOne(new StatusModel(data));
        if (rows.insertId > 0) {
            const [stt] = await StatusModel.getInformation(rows.insertId);
            return { status: "success", data: stt[0] };
        }
        return { status: "failed", message: "Can not create" };
    } catch (error) {
        throw error;
    }
};

StatusService.updateOne = async (data) => {
    try {
        const [stt] = await StatusModel.updateOne(data);
        return { status: "success", data: stt };
    } catch (error) {
        throw error;
    }
};

StatusService.deleteOne = async (id) => {
    try {
        const [movies] = await StatusModel.getAMOT(id);
        if (movies.length === 0) {
            const [rows] = await StatusModel.deleteOne(id);
            if (rows.affectedRows !== 0) return { status: "success" };
        }
        return { status: "failed", message: "Can not delete" };
    } catch (error) {
        throw error;
    }
};

module.exports = StatusService;
