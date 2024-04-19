const mongoose = require("mongoose");

const communitySchema = mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model("Commnuities", communitySchema);