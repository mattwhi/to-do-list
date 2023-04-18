import { Injectable } from '@angular/core';
import { NewTask } from './new-task.dto';
import { TaskItem } from './task-item.dto';
import { Observable, BehaviorSubject, tap, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';


const resourceUrl = 'http://localhost:3002/tasks'

@Injectable()
export class TaskService {

  constructor(private httpClient: HttpClient) { }

 private tasks = new BehaviorSubject<TaskItem[]>([

  ])

  getAllTasks(date: Date): Observable<TaskItem[]>{
  this.httpClient.get<TaskItem[]>(`${resourceUrl}/${date}`)
    .pipe(map(TaskService.mapTaskItems))
    .subscribe(t => this.tasks.next(t))

    return this.tasks
    }

  private static mapTaskItems(items: {title: string}[]){
    return items.map(item => new TaskItem(item.title))
  }

  addTask(date:Date, newTask: NewTask){
    var updatedTasks = this.tasks.value.concat(new TaskItem(newTask.title))
    this.httpClient.post(`${resourceUrl}/${newTask.date}`, newTask)
    .subscribe(() => this.tasks.next(updatedTasks))
    this.tasks.next(updatedTasks);
  }

  removeTask(date: Date, existingTask: TaskItem){
    var updatedTask = this.tasks.value.filter(task => task != existingTask)
    this.httpClient.delete(`${resourceUrl}/${date}/${existingTask.title}`)
    .subscribe(() => this.tasks.next(updatedTask));
    this.tasks.next(updatedTask);

  }
}
