const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");
const Comment = require("./comment.model");
const User = require("./user.model");
const Movie = require("./movie.model");

const Reply = sequelize.define(
    'Reply',
    {
        content: {
            type: Sequelize.STRING(9999),
            allowNull: false
        },
        comment_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'tb_cmt_reply'
    }
);

module.exports = Reply;