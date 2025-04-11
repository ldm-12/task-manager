const express = require("express");
const cors = require("cors");

const {
    validateCreateRequest,
    validateId,
    validateStatus
} = require('./validation');

const sequelize = require('./database/sequelize')
const Task = require('./database/models/task')

// initialise express
const app = express();
app.use(cors());
app.use(express.json());

// sync database
sequelize.sync()
    .then(() => {
        console.log('database synced successfully');
    })
    .catch((error) => {
        console.error('error syncing database:', error);
    });


// create task
app.post('/tasks', async (req, res) => {
    const payload = validateCreateRequest(req, res);
    if (!payload) return;

    try {
        const new_task = await Task.create(payload);
        res.status(201).json(new_task);
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

// get task by id
app.get('/tasks/:id', async (req, res) => {
    const id = validateId(req, res);
    if (!id) return;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: `cannot find task with id ${id}` });
        };
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

// list tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.findAll();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// update task status
app.put('/tasks/:id', async (req, res) => {
    const id = validateId(req, res);
    if (!id) return;

    const status = validateStatus(req, res);
    if (!status) return;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: `cannot find task with id ${id}` });
        };

        task.status = status;
        await task.save()
        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({ message: error.message });
    };

});

// delete task;
app.delete('/tasks/:id', async (req, res) => {
    const id = validateId(req, res);
    if (!id) return;

    try {
        const task = await Task.findByPk(id);
        if (!task) {
            return res.status(404).json({ message: `cannot find task with id ${id}` });
        };

        await task.destroy();
        res.status(204).end();
    } catch (error) {
        res.status(500).json({ message: error.message });
    };
});

module.exports = app;