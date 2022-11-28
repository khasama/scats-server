const sequelize = require("../configs/sequelize.config");
const CommentModel = require("../models/comment.model");
const ReplyModel = require("../models/comment.reply.model");
const UserModel = require("../models/user.model");
const slug = require("slug");

const CommentService = {};

CommentService.getCmtOfMovie = async (id) => {
    try {
        const limit = 20;
        let p = 1;
        const skip = (p - 1) * limit;
        // const [comments] = await sequelize.query(
        //     `
        //         SELECT 
        //             cmt.id, cmt.content, cmt.user_id, cmt.movie_id, cmt.created_at,
        //             u.id, u.username, u.avatar
        //         FROM tb_comment cmt
        //         INNER JOIN tb_user u
        //         ON cmt.user_id = u.id
        //         WHERE movie_id = :idMovie;
        //     `,
        //     {
        //         replacements: { idMovie: id },
        //     }
        // );
        const comments = await CommentModel.findAll({
            // where: {
            //     movie_id: id
            // },
            // limit,
            // offset: skip,
            // attributes: ['id', 'content', 'user_id', 'movie_id', 'created_at'],
            // include: [
            //     {
            //         model: UserModel,
            //         attributes: ['id', 'username', 'avatar'],
            //     },
            //     {
            //         model: ReplyModel,
            //         attributes: ['id', 'content', 'comment_id', 'user_id', 'created_at'],
            //         include: [
            //             {
            //                 model: UserModel,
            //                 attributes: ['id', 'username', 'avatar'],
            //             },
            //         ]
            //     },
            // ]
        });
        return { status: "success", data: { comments, count: JSON.parse(JSON.stringify(comments)).length } };
    } catch (error) {
        throw error;
    }
};

CommentService.newComment = async ({ content, idUser, idMovie }) => {
    try {
        const newComment = await CommentModel.create({
            content,
            user_id: parseInt(idUser),
            movie_id: parseInt(idMovie)
        });
        return { status: "success", data: newComment };
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
        return { status: "success", data: newReply };
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
