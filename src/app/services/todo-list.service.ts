import { Injectable } from '@angular/core';
import { ITodoListParam, ITodoListResponse, IDeleteResponse } from '../model/todo-list';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor(
    private httpClient: HttpClient
  ) { }

  create(param: ITodoListParam): Observable<ITodoListResponse> {
    return this.httpClient.post<ITodoListResponse>('http://localhost:3000/todos', param);
  }

  update(id: number, param: ITodoListParam): Observable<ITodoListResponse> {
    return this.httpClient.put<ITodoListResponse>(`http://localhost:3000/todos/${id}`, param);
  }

  getList(): Observable<ITodoListResponse[]> {
    return this.httpClient.get<ITodoListResponse[]>('http://localhost:3000/todos');
  }

  delete(id: number): Observable<IDeleteResponse> {
    return this.httpClient.delete<IDeleteResponse>(`http://localhost:3000/todos/${id}`);
  }
}
