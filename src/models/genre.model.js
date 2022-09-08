const promisePool = require("../configs/db.config");
const slug = require("slug");

function Genre(genre) {
    this.genre = genre.genre;
    this.slug = slug(genre.genre);
}

Genre.getAll = async () => {
    return await promisePool.execute("SELECT * FROM tb_genre");
};

Genre.getInformation = async (id) => {
    return await promisePool.execute(
        "SELECT * FROM tb_genre WHERE idGenre = ?",
        [id]
    );
};

Genre.createOne = async (genre) => {
    return await promisePool.execute(
        `
        INSERT INTO tb_genre
        VALUES (NULL, ?, ?)
        `,
        [genre.genre, genre.slug]
    );
};

Genre.updateOne = async (genre) => {
    return await promisePool.execute(
        `
        UPDATE tb_genre
        SET Genre = ?,
            GenreSlug = ?
        WHERE idGenre = ?
        `,
        [genre.genre, slug(genre.genre), genre.id]
    );
};

Genre.deleteOne = async (id) => {
    return await promisePool.execute(
        `
        DELETE FROM tb_genre
        WHERE idGenre = ?
        `,
        [id]
    );
};

// All Movie Of Genre
Genre.getAMOG = async (id) => {
    return await promisePool.execute(
        `
        SELECT * FROM tb_genre_movie gm
        INNER JOIN tb_movie m
        ON gm.idMovie = m.idMovie
        WHERE gm.idGenre = ?
        `,
        [id]
    );
};

// All Genre Of Movie
Genre.getAGOM = async (id) => {
    return await promisePool.execute(
        `
        SELECT * FROM tb_genre_movie gm
        INNER JOIN tb_genre g
        ON gm.idGenre = g.idGenre 
        WHERE gm.idMovie = ?
        `,
        [id]
    );
};

module.exports = Genre;
