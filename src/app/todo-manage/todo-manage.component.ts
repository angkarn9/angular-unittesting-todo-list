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
  disableAddButton: boolean = false;
  selectItem: number;

  constructor(
    private service: TodoListService
  ) { }

  ngOnInit(): void {
    this.todoListForm = new FormGroup({
      topic: new FormControl(''),
      description: new FormControl('')
    });

    this.service.getList().subscribe((response: ITodoListResponse[]) => {
      this.todoList = response;
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

  edit(index: number) {
    const itemSelected = this.todoList[index];

    this.todoListForm.get('topic').setValue(itemSelected.topic);
    this.todoListForm.get('description').setValue(itemSelected.description);
    this.disableAddButton = true;
    this.selectItem = index;
  }

  update() {
    const param = {
      topic: this.todoListForm.get('topic').value,
      description: this.todoListForm.get('description').value
    };
    this.service.update(this.todoList[this.selectItem].id, param).subscribe((response: ITodoListResponse) => {
      this.todoList[this.selectItem].topic = response.topic;
      this.todoList[this.selectItem].description = response.description;
    });
  }
}
