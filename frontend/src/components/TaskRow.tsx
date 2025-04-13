import { useDisclosure } from '@mantine/hooks'
import { Modal, Table, ActionIcon, Button } from '@mantine/core'
import { IconX } from '@tabler/icons-react';
import { StatusTypes, Task } from '../types';
import SelectStatus from './SelectStatus';
import StatusBadge from './StatusBadge';

interface Props {
    task: Task,
    handleDelete: (id: number) => void,
    handleUpdate: (id: number, status: StatusTypes) => void
}

const TaskRow = ({ task, handleDelete, handleUpdate }: Props) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal opened={opened} onClose={close} title={task.title}>
                <h4>Description</h4>
                <p>{task.description || 'No description provided'}</p>
                <div>
                    <StatusBadge status={task.status} />
                </div>
            </Modal>
            <Table.Tr key={task.id}>
                <Table.Td><Button onClick={open} justify="left" variant="subtle" style={{ width: '100%' }}>{task.title}</Button></Table.Td>
                <Table.Td>
                    <SelectStatus status={task.status} onSelect={(status: StatusTypes) => handleUpdate(task.id, status)} />
                </Table.Td>
                <Table.Td>{new Date(task.due_date).toDateString()}</Table.Td>
                <Table.Td>
                    <ActionIcon onClick={() => handleDelete(task.id)} className="delete-task-button" variant="transparent" aria-label="Settings">
                        <IconX className="delete-task-icon" style={{ width: '70%', height: '70%' }} stroke={1.5} />
                    </ActionIcon>
                </Table.Td>
            </Table.Tr>
        </>
    )

}

export default TaskRow