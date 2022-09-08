const promisePool = require("../configs/db.config");
const slug = require("slug");

function Country(country) {
    this.country = country.country;
    this.slug = slug(country.country);
}

Country.getAll = async () => {
    return await promisePool.execute("SELECT * FROM tb_country");
};

Country.getInformation = async (id) => {
    return await promisePool.execute(
        "SELECT * FROM tb_country WHERE idCountry = ?",
        [id]
    );
};

Country.createOne = async (country) => {
    return await promisePool.execute(
        `
        INSERT INTO tb_country
        VALUES (NULL, ?, ?)
        `,
        [country.country, country.slug]
    );
};

Country.updateOne = async (country) => {
    return await promisePool.execute(
        `
        UPDATE tb_country
        SET Country = ?,
            CountrySlug = ?
        WHERE idCountry = ?
        `,
        [country.country, slug(country.country), country.id]
    );
};

Country.deleteOne = async (id) => {
    return await promisePool.execute(
        `
        DELETE FROM tb_country
        WHERE idCountry = ?
        `,
        [id]
    );
};

Country.getAMOC = async (id) => {
    return await promisePool.execute(
        `
        SELECT * FROM tb_country c
        INNER JOIN tb_movie m
        ON c.idCountry = m.idCountry
        WHERE c.idCountry = ?
        `,
        [id]
    );
};

module.exports = Country;
