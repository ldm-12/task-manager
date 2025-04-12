import { Select } from '@mantine/core'
import { useState } from 'react';
import { StatusStates, Task } from '../types';
import api from '../api';

type Props = { task: Task }
 
const SelectStatus = ({ task }: Props) => {
    const [value, setValue] = useState<StatusStates>(task.status)

    const options = [
        "Not started",
        "In progress",
        "Complete", 
        "Blocked"
    ];

    const updateTask = async (status: StatusStates) => {
        await api.updateTask(task.id, status);
        setValue(status);
    }

    return (
        <Select
            value={value}
            data={options}
            onChange={val => updateTask(val as StatusStates)}
        />
    )

}

export default SelectStatus