import { useDisclosure } from "@mantine/hooks";
import { Table, ActionIcon, Button } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { StatusTypes, Task } from "../types";
import SelectStatus from "./SelectStatus";
import ViewTaskModal from "./ViewTaskModal";

interface Props {
  task: Task;
  handleDelete: (id: number) => void;
  handleUpdate: (id: number, status: StatusTypes) => void;
}

const TaskRow = ({ task, handleDelete, handleUpdate }: Props) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ViewTaskModal opened={opened} close={close} task={task} />
      <Table.Tr key={task.id}>
        <Table.Td>
          <Button
            onClick={open}
            justify="left"
            variant="subtle"
            style={{ width: "100%" }}
          >
            {task.title}
          </Button>
        </Table.Td>
        <Table.Td>
          <SelectStatus
            status={task.status}
            onSelect={(status: StatusTypes) => handleUpdate(task.id, status)}
          />
        </Table.Td>
        <Table.Td>
          <div
            style={
              task.due_date < new Date()
                ? { color: "#ee2424", fontWeight: "bolder" }
                : {}
            }
          >
            {new Date(task.due_date).toDateString()}
          </div>
        </Table.Td>
        <Table.Td>
          <ActionIcon
            onClick={() => handleDelete(task.id)}
            className="delete-task-button"
            variant="transparent"
            aria-label="Settings"
          >
            <IconX
              className="delete-task-icon"
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
            />
          </ActionIcon>
        </Table.Td>
      </Table.Tr>
    </>
  );
};

export default TaskRow;
