const express = require("express");
const router = express.Router();
const { comment, getAllComment, removeComment, removeCommentInPost, updateComment } = require("../controllers/commentController");
const { requireLogin } = require("../controllers/authController");

router.post("/comments", getAllComment);
// router.post("/comment", requireLogin, comment);
// router.delete("/comment/:commentId", requireLogin, removeComment);
// router.delete("/commentInPost/:postId", requireLogin, removeCommentInPost);
// router.put("/comment/:commentId", requireLogin, updateComment);

//for test
router.post("/comment", comment);
router.delete("/comment/:commentId", removeComment);
router.delete("/commentInPost/:postId", removeCommentInPost);
router.put("/comment/:commentId", updateComment);

module.exports = router