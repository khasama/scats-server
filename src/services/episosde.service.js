const EpisodeModel = require("../models/episode.model");
const LinkModel = require("../models/link.model");

const EpisodeService = {};

EpisodeService.getInformation = async (id) => {
    try {
        const episode = await EpisodeModel.findOne({
            where: {
                id
            }
        });
        return { status: "success", data: episode };
    } catch (error) {
        throw error;
    }
};

EpisodeService.createOne = async (data) => {
    try {
        const newEpisode = await EpisodeModel.create({
            episode: data.episode,
            hls: data.hls,
            movie_id: data.idMovie
        });
        return { status: "success", data: newEpisode };
    } catch (error) {
        throw error;
    }
};

EpisodeService.updateOne = async (data) => {
    try {
        await EpisodeModel.update(
            {
                episode: data.episode,
                hls: data.hls,
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

EpisodeService.deleteOne = async (id) => {
    try {
        await LinkModel.destroy({ where: { episode_id: id }, force: true });
        await EpisodeModel.destroy({ where: { id }, force: true });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

module.exports = EpisodeService;
