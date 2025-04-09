const express = require("express");
const cors = require("cors");
const {
    validateCreateRequest,
    validateId,
    validateStatus
} = require('./validation');

// initialise express
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

// temp in-memory database
let tasks = [];
let current_id = 1;

// create task
app.post('/', (req, res) => {
    const payload = validateCreateRequest(req, res);
    if (!payload) return;

    const new_task = {
        ...payload,
        id: current_id++
    };

    tasks.push(new_task);
    res.status(201).json(new_task);
});

// get task by id
app.get('/tasks/:id', (req, res) => {
    const id = validateId(req, res);
    if (!id) return;

    const task = tasks.find(t => t.id === id);

    if (!task) {
        res.status(404).json({ message: `cannot find task with id ${id}`});
    };

    res.json(task);
});

// list tasks
app.get('/tasks', (req, res) => res.json(tasks));

// update task status
app.put('/tasks/:id', (req, res) => {
    const id = validateId(req, res);
    if (!id) return;   

    const status = validateStatus(req, res);
    if (!status) return;
    
    const task = tasks.find(t => t.id === id);

    if (!task) {
        res.status(404).json({ error: `cannot find task with id ${id}`});
    };

    task.status = status;
    res.json(task);

});

// delete task;
app.delete('/tasks/:id', (req, res) => {
    const id = validateId(req, res);
    if (!id) return;

    const index = tasks.findIndex(task => task.id === id);
    
    if (index === -1) {
        res.status(404).json({ error: `cannot find task with id ${id}`});
    };

    const deleted_task = tasks.splice(index, 1);
    res.json(deleted_task);

});

app.listen(port, () => console.log(`server running on port ${port}`));