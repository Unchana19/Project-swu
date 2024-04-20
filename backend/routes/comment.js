import { Router } from "express";
const router = Router();
import { comment, getAllComment, removeComment, removeCommentInPost, updateComment } from "../controllers/commentController";
import { requireLogin } from "../controllers/authController";

router.post("/comments", getAllComment);
router.post("/comment", requireLogin, comment);
router.delete("/comment/:commentId", requireLogin, removeComment);
router.delete("/commentInPost/:postId", requireLogin, removeCommentInPost);
router.put("/comment/:commentId", requireLogin, updateComment);

export default router