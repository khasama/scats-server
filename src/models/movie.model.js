const promisePool = require("../configs/db.config");
const slug = require("slug");

function Movie(movie) {
    this.name = movie.name;
    this.othername = movie.othername;
    this.slug = slug(movie.name);
    this.content = movie.content;
    this.thumb = movie.thumb;
    this.background = movie.background;
    this.viewd = 0;
    this.liked = 0;
    this.year = movie.year;
    this.status = 1;
    this.country = movie.country;
    this.type = movie.type;
    this.server = movie.server;
    this.newupdate = 0;
    this.deleted = 0;
}

Movie.getAll = async () => {
    return await promisePool.execute(
        `
        SELECT * FROM tb_movie m
        INNER JOIN tb_status s
        ON m.idStatus = s.idStatus
        INNER JOIN tb_year y
        ON m.idYear = y.idYear
        INNER JOIN tb_country c
        ON m.idCountry = c.idCountry
        INNER JOIN tb_type t
        ON m.idType = t.idType
        `
    );
};

Movie.createOne = async (movie) => {
    return await promisePool.execute(
        `
        INSERT INTO tb_movie
        VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [
            movie.name,
            movie.othername,
            movie.slug,
            movie.content,
            movie.thumb,
            movie.background,
            movie.viewd,
            movie.liked,
            movie.year,
            movie.status,
            movie.country,
            movie.type,
            movie.server,
            movie.newupdate,
            movie.deleted,
        ]
    );
};

Movie.updateOne = async (movie) => {
    return await promisePool.execute(
        `
        UPDATE tb_movie
        SET Name = ?,
            OtherName = ?,
            Slug = ?,
            Content = ?,
            Thumb = ?,
            Background = ?,
            Viewed = ?,
            Liked = ?,
            idYear = ?,
            idStatus = ?,
            idCountry = ?,
            idType = ?,
            MainServer = ?,
        WHERE idAnime = ?
        `,
        [
            movie.name,
            movie.othername,
            slug(movie.name),
            movie.content,
            movie.thumb,
            movie.bthumb,
            movie.viewed,
            movie.liked,
            movie.year,
            movie.status,
            movie.country,
            movie.type,
            movie.mainserver,
            movie.id,
        ]
    );
};

Movie.getInformation = async (id) => {
    return await promisePool.execute(
        `
        SELECT * FROM tb_movie m
        INNER JOIN tb_status s
        ON m.idStatus = s.idStatus
        INNER JOIN tb_year y
        ON m.idYear = y.idYear
        INNER JOIN tb_country c
        ON m.idCountry = c.idCountry
        INNER JOIN tb_type t
        ON m.idType = t.idType
        INNER JOIN tb_server sv
        ON m.MainServer = sv.idServer
        WHERE m.idMovie = ?
        `,
        [id]
    );
};

Movie.deleteOrActivate = async (id, type) => {
    if (type === 0) {
        return await promisePool.execute(
            `
            UPDATE tb_movie
            SET Deleted = 0
            WHERE idMovie = ?
            `,
            [id]
        );
    } else {
        return await promisePool.execute(
            `
            UPDATE tb_movie
            SET Deleted = 1
            WHERE idMovie = ?
            `,
            [id]
        );
    }
};

module.exports = Movie;
