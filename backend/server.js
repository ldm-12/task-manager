const express = require("express");
const cors = require("cors");

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
    const { title, description, status, due_date } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'cannot create task without title'});
    };

    if (!status) {
        return res.status(400).json({ error: 'cannot create task without status'});
    };

    if (!due_date) {
        return res.status(400).json({ error: 'cannot create task without due date'});
    };

    const new_task = {
        title,
        description: description || "",
        status,
        due_date,
        id: current_id++
    };

    tasks.push(new_task);
    res.status(201).json(new_task);
})

// get task by id
app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;

    const task = tasks.find(t => t.id === parseInt(id));

    if (!task) {
        res.status(404).json({ error: `cannot find task with id ${id}`});
    };

    res.json(task);
});

// list tasks
app.get('/tasks', (req, res) => res.json(tasks))

// update task status
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    
    const task = tasks.find(t => t.id === parseInt(id));

    if (!task) {
        res.status(404).json({ error: `cannot find task with id ${id}`});
    };

    task.status = status;
    res.json(task);

})

// delete task;
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;

    const index = tasks.findIndex(task => task.id === parseInt(id));
    
    if (index === -1) {
        res.status(404).json({ error: `cannot find task with id ${id}`});
    };

    const deleted_task = tasks.splice(index, 1);
    res.json(deleted_task);

})

app.listen(port, () => console.log(`server running on port ${port}`));