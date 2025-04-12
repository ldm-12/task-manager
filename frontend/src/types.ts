export type StatusStates = "Not started" | "In progress" | "Complete" | "Blocked"

export interface CreateArgs {
    title: string,
    description: string,
    status: StatusStates,
    due_date: string,
    createdAt: string,
    updatedAt: string
}

export interface Task extends CreateArgs {
    id: number
}