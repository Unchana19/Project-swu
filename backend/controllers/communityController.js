import { create, find, findOneAndDelete, findOneAndUpdate } from "../models/community";

export async function create(req, res) {
    const { author, content } = req.body;

    switch (true) {
        case !content:
            return res.status(400).json({ error: "invalid content" });
    }

    try {
        const community = await create({author, content});
        res.json(community);
    } catch (err) {
        res.status(400).json({error: err.massage});
    }
}

export function getAllPosts(req, res) {
    find({}).sort({ createdAt: -1 }).exec()
    .then(posts => {
        res.json(posts);
    }).catch(err => {
        res.status(500).json({error: "Internal Server Error"});
    });
}

export function removePost(req, res) {
    const {postId} = req.params;
    findOneAndDelete({ _id: postId })
    .then(post => {
        res.json({message: "ลบโพสต์สำเร็จ"});
    }).catch(err => {
        res.status(500).json({error: "Internal Server Error"});
    });
}

export function updatePost(req, res) {
    const {postId} = req.params;
    const {author, content} = req.body;
    findOneAndUpdate({_id: postId}, {author, content}, {new: true}).exec()
    .then(post => {
        res.json({message: "อัพเดตโพสต์สำเร็จ"});
    }).catch(err => {
        res.status(500).json({error: "Internal Server Error"});
    })
}