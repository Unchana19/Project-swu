const express = require("express");
const router = express.Router();
const { comment, getAllComment, removeComment } = require("../controllers/commentController");
const { requireLogin } = require("../controllers/authController");

router.post("/comments", getAllComment);
router.post("/comment", requireLogin, comment);
router.delete("/delete-comment", requireLogin, removeComment);

module.exports = router