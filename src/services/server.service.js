const ServerModel = require("../models/server.model");

const ServerService = {};

ServerService.getAll = async () => {
    try {
        const [servers] = await ServerModel.getAll();
        return { status: "success", data: servers };
    } catch (error) {
        throw error;
    }
};

ServerService.getInformation = async (id) => {
    try {
        const [server] = await ServerModel.getInformation(id);
        return { status: "success", data: server[0] };
    } catch (error) {
        throw error;
    }
};

ServerService.createOne = async (data) => {
    try {
        const [rows] = await ServerModel.createOne(new ServerModel(data));
        if (rows.insertId > 0) {
            const [server] = await ServerModel.getInformation(rows.insertId);
            return { status: "success", data: server[0] };
        }
        return { status: "failed", message: "Can not create" };
    } catch (error) {
        throw error;
    }
};

ServerService.updateOne = async (data) => {
    try {
        const [rows] = await ServerModel.updateOne(data);
        if (rows.affectedRows != 0) {
            const [server] = await ServerModel.getOne(data.id);
            return { status: "success", data: server };
        }
        return { status: "failed", message: "Can not update" };
    } catch (error) {
        throw error;
    }
};

ServerService.deleteOne = async (id) => {
    try {
        const [check] = await ServerModel.getOneEp(id);
        if (check.length == 0) {
            const [rows] = await ServerModel.deleteOne(id);
            if (rows.affectedRows != 0) return { status: "success" };
        }
        return { status: "failed", message: "Server is in use" };
    } catch (error) {
        throw error;
    }
};

module.exports = ServerService;
