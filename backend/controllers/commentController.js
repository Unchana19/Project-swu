const Comments = require("../models/Comments");

exports.comment = async (req, res) => {
    console.time("\x1b[33mcomment\x1b[0m");
    const { postId, author, content } = req.body;

    if (!content) {
        console.timeEnd("\x1b[33mcomment\x1b[0m");
        return res.status(400).json({ error: "invalid content" });
    }

    try {
        const comment = await Comments.create({ postId, author, content });
        console.timeEnd("\x1b[33mcomment\x1b[0m");
        res.json(comment);
    } catch (err) {
        console.timeEnd("\x1b[33mcomment\x1b[0m");
        res.status(400).json({ error: err.message });
    }
}

exports.getAllComment = async (req, res) => {
    const { postId } = req.body;

    try {
        const comments = await Comments.find({ postId: postId }).sort({ createdAt: -1 }).exec();
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.removeComment = async (req, res) => {
    console.time("\x1b[33mremoveComment\x1b[0m");
    const { commentId } = req.params;

    try {
        const comment = await Comments.findOneAndDelete({ _id: commentId });
        console.timeEnd("\x1b[33mremoveComment\x1b[0m");
        res.json({ message: "ลบความคิดเห็นสำเร็จ" });
    } catch (err) {
        console.timeEnd("\x1b[33mremoveComment\x1b[0m");
        res.status(500).json({ error: "Internal Server Error" });
    }
}

exports.removeCommentInPost = async (req, res) => {
    console.time("\x1b[33mremoveCommentInPost\x1b[0m");
    const { postId } = req.params;

    try {
        await Comments.deleteMany({ postId: postId });
        console.timeEnd("\x1b[33mremoveCommentInPost\x1b[0m");
        res.json({ message: "ลบความคิดเห็นสำเร็จ" });
    } catch (err) {
        console.timeEnd("\x1b[33mremoveCommentInPost\x1b[0m");
    }
}

exports.updateComment = async (req, res) => {
    console.time("\x1b[33mupdateComment\x1b[0m");
    const { commentId } = req.params;
    const { postId, author, content } = req.body;

    Comments.findOneAndUpdate({ _id: commentId }, { postId, author, content }, { new: true }).exec()
        .then(comment => {
            console.timeEnd("\x1b[33mupdatePost\x1b[0m");
            res.json({ message: "อัพเดตความคิดเห็นสำเร็จ" });
        }).catch(err => {
            console.timeEnd("\x1b[33mupdatePost\x1b[0m");
            res.status(500).json({ error: "Internal Server Error" });
        });
}
