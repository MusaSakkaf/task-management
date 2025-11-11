import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TaskStatus } from '../enums/task-status.enum';
import { Task } from '../models/task.model';

@Injectable({
    providedIn: 'root',
})
export class TaskService {
    private tasksSubject = new BehaviorSubject<Task[]>([]);
    public tasks$ = this.tasksSubject.asObservable();

    constructor() {}

    getTasks(): Observable<Task[]> {
        return this.tasks$;
    }

    addTask(title: string, description: string): void {
        const currentTasks = this.tasksSubject.value;
        const newTask: Task = {
            id: Date.now(),
            title,
            description,
            status: TaskStatus.Pending,
        };
        this.tasksSubject.next([...currentTasks, newTask]);
    }

    updateTaskStatus(id: number, status: TaskStatus): void {
        const currentTasks = this.tasksSubject.value;
        const updatedTasks = currentTasks.map((task) =>
            task.id === id ? { ...task, status } : task
        );
        this.tasksSubject.next(updatedTasks);
    }
}
