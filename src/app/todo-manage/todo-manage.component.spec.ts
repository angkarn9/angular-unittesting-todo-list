import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoListService } from './../services/todo-list.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoManageComponent } from './todo-manage.component';
import { of } from 'rxjs';

fdescribe('TodoManageComponent', () => {
  let component: TodoManageComponent;
  let fixture: ComponentFixture<TodoManageComponent>;
  let service: TodoListService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoManageComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ TodoListService ]
    })
    .compileComponents();

    service = TestBed.inject(TodoListService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoManageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Add', () => {

    it('should call service.create when click add button', () => {
      spyOn(service, 'create').and.returnValue(of(null));
      component.todoListForm.get('topic').setValue('topic1');
      component.todoListForm.get('description').setValue('desc1');

      component.add();

      expect(service.create).toHaveBeenCalledWith({topic: 'topic1', description: 'desc1'});
    });

    it('should add item to todoList when click add button', () => {
      component.todoList = [
        {id: 1, topic: 'topic1', description: 'desc1'}
      ];
      spyOn(service, 'create').and.returnValue(of({id: 2, topic: 'topic2', description: 'desc2'}));

      component.todoListForm.get('topic').setValue('topic2');
      component.todoListForm.get('description').setValue('desc2');

      component.add();

      expect(component.todoList).toEqual([
        {id: 1, topic: 'topic1', description: 'desc1'},
        {id: 2, topic: 'topic2', description: 'desc2'}
      ]);
    });

    it('should clear form when add success', () => {
      spyOn(service, 'create').and.returnValue(of({id: 2, topic: 'topic2', description: 'desc2'}));
      component.todoListForm.get('topic').setValue('topic2');
      component.todoListForm.get('description').setValue('desc2');

      component.add();

      expect(component.todoListForm.get('topic').value).toBeNull();
      expect(component.todoListForm.get('description').value).toBeNull();
    });
  });
});
