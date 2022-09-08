const promisePool = require("../configs/db.config");
const slug = require("slug");

function Year(year) {
    this.year = year.year;
    this.slug = slug(year.year);
}

Year.getAll = async () => {
    return await promisePool.execute(`SELECT * FROM tb_year`);
};

Year.getInformation = async (id) => {
    return await promisePool.execute(`SELECT * FROM tb_year WHERE idYear = ?`, [
        id,
    ]);
};

Year.createOne = async (year) => {
    return await promisePool.execute(
        `
        INSERT INTO tb_year
        VALUES (NULL, ?, ?)
        `,
        [year.year, year.slug]
    );
};

Year.updateOne = async (year) => {
    return await promisePool.execute(
        `
        UPDATE tb_year
        SET Year = ?,
            YearSlug = ?
        WHERE idYear = ?
        `,
        [year.year, slug(year.year), year.id]
    );
};

Year.deleteOne = async (id) => {
    return await promisePool.execute(
        `
        DELETE FROM tb_year
        WHERE idYear = ?
        `,
        [id]
    );
};

Year.getAMOY = async (id) => {
    return await promisePool.execute(
        `
        SELECT * FROM tb_year y
        INNER JOIN tb_movie m
        ON y.idYear = m.idYear
        WHERE y.idYear = ?
        `,
        [id]
    );
};

module.exports = Year;
