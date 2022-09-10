const promisePool = require("../configs/db.config");
const slug = require("slug");

function Type(type) {
    this.type = type.type;
    this.slug = slug(type.type);
}

Type.getAll = async () => {
    return await promisePool.execute(`SELECT * FROM tb_type`);
};

Type.getInformation = async (id) => {
    return await promisePool.execute(`SELECT * FROM tb_type WHERE idType = ?`, [
        id,
    ]);
};

Type.createOne = async (type) => {
    return await promisePool.execute(
        `
        INSERT INTO tb_type
        VALUES (NULL, ?, ?)
        `,
        [type.type, type.slug]
    );
};

Type.updateOne = async (type) => {
    return await promisePool.execute(
        `
        UPDATE tb_type
        SET Type = ?,
            TypeSlug = ?
        WHERE idType = ?
        `,
        [type.type, slug(type.type), type.id]
    );
};

Type.deleteOne = async (id) => {
    return await promisePool.execute(
        `
        DELETE FROM tb_type
        WHERE idType = ?
        `,
        [id]
    );
};

Type.getAMOT = async (id) => {
    return await promisePool.execute(
        `
        SELECT * FROM tb_type t
        INNER JOIN tb_movie m
        ON t.idType = m.idType
        WHERE t.idType = ?
        `,
        [id]
    );
};

module.exports = Type;
