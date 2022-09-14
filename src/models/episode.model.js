const promisePool = require("../configs/db.config");

function Episode(epsiode) {
    this.idMovie = epsiode.idMovie;
    this.idServer = epsiode.idServer;
    this.epsiode = epsiode.epsiode;
    this.link = epsiode.link;
}

// get all ep one server
Episode.getAllEpisode = async (episode) => {
    return await promisePool.execute(
        `
        SELECT * FROM tb_episode e
        INNER JOIN tb_server s
        ON e.idServer = s.idServer
        WHERE e.idMovie = ? 
        AND e.idServer = ?
        ORDER BY e.Episode ASC
        `,
        [episode.idMovie, episode.idServer]
    );
};

// get full link one ep
Episode.getFullLink = async (episode) => {
    return await promisePool.execute(
        `
        SELECT * FROM tb_episode e
        INNER JOIN tb_server s
        ON e.idServer = s.idServer
        WHERE e.idMovie = ? 
        AND e.Episode = ?
        `,
        [episode.idMovie, episode.episode]
    );
};

Episode.updateOne = async (episode) => {
    return await promisePool.execute(
        `
        UPDATE tb_episode
        SET Link = ?
        WHERE idEpisode = ?
        `,
        [episode.link, episode.idEpisode]
    );
};

Episode.addEP = async (episode) => {
    return await promisePool.execute(
        `
        INSERT INTO tb_episode
        VALUES (NULL, ?, ?, ?, ?)
        `,
        [episode.episode, episode.idMovie, episode.idServer, episode.link]
    );
};

Episode.getOneEp = async (episode, link) => {
    if (link) {
        return await promisePool.execute(
            `
            SELECT * FROM tb_episode
            INNER JOIN tb_server
            ON tb_episode.idServer = tb_server.idServer
            WHERE tb_episode.idEpisode = ?
            `,
            [episode]
        );
    }
    return await promisePool.execute(
        `
        SELECT idEpisode FROM tb_episode
        WHERE idMovie = ?
        AND idServer = ?
        AND Episode = ?
        `,
        [episode.idMovie, episode.idServer, episode.episode]
    );
};

Episode.deleteEp = async (id) => {
    return await promisePool.execute(
        `
        DELETE FROM tb_episode
        WHERE idEpisode = ?
        `,
        [id]
    );
};

module.exports = Episode;
