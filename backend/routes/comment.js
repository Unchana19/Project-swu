const express = require("express");
const router = express.Router();
const { comment, getAllComment, removeComment, removeCommentInPost } = require("../controllers/commentController");
const { requireLogin } = require("../controllers/authController");

router.post("/comments", getAllComment);
router.post("/comment", requireLogin, comment);
router.delete("/comment/:commentId", requireLogin, removeComment);
router.delete("/commentInPost/:postId", requireLogin, removeCommentInPost);

module.exports = router