const express = require('express');
const bodyParser =  require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const actionModel = require('./data/helpers/actionModel');
const mappers = require('./data/helpers/mappers');
const projectModels =require('./data//helpers/projectModel');
const server = express();
const cors = require('cors');

// 
server.use(morgan('combined'));
server.use(helmet());
server.use(express.json());


// routes(projects)
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

server.put('/projects/:id', async (req, res) => {
    const { id } = req.params;
    const project = req.body;
    try {
        const response = await projectModels.update(id, project);
        res.status(201).json(response);
    } catch(ex) {
        res.status(500).json({ message: "Cannot update Project" });
    }
})

server.delete('/projects/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response =  await projectModels.remove(id);
        res.status(201).json(response);
    } catch(err) {
        res.status(500).json({ message: "Cannot delete project"});
    }
})

// routes(actions)

server.get('/actions', async (req, res) => {
    try {
        const response = await actionModel.get();
        res.status(200).json(response);
    } catch(err) {
        res.status(500).json({ message: "cannot retrieve actions"})
    }
})

server.post('/actions', async (req, res) => {
    const action = req.body;
    try {
        const response = await actionModel.insert(action);
        res.status(201).json(response);
    } catch(err) {
        res.status(500).json({ message: "Cannot create Action"});
    }
})

server.put('/actions/:id', async (req, res) => {
    const { id } = req.params;
    const newAction = req.body;
    try {
        const response = await actionModel.update(id, newAction);
        res.status(200).json(response);
    } catch(err) {
        res.status(500).json({ message: "cannot update action"});
    }
 })

 server.delete('/actions/:id', async (req, res) => {
     const { id } = req.params;
     try {
         const response = await actionModel.remove(id);
         res.status(200).json(response);
     } catch(err) {
         res.status(500).json({ message: "cannot remove action"});
     }
 })

//
const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Server is listening on PORT: ${PORT}`);
})
