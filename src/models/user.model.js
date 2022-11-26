const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");
const Role = require("./role.model");

const User = sequelize.define(
    'User',
    {
        email: {
            type: Sequelize.STRING,
        },
        username: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        },
        avatar: {
            type: Sequelize.STRING,
            defaultValue: "https://drive.google.com/uc?id=1medVHZnNZJj8A_XHEqsPx8cl6dT1MRnu"
        },
        role_id: {
            type: Sequelize.INTEGER,
            defaultValue: 3
        },
        refresh_token: {
            type: Sequelize.STRING(500),
        },
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'tb_user'
    }
);
User.belongsTo(Role, {
    foreignKey: {
        name: 'role_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});
module.exports = User;