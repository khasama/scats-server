const CommentService = require("../services/comment.service");

const CommentController = {};

CommentController.getCmtOfMovie = (req, res, next) => {
    const idMovie = req.params.id;
    console.log(idMovie)
    CommentService.getCmtOfMovie(parseInt(idMovie))
        .then((rs) => {
            return res.status(200).json(rs);
        })
        .catch((err) => {
            console.log(err);
            return res
                .status(500)
                .json({ status: "error", message: "Has a fucking error" });
        });
};

CommentController.newComment = (req, res, next) => {
    const { content, idUser, idMovie } = req.body;
    if (content) {
        CommentService.newComment({ content, idUser, idMovie })
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

CommentController.newReply = (req, res, next) => {
    const { content, idCmt, idUser } = req.body;
    if (content) {
        CommentService.newReply({ content, idCmt, idUser })
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

CommentController.deleteComment = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        CommentService.deleteComment(parseInt(id))
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

CommentController.deleteReply = (req, res, next) => {
    const id = req.params.id;
    if (id) {
        CommentService.deleteReply(parseInt(id))
            .then((rs) => {
                return res.status(200).json(rs);
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(500)
                    .json({ status: "error", message: "Has a fucking error" });
            });
    } else {
        return res
            .status(400)
            .json({ status: "failed", message: "Missing params" });
    }
};

module.exports = CommentController;
