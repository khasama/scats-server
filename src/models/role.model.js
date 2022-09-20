const promisePool = require("../configs/db.config");

function Role(role) {
    this.role = role.role;
}

Role.getAll = async () => {
    return await promisePool.execute(`SELECT * FROM tb_role`);
};

module.exports = Role;
