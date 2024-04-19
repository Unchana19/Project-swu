const Commnunities = require("../models/community");

exports.create = async (req, res) => {
    const { author, content } = req.body;

    switch (true) {
        case !content:
            return res.status(400).json({ error: "invalid content" });
    }

    try {
        const community = await Commnunities.create({author, content});
        res.json(community);
    } catch (err) {
        res.status(400).json({error: err.massage});
    }
}