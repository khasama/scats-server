const promisePool = require("../configs/db.config");
const slug = require("slug");

function Status(status) {
    this.status = status.status;
    this.slug = slug(status.status);
}

Status.getAll = async () => {
    return await promisePool.execute(`SELECT * FROM tb_status`);
};

Status.getInformation = async (id) => {
    return await promisePool.execute(
        `SELECT * FROM tb_status WHERE idStatus = ?`,
        [id]
    );
};

Status.createOne = async (status) => {
    return await promisePool.execute(
        `
        INSERT INTO tb_status
        VALUES (NULL, ?, ?)
        `,
        [status.status, status.slug]
    );
};

Status.updateOne = async (status) => {
    return await promisePool.execute(
        `
        UPDATE tb_status
        SET Status = ?,
            StatusSlug = ?
        WHERE idStatus = ?
        `,
        [status.status, slug(status.status), status.id]
    );
};

Status.deleteOne = async (id) => {
    return await promisePool.execute(
        `
        DELETE FROM tb_status
        WHERE idStatus = ?
        `,
        [id]
    );
};

Status.getAMOT = async (id) => {
    return await promisePool.execute(
        `
        SELECT * FROM tb_status s
        INNER JOIN tb_movie m
        ON s.idStatus = m.idStatus
        WHERE s.idStatus = ?
        `,
        [id]
    );
};

module.exports = Status;
