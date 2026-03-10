import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}
  getTasks(): Observable<{ payLoad: Task[] }> {
    return this.http.get<{ payLoad: Task[] }>(this.apiUrl + '/tasks');
  }
  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(this.apiUrl + `/task/${id}`);
  }
  updateTask(id: number, task: Task): Observable<Task> {
    return this.http.put<Task>(this.apiUrl + `/task/${id}`, task);
  }
  deleteTask(id: number): Observable<Task> {
    return this.http.delete<Task>(this.apiUrl + `/task/${id}`);
  }
}
