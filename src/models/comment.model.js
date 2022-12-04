const Sequelize = require("sequelize");
const sequelize = require("../configs/sequelize.config");
// const Movie = require("./movie.model");
// const User = require("./user.model");
// const Reply = require("./comment.reply.model");

const Comment = sequelize.define(
    'Comment',
    {
        content: {
            type: Sequelize.STRING(9999),
            allowNull: false
        },
        user_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        movie_id: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    },
    {
        timestamps: true,
        paranoid: true,
        underscored: true,
        tableName: 'tb_comment'
    }
);

module.exports = Comment;