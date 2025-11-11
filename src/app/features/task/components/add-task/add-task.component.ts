import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { TaskService } from '../../../../core/services/task.service';

@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    styleUrls: ['./add-task.component.css'],
    imports: [
        ButtonModule,
        CommonModule,
        InputTextModule,
        ReactiveFormsModule,
        TextareaModule,
        RouterModule,
    ],
})
export class AddTaskComponent {
    taskForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private taskService: TaskService
    ) {
        this.taskForm = this.fb.group({
            title: ['', [Validators.required, Validators.minLength(3)]],
            description: ['', [Validators.minLength(5)]],
        });
    }

    onSubmit(): void {
        if (this.taskForm.valid) {
            const { title, description } = this.taskForm.value;
            this.taskService.addTask(title, description);
            this.taskForm.reset();
        }
    }

    get title() {
        return this.taskForm.get('title');
    }
    get description() {
        return this.taskForm.get('description');
    }
}
