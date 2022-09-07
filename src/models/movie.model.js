const promisePool = require("../configs/db.config");
const slug = require("slug");

function Movie(movie) {
    this.name = movie.name;
    this.othername = movie.othername;
    this.slug = slug(movie.name);
    this.year = movie.year;
    this.content = movie.content;
    this.viewd = 0;
    this.liked = 0;
    this.thumb = movie.thumb;
    this.bthumb = movie.bthumb;
    this.type = movie.type;
    this.mainserver = 4;
    this.status = 2;
    this.newupdate = 0;
    this.activate = 1;
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
        VALUES (NULL, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
        `,
        [
            movie.name,
            movie.othername,
            movie.slug,
            movie.content,
            movie.thumb,
            movie.bthumb,
            movie.viewd,
            movie.liked,
            movie.year,
            movie.status,
            movie.mainserver,
            movie.type,
            movie.newupdate,
            movie.activate,
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
            View = ?,
            Liked = ?,
            idYear = ?,
            Thumb = ?,
            BigThumb = ?,
            MainServer = ?,
            idStatus = ?
        WHERE idAnime = ?
        `,
        [
            movie.name,
            movie.othername,
            slug(movie.name),
            movie.content,
            movie.view,
            movie.liked,
            movie.year,
            movie.thumb,
            movie.bthumb,
            movie.mainserver,
            movie.status,
            movie.id,
        ]
    );
};

module.exports = Movie;
