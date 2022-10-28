const LinkModel = require("../models/link.model");

const LinkService = {};

LinkService.getInformation = async (id) => {
    try {
        const link = await LinkModel.findOne({
            where: {
                id
            }
        });
        return { status: "success", data: link };
    } catch (error) {
        throw error;
    }
};

LinkService.createOne = async (data) => {
    try {
        const newLink = await LinkModel.create({
            link: data.link,
            episode_id: data.idEpisode,
            server_id: data.idServer,
        });
        return { status: "success", data: newLink };
    } catch (error) {
        throw error;
    }
};

LinkService.updateOne = async (data) => {
    try {
        await LinkModel.update(
            {
                link: data.link,
            },
            {
                where: {
                    id: data.id
                }
            });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

LinkService.deleteOne = async (id) => {
    try {
        await LinkModel.destroy({ where: { id }, force: true });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

module.exports = LinkService;
