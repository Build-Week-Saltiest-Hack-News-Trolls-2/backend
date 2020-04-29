const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

// const protectMe = require('./auth/auth-middle.js'); <--not working
const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./users/users-router.js');
const commentsRouter = require('./comments/comments-router.js');

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);
server.use('/api/comments', commentsRouter);

server.get('/', (req, res) => {
    const newThing = ({ thing: 'a thing', yep: 'sure nuf' })
    res.status(200).json(newThing)
})

module.exports = server;