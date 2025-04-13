# Backend

This is the backend for a simple task-tracking API that allows users to create, read, update, and delete tasks. It’s built using **Express**, with **PostgreSQL** as the database and **Sequelize** as the ORM. Validation is handled using **Joi**, and tests are written using **Mocha** and **Chai**.

---

## Tech Stack

- **Express** - Web framework
- **PostgreSQL** - Database
- **Sequelize** - ORM for interacting with the database
- **Joi** - Input validation
- **Mocha + Chai** - Testing framework

---

## Installation

1. **Clone the repo:**

```bash
git clone https://github.com/ldm-12/task-manager.git
cd task-manager/backend
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up Postgres locally**

You will need to set up Postgres locally and create a database called `task_manager`. You will then need to change the user and password fields accordingly in `./database/sequelize.js`

4. **Start the server**
```bash
npm start
```

## Testing
To run the tests in the `./tests` folder you will need a database called `task_manager_test`. Run the tests with the command 
```bash
npm test
```

## API Endpoints

| Method | Endpoint       | Description                   | Request Body                                                                 | Success Response | Error Responses                             |
|--------|----------------|-------------------------------|------------------------------------------------------------------------------|------------------|---------------------------------------------|
| POST   | `/tasks`       | Create a new task             | `{ "title": string, "description"?: string, "status": string, "due_date": string }` | `201 Created`<br>Returns created task     | `400 Bad Request` – Validation error         |
| GET    | `/tasks`       | Get all tasks                 | N/A                                                                          | `200 OK`<br>Returns array of tasks       | `500 Internal Server Error`                 |
| GET    | `/tasks/:id`   | Get a task by ID              | N/A                                                                          | `200 OK`<br>Returns task by ID           | `400 Bad Request` – Invalid ID<br>`404 Not Found` – Task not found |
| PUT    | `/tasks/:id`   | Update status of a task       | `{ "status": string }`                                                      | `200 OK`<br>Returns updated task         | `400 Bad Request` – Invalid ID or status<br>`404 Not Found` – Task not found |
| DELETE | `/tasks/:id`   | Delete a task by ID           | N/A                                                                          | `204 No Content`                         | `400 Bad Request` – Invalid ID<br>`404 Not Found` – Task not found |

### Notes

- **Status values** must be one of:
  - `"Not started"`
  - `"In progress"`
  - `"Completed"`
  - `"Blocked"`
- **Date format** for `due_date` should be a valid ISO 8601 string (e.g., `"2025-04-15"`).

