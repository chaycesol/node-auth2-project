const express = require('express');

const server = express();
const helmet = require('helmet')
const cors = require('cors');

//Router Declaration
const authRouter = require('../auth/auth-router');
const usersRouter = require('../users/users-router');

//Third-Party Middleware
server.use(helmet());
server.use(cors());

// Node Middleware
server.use(express.json());


//Custom Middleware
server.use(logger());

// Base Endpoint
server.get('/', (req, res) =>{
    res.status(200).json({ message: "Node Auth 2 Project up and running"})
})

//Routes
server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);


//Custom Middleware
function logger(req, res, next) {
    return function (req, res, next) {
      console.log(`a ${req.method} request was made to ${req.url} at ${new Date()}`);
      next();
    }
  }

  module.exports = server;