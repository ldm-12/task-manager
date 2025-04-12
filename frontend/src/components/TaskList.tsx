import { Table, CloseButton } from '@mantine/core'
import { Task } from '../types'
import api from '../api'
import { useEffect, useState } from 'react'
import SelectStatus from './SelectStatus'

const TaskList = () => {
    const [tasks, setTasks] = useState<Task[]>([])

    useEffect(() => {
        const fetchTasks = async () => {
            const response = await api.listTasks();
            setTasks(response)
        }

        fetchTasks()
    }, [])

    const handleDelete = async (id: number) => {
        await api.deleteTask(id);
        setTasks(prev => prev.filter(task => task.id !== id))
    }

    const table_rows = tasks.map(t => (
        <Table.Tr key={t.id}>
            <Table.Td>{t.title}</Table.Td>
            {/* <Table.Td>{t.description}</Table.Td> */}
            <Table.Td>
                <SelectStatus task={t} />
            </Table.Td>
            <Table.Td>{new Date(t.due_date).toDateString()}</Table.Td>
            <Table.Td>
                <CloseButton onClick={() => handleDelete(t.id)} />
            </Table.Td>
        </Table.Tr>
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