const express = require('express');
const bodyParser =  require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const actionModel = require('./data/helpers/actionModel');
const mappers = require('./data/helpers/mappers');
const projectModels =require('./data//helpers/projectModel');
const server = express();

// 
server.use(morgan('combined'));
server.use(helmet());
server.use(express.json());


// routes
server.get('/', (req, res) => {
    res.send("Welcome to the Project");
    console.log("welcome to the Project");
})

server.get('/projects', async (req, res) => {
    try{
        const response = await projectModels.get()
        res.status(201).json(response);
    } catch(err) {
        res.status(500).json({ message: "Projects cannot be retrieved"})
    }
})

server.get('/projects/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await projectModels.get(id);
        res.status(201).json(response);
        console.log(response);
    } catch(err) {
        res.status(500).json({ message: "cannot retrive project"});
    }
})

server.get('/projects/actions/:id', async (req, res) => {
    const { projectId } = req.params;
    try {
        const response = await projectModels.getProjectActions(projectId);
        res.status(201).json(response);
    } catch(ex) {
        res.status(500).json({ message: "Cannot retrieve actions"})
    }
})

server.post('/projects', async (req, res) => {
    const newProject = req.body;
    try {
        const response = await projectModels.insert(newProject);
        res.status(201).json(newProject);
    } catch(err) {
        res.status(500).json({ message: "Can not create project" });
    }
})



//
const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
})
