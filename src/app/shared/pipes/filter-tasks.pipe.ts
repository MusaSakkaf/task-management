import { Pipe, PipeTransform } from '@angular/core';
import { TaskStatus } from '../../core/enums/task-status.enum';
import { Task } from '../../core/models/task.model';

@Pipe({
    name: 'filterTasks',
    standalone: true,
})
export class FilterTasksPipe implements PipeTransform {
    transform(tasks: Task[], status: TaskStatus | null): Task[] {
        if (!tasks) return [];
        if (!status) return tasks;
        return tasks.filter((task) => task.status === status);
    }
}
