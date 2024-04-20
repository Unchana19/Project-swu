import { Schema, model } from "mongoose";

const commentSchema = Schema({
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

export default model("Comments", commentSchema);