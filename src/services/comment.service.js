const sequelize = require("../configs/sequelize.config");
const CommentModel = require("../models/comment.model");
const ReplyModel = require("../models/comment.reply.model");
const UserModel = require("../models/user.model");
const slug = require("slug");

const CommentService = {};

CommentService.getCmtOfMovie = async (id) => {
    try {
        const limit = 10;
        let p = 1;
        const skip = (p - 1) * limit;
        const comments = await CommentModel.findAll({
            where: {
                movie_id: id
            },
            limit,
            offset: skip,
            order: [
                ['id', 'DESC']
            ],
            attributes: ['id', 'content', 'user_id', 'movie_id', 'created_at'],
            include: [
                {
                    model: UserModel,
                    attributes: ['id', 'username', 'avatar'],
                },
                {
                    model: ReplyModel,
                    attributes: ['id', 'content', 'comment_id', 'user_id', 'created_at'],
                    include: [
                        {
                            model: UserModel,
                            attributes: ['id', 'username', 'avatar'],
                        },
                    ]
                },
            ]
        });
        const count = await CommentModel.count({ where: { movie_id: id } });
        return { status: "success", data: { comments, count } };
    } catch (error) {
        throw error;
    }
};

CommentService.newComment = async ({ content, idUser, idMovie }) => {
    try {
        await CommentModel.create({
            content,
            user_id: parseInt(idUser),
            movie_id: parseInt(idMovie)
        });
        const comments = await CommentModel.findAll({
            where: {
                movie_id: idMovie
            },
            limit: 10,
            order: [
                ['id', 'DESC']
            ],
            attributes: ['id', 'content', 'user_id', 'movie_id', 'created_at'],
            include: [
                {
                    model: UserModel,
                    attributes: ['id', 'username', 'avatar'],
                },
                {
                    model: ReplyModel,
                    attributes: ['id', 'content', 'comment_id', 'user_id', 'created_at'],
                    include: [
                        {
                            model: UserModel,
                            attributes: ['id', 'username', 'avatar'],
                        },
                    ]
                },
            ]
        });
        const count = await CommentModel.count({ where: { movie_id: idMovie } });
        return { status: "success", data: { comments, count } };
    } catch (error) {
        throw error;
    }
};

CommentService.newReply = async ({ content, idCmt, idUser }) => {
    try {
        const newReply = await ReplyModel.create({
            content,
            user_id: parseInt(idUser),
            comment_id: parseInt(idCmt)
        });
        const reply = await ReplyModel.findOne({
            where: {
                id: newReply.id
            },
            attributes: ['id', 'content', 'comment_id', 'user_id', 'created_at'],
            include: [
                {
                    model: UserModel,
                    attributes: ['id', 'username', 'avatar'],
                },
            ]
        });
        return { status: "success", data: reply };
    } catch (error) {
        throw error;
    }
};

CommentService.deleteComment = async (id) => {
    try {
        await CommentModel.destroy({ where: { id } });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

CommentService.deleteReply = async (id) => {
    try {
        await ReplyModel.destroy({ where: { id } });
        return { status: "success" };
    } catch (error) {
        throw error;
    }
};

module.exports = CommentService;
