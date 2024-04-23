const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const expressJwt = require('express-jwt');

exports.createAccount = async (req, res) => {
    console.time("\x1b[33mcreateAccount\x1b[0m");
    const { username, email, password } = req.body;
    const role = "user";

    switch (true) {
        case !email:
            console.timeEnd("\x1b[33mcreateAccount\x1b[0m");
            return res.status(400).json({ error: "invalid email" });
        case !password:
            console.timeEnd("\x1b[33mcreateAccount\x1b[0m");
            return res.status(400).json({ error: "invalid password" });
    }

    try {
        const user = await Users.create({ username, email, password, role });
        console.timeEnd("\x1b[33mcreateAccount\x1b[0m");
        res.json(user);
    } catch (err) {
        console.timeEnd("\x1b[33mcreateAccount\x1b[0m");
        if (err.code === 11000) {
            res.status(400).json({ error: "อีเมลล์นี้ถูกใช้งานไปแล้ว" });
        } else {
            res.status(400).json({ error: err.message });
        }
    }
}

exports.login = async (req, res) => {
    console.time("\x1b[33mlogin\x1b[0m");
    const { email, password } = req.body;

    if (!email || !password) {
        console.timeEnd("\x1b[33mlogin\x1b[0m");
        return res.status(400).json({ error: "Email and password are required" });
    }

    Users.findOne({ email }).exec()
        .then((user) => {
            if (!user) {
                console.timeEnd("\x1b[33mlogin\x1b[0m");
                return res.status(404).json({ error: "User not found" });
            }
            const username = user.username;

            bcrypt.compare(password, user.password).then((match) => {
                if (match) {
                    const token = jwt.sign({ username },
                        process.env.JWT_SECRET, { expiresIn: "1d" })
                    console.timeEnd("\x1b[33mlogin\x1b[0m");
                    return res.json({ token, username });
                } else {
                    console.timeEnd("\x1b[33mlogin\x1b[0m"); 
                    return res.status(401).json({ error: "Incorrect password" });
                }
            }).catch((error) => {
                console.timeEnd("\x1b[33mlogin\x1b[0m"); 
                return res.status(500).json({ error: "Internal server error" });
            });
        }).catch((error) => {
            console.timeEnd("\x1b[33mlogin\x1b[0m"); 
            return res.status(500).json({ error: "Internal server error" });
        });
}


exports.requireLogin = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",}
);