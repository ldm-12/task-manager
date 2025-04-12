import { useEffect, useState } from 'react'
import './App.css'
import '@mantine/core/styles.css'
import { MantineProvider } from '@mantine/core'
import TaskList from './components/TaskList'
import CreateTaskModal from './components/CreateTaskModal'
import { Task } from './types'
import api from './api'

function App() {
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await api.listTasks();
      setTasks(response)
    }

    fetchTasks()
  }, [])

  return (
    <MantineProvider>
      <CreateTaskModal setTasks={setTasks} />
      <TaskList tasks={tasks} setTasks={setTasks} />
    </MantineProvider>
  )
}

export default App
