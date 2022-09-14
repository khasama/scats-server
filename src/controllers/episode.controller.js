const EpisodeService = require("../services/episode.service");

const EpisodeController = {};

EpisodeController.getAllEpisode = (req, res, next) => {
    const idMovie = req.params.idMovie;
    const idServer = req.params.idServer;
    if (idMovie && idServer) {
        const data = {
            idMovie,
            idServer,
        };
        EpisodeService.getAllEpisode(data)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

EpisodeController.updateOne = (req, res, next) => {
    const idEpisode = req.params.id;
    const link = req.body.link;
    if (idEpisode && link) {
        const data = {
            idEpisode,
            link,
        };
        EpisodeService.updateOne(data)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

EpisodeController.getFullLink = (req, res, next) => {
    const idMovie = req.params.idMovie;
    const episode = req.params.episode;
    if (idMovie && episode) {
        const data = {
            idMovie,
            episode,
        };
        EpisodeService.getFullLink(data)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

EpisodeController.addEP = (req, res, next) => {
    const idMovie = req.body.idMovie;
    const idServer = req.body.idServer;
    const episode = req.body.episode;
    const link = req.body.link;
    if (idMovie && idServer && episode && link) {
        const data = {
            idMovie,
            idServer,
            episode,
            link,
        };
        EpisodeService.addEP(data)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

// EpisodeController.addMultiEP = (req, res, next) => {
//     const anime = req.body.anime;
//     const server = req.body.server;
//     const multi = req.body.multi;
//     if (anime && server && multi) {
//         const data = {
//             anime,
//             server,
//             multi,
//         };
//         EpisodeService.addMultiEP(data)
//             .then((rs) => {
//                 return res.status(200).json(rs);
//             })
//             .catch((err) => {
//                 console.log(err);
//                 return res
//                     .status(500)
//                     .json({ status: "error", message: "Has a fucking error" });
//             });
//     } else {
//         return res
//             .status(400)
//             .json({ status: "failed", message: "Missing params" });
//     }
// };

EpisodeController.deleteEp = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        EpisodeService.deleteEp(id)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

EpisodeController.getLink = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        EpisodeService.getLink(id)
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

module.exports = EpisodeController;
