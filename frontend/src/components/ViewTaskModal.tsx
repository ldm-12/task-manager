import { Modal, Group } from '@mantine/core';
import { Task } from '../types'
import StatusBadge from './StatusBadge';

const ViewTaskModal = ({ task, opened, close }: { task: Task, opened: boolean, close: () => void }) => {

  return (
    <Modal opened={opened} onClose={close} title={<h3>{task.title}</h3>}>
      <Group justify="space-between">
        <span>Status: <StatusBadge status={task.status} /></span>
        <p>Due: <i>{task.due_date.toDateString()}</i></p>
      </Group>
      <p className='task-description'>{task.description || 'No description provided'}</p>
    </Modal>
  );
}

export default ViewTaskModal