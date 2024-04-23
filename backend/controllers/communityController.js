const Commnunities = require("../models/Communities");

exports.create = async (req, res) => {
    console.time("\x1b[33mcreate\x1b[0m");
    const { author, content } = req.body;

    switch (true) {
        case !content:
            console.timeEnd("\x1b[33mcreate\x1b[0m");
            return res.status(400).json({ error: "invalid content" });
    }

    try {
        const community = await Commnunities.create({ author, content });
        console.timeEnd("\x1b[33mcreate\x1b[0m");
        res.json(community);
    } catch (err) {
        console.timeEnd("\x1b[33mcreate\x1b[0m");
        res.status(400).json({ error: err.message });
    }
}

exports.getAllPosts = (req, res) => {
    console.time("\x1b[33mgetAllPosts\x1b[0m");
    Commnunities.find({}).sort({ createdAt: -1 }).exec()
        .then(posts => {
            console.timeEnd("\x1b[33mgetAllPosts\x1b[0m");
            res.json(posts);
        }).catch(err => {
            console.timeEnd("\x1b[33mgetAllPosts\x1b[0m");
            res.status(500).json({ error: "Internal Server Error" });
        });
}

exports.removePost = (req, res) => {
    console.time("\x1b[33mremovePost\x1b[0m");
    const { postId } = req.params;
    Commnunities.findOneAndDelete({ _id: postId })
        .then(post => {
            console.timeEnd("\x1b[33mremovePost\x1b[0m");
            res.json({ message: "ลบโพสต์สำเร็จ" });
        }).catch(err => {
            console.timeEnd("\x1b[33mremovePost\x1b[0m");
            res.status(500).json({ error: "Internal Server Error" });
        });
}

exports.updatePost = (req, res) => {
    console.time("\x1b[33mupdatePost\x1b[0m");
    const { postId } = req.params;
    const { author, content } = req.body;
    Commnunities.findOneAndUpdate({ _id: postId }, { author, content }, { new: true }).exec()
        .then(post => {
            console.timeEnd("\x1b[33mupdatePost\x1b[0m");
            res.json({ message: "อัพเดตโพสต์สำเร็จ" });
        }).catch(err => {
            console.timeEnd("\x1b[33mupdatePost\x1b[0m");
            res.status(500).json({ error: "Internal Server Error" });
        })
}
