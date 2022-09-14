const EpisodeModel = require("../models/episode.model");
// const { getRealLink, convertMulti } = require("../utils");
const EpisodeService = {};

EpisodeService.getAllEpisode = async (data) => {
    try {
        const [rows] = await EpisodeModel.getAllEpisode(data);
        return { status: "success", data: rows };
    } catch (error) {
        throw error;
    }
};

EpisodeService.getFullLink = async (data) => {
    try {
        const [rows] = await EpisodeModel.getFullLink(data);
        return { status: "success", data: rows };
    } catch (error) {
        throw error;
    }
};

EpisodeService.updateOne = async (data) => {
    try {
        const [rows] = await EpisodeModel.updateOne(data);
        if (rows.affectedRows != 0) {
            const [link] = await EpisodeModel.getOneEp(data.idEpisode, true);
            return { status: "success", data: link[0] };
        }
        return { status: "failed", message: "Can not update" };
    } catch (error) {
        throw error;
    }
};

EpisodeService.addEP = async (data) => {
    try {
        const [rows] = await EpisodeModel.getOneEp(data, false);
        if (rows.length == 0) {
            const ep = {
                anime: data.anime,
                episode: data.episode,
                server: data.server,
                link: data.link,
            };
            const [rs] = await EpisodeModel.addEP(ep);
            if (rs.insertId != 0) {
                const [link] = await EpisodeModel.getOneEp(rs.insertId, true);
                return { status: "success", data: link[0] };
            }
        }
        return { status: "failed", message: "Already exist" };
    } catch (error) {
        throw error;
    }
};

// EpisodeService.addMultiEP = async (data) => {
//     try {
//         const multi = data.multi;
//         const server = data.server;
//         const anime = data.anime;
//         const listEp = convertMulti(multi, server);
//         for (const ep of listEp) {
//             const [rows] = await EpisodeModel.addEP({
//                 anime,
//                 server,
//                 episode: ep.episode,
//                 link: ep.link,
//             });
//         }

//         return { status: `success` };
//     } catch (error) {
//         throw error;
//     }
// };

EpisodeService.deleteEp = async (id) => {
    try {
        const [rows] = await EpisodeModel.deleteEp(id);
        if (rows.affectedRows > 0) {
            return { status: "success" };
        }
        return { status: "failed", message: "Can not delete" };
    } catch (error) {
        throw error;
    }
};

EpisodeService.getLink = async (id) => {
    try {
        const [link] = await EpisodeModel.getOneEp(id, true);
        return { status: "success", data: link[0] };
    } catch (error) {
        throw error;
    }
};

module.exports = EpisodeService;
