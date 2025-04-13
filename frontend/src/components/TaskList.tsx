import { Table } from '@mantine/core'
import { StatusTypes, Task } from '../types'
import api from '../api'
import TaskRow from './TaskRow'

interface TaskListProps {
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

const TaskList = ({ tasks, setTasks }: TaskListProps) => {

    const handleDelete = async (id: number) => {
        await api.deleteTask(id);
        setTasks(prev => prev.filter(task => task.id !== id))
    }

    const handleUpdate = async (id: number, status: StatusTypes) => {
        const response = await api.updateTask(id, status)
        setTasks(prev => prev.map(task => task.id === id ? response : task))
    }

    const table_rows = tasks.map(task => (
        <TaskRow key={task.id} task={task} handleDelete={handleDelete} handleUpdate={handleUpdate}/>
    ))

    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Task</Table.Th>
                    {/* <Table.Th>Description</Table.Th> */}
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Due</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{table_rows}</Table.Tbody>
        </Table>
    )

}

export default TaskList