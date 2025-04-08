const express = require("express");
const cors = require("cors");

// initialise express
const app = express();
app.use(cors());
app.use(express.json());
const port = 3000;

// create task

// get task by id

// list tasks

// update task

// delete task;

app.listen(port, () => console.log(`server running on port ${port}`));