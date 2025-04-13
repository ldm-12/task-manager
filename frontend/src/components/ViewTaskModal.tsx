import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, Badge } from '@mantine/core';
import { Task } from '../types'
import StatusBadge from './StatusBadge';

const ViewTaskModal = ({ task }: { task: Task }) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title={task.title}>
        <h4>Description</h4>
        <p>{task.description}</p>
        <div>
          <StatusBadge status={task.status} />
        </div>

      </Modal>

      <Button variant="default" onClick={open}>
        Open modal
      </Button>
    </>
  );
}

export default ViewTaskModal