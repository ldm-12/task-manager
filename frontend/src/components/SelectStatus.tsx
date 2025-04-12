import { Select } from '@mantine/core'
import { useState, useEffect } from 'react';
import { StatusStates, Task } from '../types';

type Props = {
    // props for dropdown menu in table
    task?: Task,
    onSelect?: (value: StatusStates) => void

    // for dropdown menu in create form
    is_form?: boolean
    form_props?: any
}

const SelectStatus = ({ task, onSelect, is_form, form_props }: Props) => {
    const [value, setValue] = useState<StatusStates | undefined>(undefined)

    useEffect(() => {
        if (task?.status) {
            setValue(task.status);
        }
    }, [task]);

    const options = [
        "Not started",
        "In progress",
        "Complete",
        "Blocked"
    ];

    const handleSelect = (new_value: StatusStates) => {
        onSelect && onSelect(new_value)
        setValue(new_value)
    }

    return (
        <Select
            withAsterisk={is_form}
            value={value}
            label={is_form && "Status"}
            data={options}
            onChange={(val) => handleSelect(val as StatusStates)}
            {...form_props}
        />
    )

}

export default SelectStatus