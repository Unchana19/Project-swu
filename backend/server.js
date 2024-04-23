const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const authRoute = require("./routes/auth");
const communityRoute = require("./routes/community");
const commentRouter = require("./routes/comment");

const app = express();

mongoose.connect(process.env.DB_CON, {
}).then(() => console.log("connect successful"))
.catch((err) => console.log(err));

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api", authRoute);
app.use("/api", communityRoute);
app.use("/api", commentRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`start server in port ${port}`));

module.exports = app;