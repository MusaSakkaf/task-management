import { TaskStatus } from '../enums/task-status.enum';

export interface TaskFilter {
    status: TaskStatus;
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: TaskStatus;
}
