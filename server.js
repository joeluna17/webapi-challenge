const express = require('express');
const server = express();
const projectRouter = require('./project/project');
const actionsRouter = require('./actions/actions');


server.use(express.json());
server.use('/project', projectRouter)
server.use('/actions', actionsRouter)


server.get('/', (req, res)=>{
    res.send(`<h1>Welcome to the Sprint Challange!<h1>`)
})

module.exports = server;

