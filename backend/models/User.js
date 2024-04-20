import { Schema, model } from "mongoose";
import { hash as _hash } from "bcrypt";

const userSchema = Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        default: "user",
    }
}, {timestamps: true});

userSchema.pre("save", function(next) {
    const user = this

    _hash(user.password, 10).then(hash => {
        user.password = hash
        next()
    }).catch(err => {
        console.error(err);
    })
});

export default model("Users", userSchema);