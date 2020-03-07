import { TestBed } from '@angular/core/testing';

import { TodoListService } from './todo-list.service';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import { ITodoListResponse, IDeleteResponse } from '../model/todo-list';

describe('TodoListService', () => {
  let service: TodoListService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TodoListService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Create', () => {
    let param;
    beforeEach(() => {
      param = { topic: 'topic1', description: 'desc1' };
    });

    afterEach(() => {
      httpTestingController.verify();
    });

    it('should call http POST when call API create', () => {
      service.create(param).subscribe(() => { });

      const req = httpTestingController.expectOne('http://localhost:3000/todos');
      req.flush([]);

      expect(req.request.method).toEqual('POST');
    });

    it('should pass parameter to reqest when call API create', () => {
      service.create(param).subscribe();

      const req = httpTestingController.expectOne('http://localhost:3000/todos');
      req.flush([]);

      expect(req.request.body).toEqual({ topic: 'topic1', description: 'desc1' });
    });

    it('should return response data when call API create success', () => {
      service.create(param).subscribe((responseData: ITodoListResponse) => {
        expect(responseData).toEqual({ id: 1, topic: 'topic1', description: 'desc1' });
      });

      const req = httpTestingController.expectOne('http://localhost:3000/todos');
      req.flush({ id: 1, topic: 'topic1', description: 'desc1' });
    });
  });

  describe('GetList', () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should return list of todoList when call API getList', () => {
      service.getList().subscribe((responseData: ITodoListResponse[]) => {
        expect(responseData).toEqual([
          {id: 1, topic: 'topic1', description: 'desc1'},
          {id: 2, topic: 'topic2', description: 'desc2'}
        ]);
      });
      const req = httpTestingController.expectOne('http://localhost:3000/todos');
      req.flush([
        {id: 1, topic: 'topic1', description: 'desc1'},
        {id: 2, topic: 'topic2', description: 'desc2'}
      ]);
    });

    it('should call http GET when call API getList', () => {
      service.getList().subscribe();

      const req = httpTestingController.expectOne('http://localhost:3000/todos');
      expect(req.request.method).toEqual('GET');
      req.flush([]);
    });
  });

  describe('Delete', () => {
    afterEach(() => {
      httpTestingController.verify();
    });

    it('should call http DELETE when call API delete', () => {
      service.delete(1).subscribe();

      const req = httpTestingController.expectOne('http://localhost:3000/todos/1');
      expect(req.request.method).toEqual('DELETE');
      req.flush([]);
    });

    it('should return response success = true when call API delete success', () => {
      service.delete(1).subscribe((responseData: IDeleteResponse) => {
        expect(responseData).toEqual({success: true});
      });

      const req = httpTestingController.expectOne('http://localhost:3000/todos/1');
      req.flush({success: true});
    });
  });
});
