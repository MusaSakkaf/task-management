import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Observable } from 'rxjs';
import { TaskStatus } from '../../../../core/enums/task-status.enum';
import { Task } from '../../../../core/models/task.model';
import { TaskService } from '../../../../core/services/task.service';
import { FilterTasksPipe } from '../../../../shared/pipes/filter-tasks.pipe';

interface TaskStatusOption {
    label: string;
    value: TaskStatus;
}

@Component({
    selector: 'app-task-list',
    standalone: true,
    imports: [
        ButtonModule,
        CommonModule,
        FormsModule,
        FilterTasksPipe,
        SelectModule,
        TagModule,
        TableModule,
    ],
    templateUrl: './task-list.component.html',
    styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
    tasks$: Observable<Task[]>;
    selectedStatus: TaskStatus | null = null;
    TaskStatus = TaskStatus;

    taskStatusOptions: TaskStatusOption[] = [
        { label: 'Pending', value: TaskStatus.Pending },
        { label: 'In Progress', value: TaskStatus.InProgress },
        { label: 'Completed', value: TaskStatus.Completed },
    ];

    constructor(private taskService: TaskService) {
        this.tasks$ = this.taskService.getTasks();
    }

    ngOnInit(): void {}

    updateStatus(taskId: number, newStatus: TaskStatus): void {
        this.taskService.updateTaskStatus(taskId, newStatus);
    }

    onFilterChange(status: TaskStatus | null): void {
        this.selectedStatus = status;
    }

    getStatusSeverity(
        status: TaskStatus
    ): 'success' | 'secondary' | 'info' | 'warn' | 'danger' | 'contrast' | null | undefined {
        switch (status) {
            case TaskStatus.Pending:
                return 'warn';
            case TaskStatus.InProgress:
                return 'info';
            case TaskStatus.Completed:
                return 'success';
            default:
                return 'secondary';
        }
    }

    getOptionLabel(value: TaskStatus): string {
        return this.taskStatusOptions.find((option) => option.value === value)?.label || '';
    }
}
