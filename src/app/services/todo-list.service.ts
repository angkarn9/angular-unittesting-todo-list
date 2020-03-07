import { Injectable } from '@angular/core';
import { ITodoListParam, ITodoListResponse } from '../model/todo-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(
    private httClient: HttpClient
  ) { }

  create(param: ITodoListParam): Observable<ITodoListResponse> {
    return this.httClient.post<ITodoListResponse>('http://localhost:3000/todos', param);
  }
}
