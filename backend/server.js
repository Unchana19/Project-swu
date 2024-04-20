import express, { json } from "express";
import morgan from "morgan";
import cors from "cors";
import { connect } from "mongoose";
require("dotenv").config();

import authRoute from "./routes/auth";
import communityRoute from "./routes/community";
import commentRouter from "./routes/comment";

const app = express();

connect(process.env.DB_CON, {
    useNewUrlParser: true,
    useUnifiedTopology: false,
}).then(() => console.log("connect successful"))
.catch((err) => console.log(err));

app.use(json());
app.use(cors());
app.use(morgan("dev"));

app.use("/api", authRoute);
app.use("/api", communityRoute);
app.use("/api", commentRouter);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`start server in port ${port}`));