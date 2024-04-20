const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    postId: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    }
}, {timestamps: true});

module.exports = mongoose.model("Comments", commentSchema);