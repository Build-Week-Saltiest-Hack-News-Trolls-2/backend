const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const authRouter = require("../auth/auth-router");
const usersRouter = require("../users/users-router");
const commentsRouter = require("../comments/comments-router");
const authMiddleware = require("../auth/auth-middleware");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/users", authMiddleware, usersRouter);
server.use("/api/comments", commentsRouter);

server.get("/", (req, res) => {
	res.status(200).json({ api: "running" });
});

module.exports = server;
