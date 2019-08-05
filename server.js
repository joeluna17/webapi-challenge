const express = require('express');
const server = express();
const projectRouter = require('./project/project');


server.use(express.json());
server.use('/project', projectRouter)

server.get('/', (req, res)=>{
    res.send(`<h1>Welcome to the Sprint Challange!<h1>`)
})

module.exports = server;

