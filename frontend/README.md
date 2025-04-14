## Frontend

This is a single-page TypeScript application built with React, using Vite for fast development and build times. The UI is styled with the Mantine UI library.

The frontend provides a user interface for interacting with the [backend API](../backend/README.md), allowing users to manage tasks via the following features:

---

###  Features

| Feature            | Description                                                                 |
|--------------------|-----------------------------------------------------------------------------|
| View Tasks         | Fetches and displays a list of all tasks from the backend. Click on a task in the list to expand and view its description. |
| Create Task        | Form to add a new task with a title, optional description, status, and due date. |
| Update Task Status | Dropdown to update the status of a task (`Not started`, `In progress`, `Completed`, `Blocked`). |
| Delete Task        | Allows deleting a task from the task list.                                  |

---

### Stack
- **React**: Core frontend framework
- **Vite**: Fast development/build tooling
- **Mantine**: UI components and styling
- **TypeScript**: Type safety and better DX
- **Axios**: API requests to the backend

---

### Folder structure
- The `src/components` contains the React components I have made.
- The file `src/api.js` in the root folder handles all requests to the API endpoints set up in the backend using Axios.
- There are some custom classes I've added to `src/index.css` for some simple styling of the webpage, specifically the `delete-task-button`, `delete-task-icon` and `task-description` classes.

### Running the Frontend
For any tasks to display you will need to make sure the backend is running first.

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```
