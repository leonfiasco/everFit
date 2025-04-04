require("dotenv").config({ path: "./config.env" });

import express from "express";
import http from "http";
import morgan from "morgan";
import bodyParser from "body-parser";
import compression from "compression";
import cors from "cors";
import router from "./routes/chat";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";

const app = express();

connectDB();

app.use(compression());
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());

app.use("/api", router);

const server = http.createServer(app);

server.listen(2402, () => {
  console.log(`Server running on port: 2402`);
});

export default app;
