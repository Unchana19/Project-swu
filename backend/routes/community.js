import { Router } from "express";
const router = Router();
import { create, getAllPosts, removePost, updatePost } from "../controllers/communityController";
import { requireLogin } from "../controllers/authController";

router.get("/posts", getAllPosts);
router.post("/create", requireLogin, create);
router.delete("/post/:postId", requireLogin, removePost);
router.put("/post/:postId", requireLogin, updatePost);

export default router;