import { create, find, findOneAndDelete, deleteMany, findOneAndUpdate } from "../models/comment";

export async function comment(req, res) {
    const {postId, author, content} = req.body;

    switch(true) {
        case !content:
            return res.status(400).json({error: "invalid content"});
    }
    try {
        const comment = await create({postId, author, content});
        res.json(comment);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

export async function getAllComment(req, res) {
    const {postId} = req.body;

    find({postId: postId}).sort({ createdAt: -1 }).exec()
    .then(comments => {
        res.json(comments);
    }).catch(err => {
        res.status(500).json({error: "Internal Server Error"});
    });
}

export async function removeComment(req, res) {
    const {commentId} = req.params;
    findOneAndDelete({ _id: commentId})
    .then(comment => {
        res.json({message: "ลบสำเร็จ"});
    }).catch(err => {
        res.status(500).josn({error: "Internal Server Error"});
    });
}

export async function removeCommentInPost(req, res) {
    const {postId} = req.params;
    deleteMany({ postId: postId })
    .then(comments => {
        res.json({message: "ลบคอมเมนต์สำเร็จ"});
    }).catch(err => {
        res.status(500).json({error: "Internal Server"});
    })
}

export async function updateComment(req, res) {
    const {commentId} = req.params;
    const {postId, author, content} = req.body;
    findOneAndUpdate({_id: commentId}, {postId, author, content}, {new: true}).exec()
    .then(comment => {
        res.json({message: "อัพเดทคอมเมนต์สำเร็จ"});
    }).catch(err => {
        res.status(500).json({error: "Internal Server Error"});
    });
}