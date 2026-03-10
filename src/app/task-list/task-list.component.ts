import { Component, OnInit } from '@angular/core';
import { Task } from '../models/task.model';
import { TaskService } from '../services/task.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css',
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];

  statuses: any = [{ name: 'todo' }, { name: 'pending' }, { name: 'done' }];

  taskForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    status: new FormControl(this.statuses[0], [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });

  constructor(
    private taskService: TaskService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks() {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data.payLoad;
        console.log('this.tasks', this.tasks);
      },
    });
  }

  createTask() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const payLoad: Task = {
        name: formValue.name ?? '',
        status: formValue.status ?? '',
        description: formValue.description ?? '',
      };
      this.taskService.createTask(payLoad).subscribe({
        next: (res) => {
          this.taskForm.reset();
          this.getTasks();
        },
        error: (error) => {},
      });
    }
  }

  updateTask() {
    if (this.taskForm.valid) {
      const formValue = this.taskForm.value;
      const taskId = Number(this.route.snapshot.paramMap.get('id'));
      const payLoad: Task = {
        name: formValue.name ?? '',
        status: formValue.status ?? '',
        description: formValue.description ?? '',
      };
      this.taskService.updateTask(taskId, payLoad).subscribe({
        next: () => {
          this.getTasks();
        },
        error: () => {},
      });
    }
  }

  deleteTask() {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.getTasks();
      },
      error: (error) => {},
    });
  }
}
