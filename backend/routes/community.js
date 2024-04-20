const express = require("express");
const router = express.Router();
const { create, getAllPosts, removePost } = require("../controllers/communityController");
const { requireLogin } = require("../controllers/authController");

router.get("/posts", getAllPosts);
router.post("/create", requireLogin, create);
router.delete("/post/:postId", requireLogin, removePost);

module.exports = router;