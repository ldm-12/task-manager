# Task Manager App

## Overview

This is a full-stack task management application. The app allows the user to create, view, update, and delete tasks. The backend API provides the necessary functionality to handle tasks, while the frontend application offers a user-friendly interface to interact with the system.

### [Backend API](./backend/README.md)

The backend API supports the following operations for managing tasks:

- **Create a task** with:
  - Title
  - Description (optional)
  - Status
  - Due date/time
- **Retrieve a task** by ID
- **Retrieve all tasks**
- **Update the status** of a task
- **Delete a task**

The backend is built using Express, validated with Joi, and uses Sequelize to interact with a PostgreSQL database.

### [Frontend Application](./frontend/README.md)

The frontend allows the user to:

- Create, view, update, and delete tasks
- View and sort tasks in a responsive UI

---

## Features

- Full task management system (Create, Read, Update, Delete)
- Task validation and error handling on both the backend and frontend
- Responsive UI for efficient task management
- Unit tests for the backend API (Mocha & Chai)
- Persistent data storage with PostgreSQL

---

## Developer quickstart
You will need to have Node.js and Postgres installed to run this application.

### 1. Clone the repository
```bash
git clone https://github.com/ldm-12/task-manager.git
cd task-manager
```

### 2. Start the server
Navigate to the backend folder and install the necessary dependencies:
```bash
cd backend
npm install
npm start
```

The backend server will be available at http://localhost:3000 .

### 3. Run the frontend
Navigate to the frontend folder and install the necessary dependencies:
```bash
cd frontend
npm install
npm run dev
```

The frontend app will be available at http://localhost:5173.