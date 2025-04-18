import { useEffect, useState } from "react";
import "./App.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import { MantineProvider, Title } from "@mantine/core";
import TaskList from "./components/TaskList";
import CreateTaskModal from "./components/CreateTaskModal";
import { Task } from "./types";
import api from "./api";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await api.listTasks();
      setTasks(response);
    };

    fetchTasks();
  }, []);

  return (
    <MantineProvider>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Title>Tasks</Title>
        <CreateTaskModal setTasks={setTasks} />
      </div>
      <TaskList tasks={tasks} setTasks={setTasks} />
    </MantineProvider>
  );
}

export default App;
