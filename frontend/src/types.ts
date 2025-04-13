export type StatusTypes = "Not started" | "In progress" | "Complete" | "Blocked"


interface BaseTask {
    title: string;
    description: string;
    status: StatusTypes;
    id: number;
    createdAt: string;
    updatedAt: string;
}

// arguments for creating a new task - no id/createdAt/updatedAt yet
export interface NewTask extends Omit<BaseTask, 'id' | 'createdAt' | 'updatedAt'> {
    due_date: Date;
}

// task as returned from database - the due_date is a string and should be parsed
export interface UnparsedTask extends Omit<BaseTask, 'due_date'> {
    due_date: string;
}

// a parsed task from the database (not parsing createdAt/updatedAt)
export interface Task extends Omit<BaseTask, 'due_date'> {
    due_date: Date;
}