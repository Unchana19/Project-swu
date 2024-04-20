const express = require("express");
const router = express.Router();
const { create, getAllPosts, removePost, updatePost } = require("../controllers/communityController");
const { requireLogin } = require("../controllers/authController");

router.get("/posts", getAllPosts);
router.post("/create", requireLogin, create);
router.delete("/post/:postId", requireLogin, removePost);
router.put("/post/:postId", requireLogin, updatePost);

module.exports = router;