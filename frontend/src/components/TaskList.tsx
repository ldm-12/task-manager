import { ActionIcon, Group, Table } from '@mantine/core'
import { StatusTypes, Task } from '../types'
import api from '../api'
import TaskRow from './TaskRow'
import { useState } from 'react'
import {
    IconArrowDown,
    IconArrowsSort,
    IconArrowUp
} from '@tabler/icons-react';

interface TaskListProps {
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

type SortDirection = 'none' | 'asc' | 'desc'

const TaskList = ({ tasks, setTasks }: TaskListProps) => {
    const [sort_direction, setSortDirecton] = useState<SortDirection>('none')

    const handleDelete = async (id: number) => {
        await api.deleteTask(id);
        setTasks(prev => prev.filter(task => task.id !== id))
    }

    const handleUpdate = async (id: number, status: StatusTypes) => {
        const response = await api.updateTask(id, status)
        setTasks(prev => prev.map(task => task.id === id ? response : task))
    }

    const toggleSort = () => setSortDirecton(prev => ({
        none: 'asc',
        asc: 'desc',
        desc: 'none'
    }[prev] as SortDirection))

    const sorted_tasks = (
        sort_direction === 'asc' ? [...tasks].sort((a, b) => a.due_date.getTime() - b.due_date.getTime())
            : sort_direction === 'desc' ? [...tasks].sort((a, b) => b.due_date.getTime() - a.due_date.getTime())
                : tasks
    )

    const table_rows = sorted_tasks.map(task => (
        <TaskRow key={task.id} task={task} handleDelete={handleDelete} handleUpdate={handleUpdate} />
    ))

    return (
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Task</Table.Th>
                    {/* <Table.Th>Description</Table.Th> */}
                    <Table.Th>Status</Table.Th>
                    <Table.Th>
                        <Group justify='space-between'>
                            <p>Due</p>
                            <ActionIcon className='sort-date-button' onClick={toggleSort} variant="transparent" aria-label="Sort by due date">
                                {
                                    sort_direction === 'asc' ? <IconArrowUp className='sort-icon' onClick={toggleSort} size={16} />
                                    : sort_direction === 'desc' ? <IconArrowDown className='sort-icon' onClick={toggleSort} size={16} />
                                    : <IconArrowsSort className='sort-icon' onClick={toggleSort} size={16} />
                                }
                            </ActionIcon>
                            
                        </Group>
                    </Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>{table_rows}</Table.Tbody>
        </Table>
    )

}

export default TaskList