const promisePool = require("../configs/db.config");

let time = `${new Date()
    .toISOString()
    .slice(0, 10)}  ${new Date().toLocaleTimeString("en-US", {
        hour12: false,
    })}`;

function User(user) {
    this.email = user.email;
    this.username = user.username;
    this.password = user.password;
    this.avatar = "unknow.jpg";
    this.role = 3;
    this.lastaccess = time;
}

User.register = async (user) => {
    return await promisePool.execute(
        `
        INSERT INTO tb_user
        VALUES (NULL, ?, ?, ?, ?, ?, ?)
        `,
        [
            user.email,
            user.username,
            user.password,
            user.avatar,
            user.lastaccess,
            user.role,
        ]
    );
};

// check Email and Username
User.checkEU = async (username) => {
    return await promisePool.execute(
        `
        SELECT * FROM tb_user
        WHERE Email = ? OR Username = ?
        LIMIT 0, 1
        `,
        [username, username]
    );
};

// update last access
User.updateLastAccess = async (idUser) => {
    return await promisePool.execute(
        `
        UPDATE tb_user
        SET LastAccess = ?
        WHERE idUser = ?
        `,
        [time, idUser]
    );
};

User.getAll = async () => {
    return await promisePool.execute(
        `
        SELECT idUser, Email, Username, LastAccess, Role FROM tb_user u
        INNER JOIN tb_role r
        ON u.idRole = r.idRole
        `
    );
};

User.getUser = async (idUser) => {
    return await promisePool.execute(
        `
        SELECT idUser, Email, Username, LastAccess, Role FROM tb_user u
        INNER JOIN tb_role r
        ON u.idRole = r.idRole
        WHERE u.idUser = ?
        `,
        [idUser]
    );
};

User.changeRole = async (user) => {
    return await promisePool.execute(
        `
        UPDATE tb_user
        SET idRole = ?
        WHERE idUser = ?
        `,
        [user.idRole, user.idUser]
    );
};

module.exports = User;
