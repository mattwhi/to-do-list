import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TaskItem } from '../tasks/task-item.dto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-table, app-todo-table, .task-table-class',
  templateUrl: './task-table.component.html',
  styleUrls: ['./task-table.component.css']
})
export class TaskTableComponent implements OnInit {
  constructor() { }

  @Input()

  tasks: TaskItem[] = []
  @Output()
  onRemove = new EventEmitter<TaskItem>()
  ngOnInit(): void {

  }
  remove(taskItem: TaskItem) {
    this.onRemove.next(taskItem);
  }
}
