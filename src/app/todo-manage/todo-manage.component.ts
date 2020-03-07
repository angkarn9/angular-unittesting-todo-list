import { ITodoListResponse } from './../model/todo-list';
import { TodoListService } from './../services/todo-list.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-todo-manage',
  templateUrl: './todo-manage.component.html',
  styleUrls: ['./todo-manage.component.scss']
})
export class TodoManageComponent implements OnInit {
  todoListForm: FormGroup;
  todoList: ITodoListResponse[] = [];

  constructor(
    private service: TodoListService
  ) { }

  ngOnInit(): void {
    this.todoListForm = new FormGroup({
      topic: new FormControl(''),
      description: new FormControl('')
    });
  }

  add() {
    const param = {
      topic: this.todoListForm.get('topic').value,
      description: this.todoListForm.get('description').value
    };
    this.service.create(param).subscribe((response: ITodoListResponse) => {
      this.todoList.push(response);
      this.todoListForm.reset();
    });
  }
}
