const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");
const User = require('./user.model');

const Room = sequelize.define(
    'Room',
    {
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        slug: {
            type: Sequelize.STRING,
            allowNull: false
        },
        master: {
            type: Sequelize.INTEGER,
        },
        pass: {
            type: Sequelize.STRING,
        },
        private: {
            type: Sequelize.BOOLEAN,
        },
        live: {
            type: Sequelize.BOOLEAN,
        },
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'tb_room'
    }
);

Room.belongsTo(User, {
    foreignKey: {
        name: 'master'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT'
});

module.exports = Room;