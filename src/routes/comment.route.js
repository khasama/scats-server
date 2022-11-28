const express = require("express");
const router = express.Router();
const CommentController = require("../controllers/comment.controller");
const { verifyUser } = require('../middlewares');

router.get("/:id", CommentController.getCmtOfMovie);
router.post("/reply", verifyUser(), CommentController.newReply);
router.delete("/reply/:id", verifyUser(), CommentController.deleteReply);
router.post("/", verifyUser(), CommentController.newComment);
router.delete("/:id", verifyUser(), CommentController.deleteComment);

module.exports = router;
