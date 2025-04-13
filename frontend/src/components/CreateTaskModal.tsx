import { useDisclosure } from '@mantine/hooks';
import { Modal, Button, TextInput, Textarea, Group } from '@mantine/core';
import { DateInput } from '@mantine/dates'
import { useForm } from '@mantine/form';

import SelectStatus from './SelectStatus';
import { useState } from 'react';

import api from '../api';
import { StatusTypes, Task } from '../types';


type CreateFormProps = {
    handleSubmit: (values: any) => void,
    loading: boolean
}

const CreateForm = ({ handleSubmit, loading }: CreateFormProps) => {
    const form = useForm({
        mode: 'uncontrolled',
        initialValues: {
            title: '',
            description: '',
            status: 'Not started',
            due_date: undefined
        },        
        validate: {
            title: (value) => value.length > 0 ? null : 'Title required',
            due_date: (value) => value ? null : 'Due date required', 
        }
    })

    return (
        <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
                withAsterisk
                label="Title"
                {...form.getInputProps('title')}
            />
            <Textarea
                label="Description (optional)"
                {...form.getInputProps('description')}
            />
            <SelectStatus status={form.getValues().status as StatusTypes} onSelect={(status) => form.setFieldValue('status', status)} />
            <DateInput
                withAsterisk
                label="Due date"
                {...form.getInputProps('due_date')}
            />
            <Group justify="flex-end" mt="md">
                <Button type="submit" loading={loading}>Create</Button>
            </Group>
        </form>
    )

}

function CreateTaskModal({ setTasks }: { setTasks: React.Dispatch<React.SetStateAction<Task[]>> }) {
    const [opened, { close, open }] = useDisclosure(false);
    const [loading, setLoading] = useState(false)
    
    const handleSubmit = async (values: any) => {
        setLoading(true)
        try {
            const response = await api.createTask(values)
            setTasks((prev) => prev.concat(response))
            close()
        } catch (error) {
            console.error('error creating task:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Modal opened={opened} onClose={close} title="Create New Task">
                <CreateForm handleSubmit={handleSubmit} loading={loading} />
            </Modal>

            <Button variant="primary" onClick={open}>
                + New Task
            </Button>
        </>
    );
}

export default CreateTaskModal