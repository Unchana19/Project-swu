const express = require("express");
const router = express.Router();
const { create, getAllPosts } = require("../controllers/communityController");
const { requireLogin } = require("../controllers/authController");

router.post("/create", requireLogin, create);
router.get("/posts", getAllPosts);

module.exports = router;