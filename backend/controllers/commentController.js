const Comments = require("../models/comment");

exports.comment = async (req, res) => {
    const {postId, author, content} = req.body;

    switch(true) {
        case !content:
            return res.status(400).json({error: "invalid content"});
    }
    try {
        const comment = await Comments.create({postId, author, content});
        res.json(comment);
    } catch (err) {
        res.status(400).json({error: err.message});
    }
}

exports.getAllComment = async (req, res) => {
    const {postId} = req.body;

    Comments.find({postId: postId}).exec()
    .then(comments => {
        res.json(comments);
    }).catch(err => {
        res.status(500).json({error: "Internal Server Error"});
    });
}

exports.removeComment = async (req, res) => {
    const {commentId} = req.body;
    Comments.findOneAndDelete({commentId})
    .then(comment => {
        res.json({message: "Delete Success"});
    }).catch(err => {
        res.status(500).josn({error: "Internal Server Error"});
    });
}