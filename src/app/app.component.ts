import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TabsModule } from 'primeng/tabs';
import { AddTaskComponent } from './features/task/components/add-task/add-task.component';
import { TaskListComponent } from './features/task/components/task-list/task-list.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
        ButtonModule,
        CommonModule,
        FormsModule,
        RouterModule,
        TabsModule,
        AddTaskComponent,
        TaskListComponent,
    ],
})
export class AppComponent implements OnInit {
    selectedRoute = '/';
    isDark = false;
    tabs = [
        {
            id: 'tasks',
            label: 'Tasks',
            route: '/',
        },
    ];
    year: number = new Date().getFullYear();

    ngOnInit(): void {
        this.isDark = document.documentElement.classList.contains('dark');
    }

    toggleTheme() {
        this.isDark = !this.isDark;
        if (this.isDark) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }
}
